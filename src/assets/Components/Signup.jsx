import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const[name, setName]=useState("");
    const[phone, setPhone]=useState("");
    const[password, setPassword]=useState("");

    const navigate = useNavigate();

    const handleGenerateOtp = async () => {
      try {
        const response = await axios.post("http://localhost:5000/create-otp", { phone: phone });
        console.log("click on verigy");
        
        if (response.data.success) {
          
          navigate("/verify-otp", {state: {phone, name, password}})
          
        } else {
          alert(response.data.message);
         
        }
      } catch (error) {
        console.error("Error generating OTP:", error);
        alert("Failed to send OTP.");
      }
    };
   


  return (
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
  <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl font-medium text-gray-800 mb-6">Create Account</h2>

    <label for="name" class="block text-sm text-gray-600 mb-1">Name</label>
    <input
      type="text"
      id="name"
      placeholder="Enter your name"
      onChange={(e)=>{setName(e.target.value)}}
      class="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-red-400 focus:border-red-500 mb-4"
    />

    <label for="mobile" class="block text-sm text-gray-600 mb-1">Mobile Number</label>
    <input
      type="text"
      id="mobile"
      placeholder="Enter your mobile number"
      onChange={(e)=>{setPhone(e.target.value)}}
      class="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring  focus:ring-red-400 focus:border-red-500 mb-4"
    />

    {/* <label for="email" class="block text-sm text-gray-600 mb-1">Email</label>
    <input
      type="email"
      id="email"
      placeholder="Enter your email"
      class="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-yellow-400 focus:border-yellow-500 mb-4"
    /> */}

    <label for="password" class="block text-sm text-gray-600 mb-1">Password</label>
    <input
      type="password"
      id="password"
      placeholder="Create a password"
      onChange={(e)=>{setPassword(e.target.value)}}
      class="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring  focus:ring-red-400 focus:border-red-500 mb-6"
    />

    <button
      class="w-full bg-red-500 hover:bg-red-600 text-gray-100 font-normal py-2 rounded-md transition"
      onClick={handleGenerateOtp}
    >
      Verify Mobile Number
    </button>

    <p class="text-sm text-gray-600 mt-4">
      By signing up, you agree to our
      <a href="#" class="text-blue-500 hover:underline"> Terms of Service</a> and
      <a href="#" class="text-blue-500 hover:underline"> Privacy Policy</a>.
    </p>

    <div class="mt-6 border-t pt-4 text-center">
      <p class="text-sm text-gray-800">Already have an account?</p>
      <a href="#" class="text-blue-500 hover:underline" onClick={() => navigate("/signin")}>Log in</a>
    </div>
  </div>
</div>

  )
}

export default Signup