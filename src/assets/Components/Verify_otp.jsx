import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const phone = location.state?.phone; // Extract phone number from state
  const name = location.state?.name; // Extract name from state
  const password = location.state?.password; // Extract password from state

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        phone: phone,
        otp: otp,
        name: name,
        password: password,
      });

      if (response.data.success) {
        alert("OTP verified successfully. User created!");
        // Navigate to login or dashboard after successful verification
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    }
  };

  if (!phone) {
    return <div>Error: Missing phone number.</div>; // Handle case where phone is not passed
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Verify Mobile Number
        </h3>
        <p className="text-sm text-gray-700 mb-4">
          A text with a One Time Password (OTP) has been sent to your mobile number:
        </p>
        <p className="text-base font-normal text-gray-900 mb-2">{phone}{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">Change</span>
        </p>
        <label htmlFor="otp" className="block text-sm text-gray-600 mb-2">Enter OTP:</label>
        <input
          id="otp"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-red-400 focus:border-red-500 mb-4"
        />
        <div className="flex justify-end mb-4">
          <button
            className="text-sm text-blue-500 hover:underline"
            onClick={() => alert("Resend OTP functionality here")}
          >
            Resend OTP
          </button>
        </div>
        <button
          onClick={handleVerifyOtp}
          className="w-full bg-red-500 hover:bg-red-600 text-gray-100  font-normal py-2 rounded-md transition"
        >
          Create your account
        </button>
        <p className="text-sm text-gray-600 mt-4">
          By creating an account or logging in, you agree to Amazon's{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline"
          >
            Conditions of Use
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline"
          >
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
