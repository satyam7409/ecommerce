// src/components/Cart.js
import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

const Cart = () => {
  const { cart , removeFromCart } = useContext(CartContext); // Access cart and removeFromCart
  const [quantity, setQuantity]= useState(1);

  function addOneItem(){
    setQuantity(quantity+1);
  }

  function removeOneItem(){
    setQuantity(quantity-1);
  }

  const handleCheckout = async () => {
    console.log("Clicked");
    
    const amount = 500;
    try {
      const orderResponse = await axios.post("http://localhost:5000/create-order", { amount });

      const { order } = orderResponse.data;
      const options = {
        key: "rzp_test_vcg8A4lEtYzCzE", // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Rural Connect",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          // Verify payment
          const paymentVerification = await axios.post("http://localhost:5000/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (paymentVerification.data.success) {
            alert("Payment successful!");
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "1234567890",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };



  return (
    <>
    <Navbar />
    <div className="">
      <div className='flex flex-col mx-auto w-[960px] gap-12'>
        <div>
      <h1 className="text-3xl font-bold text-center">Your Cart</h1>
      </div>
      <div className='flex justify-between'>

<div className='flex flex-col gap-8 bg-gray-100 pl-8 pr-48 py-8'>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="h-44 flex ">
            <div>
            <img src={item.img} alt={item.name} className="h-[100%] w-44" />
            </div>
            <div className='ml-10 flex flex-col gap-1'>
              <div className='ml-2'>
              <h2>{item.name}</h2>
              <p>Rs. {item.price}</p>

              </div>
              
<div class="flex items-center border-2 border-red-400 rounded-full px-3 w-28 ">
<button class="text-xl text-gray-600 hover:text-gray-900 focus:outline-none" onClick={removeOneItem}>-</button>
<span class="mx-4 text-base font-semibold">{quantity}</span>
<button class="text-xl text-gray-600 hover:text-gray-900 focus:outline-none" onClick={addOneItem}>+</button>
  
</div>
<div className='mt-5'>
     <button className="bg-red-500 text-white text-xs py-[6px] px-2 text-center rounded-xl " onClick={() => removeFromCart(item.id)}>Remove </button>
     </div>
            </div>
          </div>
            
        
        ))
      )}
      </div>
      <div className='flex flex-col bg-gray-100 w-96 h-96 pl-8 pt-8 pr-12 gap-4'>
        <div className='flex gap-2 justify-start items-center'>
          <h3 className='text-lg'>Subtotal</h3>
          <span>({quantity} items): Rs. 100.00</span>
        </div>

        <div>

          <div className='flex justify-between'>
          <h3>
            Order Value
        </h3>
        <span>Rs. 100.00</span>
        </div>
        <div className='flex justify-between'>
          <h3>
             Delivery
        </h3>
        <span>FREE</span>
        </div>

        <div className='flex justify-between'>
          <h3>Total</h3>
        <span>Rs. 100.00</span>
        </div>

        </div>
 
 <div className='flex justify-center items-center w-[100%] h-10 rounded-sm bg-slate-900'>
  <button className='text-white font-sans font-normal' onClick={handleCheckout}>Checkout</button>
 </div>
       
      </div>
</div>
    </div>
    </div>
    <div className='mt-5'>
    <Footer />
    </div>
    </>
  );
};

export default Cart;
