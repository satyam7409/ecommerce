import express from "express";
import cors from "cors";
import { products } from "./data/product.js"; // Importing the products data
import Razorpay from "razorpay";
import crypto from "crypto";
import pg from "pg";
import jwt from "jsonwebtoken";

const app = express();
const {Pool}=pg;

// Middleware
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecom",
  password: "Satyam@123",
  port: 5432,
});
pool.connect();

const secret_key = "billi_ke_gale_mei_khandi_kon_bandega"

const generatejsonwebtoken = ({userId})=>{
  return jwt.sign({ userId }, secret_key, { expiresIn: "1h" })
}

const razorpay = new Razorpay({
    key_id: "rzp_test_vcg8A4lEtYzCzE", // Replace with your Razorpay Key ID
    key_secret: "pdRzZh57nrylLzaBtFJ0WAq2", // Replace with your Razorpay Key Secret
  });

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  app.post("/create-otp", async (req,res)=>{
  const {phone}=req.body;
  const otp=generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  try {
    await pool.query(
      'INSERT INTO otps (phone, otp, expires_at) VALUES ($1, $2, $3)',
      [phone, otp, expiresAt]
    );
    res.json({ success: true, otp, message: 'OTP generated successfully.' });
     }
      catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to generate OTP.' });
  }
})


app.post("/verify-otp", async (req, res) => {
  const { name, password, phone, otp } = req.body;
  console.log(req.body);
  

  try {
    // Retrieve the OTP from the database
    const result = await pool.query(
      "SELECT * FROM otps WHERE phone = $1 AND otp = $2 AND expires_at > NOW()",
      [phone, otp]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    // OTP is valid; create the user
    const user = await pool.query(
      "INSERT INTO users (name, phone, password) VALUES ($1, $2, $3)",
      [name, phone, password]
    );

    // Optionally, delete the OTP record to prevent reuse
    await pool.query("DELETE FROM otps WHERE phone = $1", [phone]);

    const userId = result.rows[0].id;
    const token = generatejsonwebtoken(userId);
    console.log(token);
    
    res
    .cookie("token", token, { httpOnly: true, secure: false }) // Use 'secure: true' in production with HTTPS
    .status(201)
    .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
});


app.post("/signin", async (req,res)=>{
  const {phone, password}= req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE phone = $1 AND password = $2",
      [phone, password]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid phone or password." });
    }

    const userId = result.rows[0].id;

    // Generate JWT token
    const token = generatejsonwebtoken(userId);

    // Send token as a cookie
    res
      .cookie("token", token, { httpOnly: true, secure: false }) // Use 'secure: true' in production with HTTPS
      .status(200)
      .json({ success: true, message: "Login successful." });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
})

// Endpoint to fetch all products
app.get('/products', (req, res) => {
    res.json(products.mixedProducts); // Return all mixed products
});

// Endpoint to fetch products by category
app.get('/products/:category', (req, res) => {
    const category = req.params.category.toLowerCase(); // Extract category from URL
    const categoryData = products[category];
    
    if (categoryData) {
        res.json(categoryData); // If category exists, return data
    } else {
        res.status(404).json({ message: "Category not found" }); // Handle invalid categories
    }
});


// Endpoint to fetch product details by category and ID
app.get('/products/:category/:id', (req, res) => {
    const category = req.params.category.toLowerCase(); // Get the category from the URL
    const productId = parseInt(req.params.id); // Get the product ID from the URL and convert to number

    const categoryProducts = products[category]; // Get products of the specific category

    if (!categoryProducts) {
        return res.status(404).json({ message: "Category not found" }); // Handle invalid categories
    }

    const product = categoryProducts.find(p => p.id === productId); // Find the product by ID within the category

    if (product) {
        res.json(product); // Send the product details as response
    } else {
        res.status(404).json({ message: "Product not found" }); // Handle invalid IDs
    }
});

app.post("/create-order", async (req, res) => {
    const { amount } = req.body;
  
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
  
    try {
      const order = await razorpay.orders.create(options);
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });


  app.post("/verify-payment", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    try {
      const generatedSignature = crypto
        .createHmac("sha256", razorpay.key_secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");
  
      if (generatedSignature === razorpay_signature) {
        res.status(200).json({ success: true, message: "Payment verified successfully!" });
      } else {
        res.status(400).json({ success: false, message: "Payment verification failed." });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
