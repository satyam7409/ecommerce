import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [phone, setPhone]= useState("");
  const navigate = useNavigate();
  const moveToPassword =()=>{
   const len = phone.length
   console.log(len);
   if(len<10 | len>10){
    alert('Invalid Number')
   }
   else{
    navigate("/password",{state: {phone}})
  }
  }
  console.log(phone);
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sign In</h3>

        <label htmlFor="password" className="block text-sm text-gray-600 mb-2">
          Email or Mobile Number
        </label>
        <input id="text" type="text" className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-yellow-400 focus:border-yellow-500 mb-4" value={phone} onChange={(e)=>{setPhone(e.target.value)}}
        />
        <div className="flex justify-between items-center mb-4">
          <button className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </button>
        </div>
        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded-md transition" onClick={moveToPassword}>
          Continue
        </button>

        {/* Added the new line here */}
        <p className="text-xs text-gray-500 text-center mt-2">
          By continuing, you agree to Amazon's{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Conditions of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Notice
          </a>.
        </p>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <button className="w-full border border-gray-300 text-gray-800 font-medium py-2 rounded-md hover:bg-gray-100 transition">
          Get an OTP on your phone
        </button>
      </div>
    </div>  
  );
};

export default SignIn;
