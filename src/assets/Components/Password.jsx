import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Password = () => {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const phone = location.state?.phone
  const navigate = useNavigate();

  const handleSignIn = async () => {
    // Handle sign-in logic here
    if (password === "") {
      alert("Please enter your password!");
    } else {
        try {
            const response = await axios.post("http://localhost:5000/signin", { phone: phone, password: password });
            if(response.data.success){
                alert("tu shi admi hai")
                navigate("/");
            }
            else{
                alert(response.data.message);
            }

        } catch (error) {
            console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
        }            
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sign In</h3>
        <p className="text-lg font-medium text-gray-900 mb-2">
          {phone}{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">
            Change
          </span>
        </p>
        <label htmlFor="password" className="block text-sm text-gray-600 mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-yellow-400 focus:border-yellow-500 mb-4"
        />
        <div className="flex justify-between items-center mb-4">
          <button
            className="text-sm text-blue-500 hover:underline"
            
          >
            Forgot password?
          </button>
        </div>
        <button
          onClick={handleSignIn}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded-md transition"
        >
          Sign in
        </button>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <button
          
          className="w-full border border-gray-300 text-gray-800 font-medium py-2 rounded-md hover:bg-gray-100 transition"
        >
          Get an OTP on your phone
        </button>
      </div>
    </div>
  );
};

export default Password;
