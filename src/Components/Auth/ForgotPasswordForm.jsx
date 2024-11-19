// ForgotPasswordForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {message} from 'antd'

const ForgotPasswordForm = ({ onSwitchToSignIn, onSwitchToOTP }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Add your password reset logic here
      // This is where you would typically make an API call to send the reset email with OTP
      await sendResetEmail(email);
      
      message.success('Reset email sent successfully!');
      // If successful, switch to OTP view
      onSwitchToOTP(email);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function - replace with your actual API call
  const sendResetEmail = async (email) => {
    // Simulate API call
    const response = await axios.post('http://localhost:5000/api/users/forgot-password', {
        email
      });
    console.log(response.data);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="w-full bg-white rounded-3xl">
      {/* Decorative header line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-3xl" />
     
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Reset Password
        </h2>
       
        <p className="text-center text-gray-600 mb-8">
          Enter your email address and we'll send you a code to reset your password.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>
         
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send Reset Code'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-px bg-gray-300 w-full" />
          <span className="text-gray-500 flex-shrink-0">or</span>
          <div className="h-px bg-gray-300 w-full" />
        </div>

        <div className="mt-6 text-center">
          <span className="text-gray-500">Remember your password? </span>
          <button
            onClick={onSwitchToSignIn}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;