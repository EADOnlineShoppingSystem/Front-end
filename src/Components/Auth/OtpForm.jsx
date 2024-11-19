import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd'

const OtpForm = ({ email, onSwitchToSignIn, onOtpVerified }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    setError('');
    setIsVerifying(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/verify-reset-otp', { 
        email, 
        otp: otpString 
      });
      
      // If verification is successful
      message.success(response.data.message);
      onOtpVerified(otpString);
    } catch (err) {
      // Handle error response from server
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // Implement your resend OTP logic here
      // This would typically be another API call to generate and send a new OTP
      console.log('Resending OTP...');
      // You might want to add a success message or state
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl">
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-3xl" />
      
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Enter OTP
        </h2>
        
        <p className="text-center text-gray-600 mb-8">
          Please enter the 6-digit code sent to {email}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleVerifyOtp}>
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-semibold bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isVerifying || otp.join('').length !== 6}
            className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isVerifying ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-px bg-gray-300 w-full" />
          <span className="text-gray-500 flex-shrink-0">or</span>
          <div className="h-px bg-gray-300 w-full" />
        </div>

        <div className="mt-6 text-center space-y-4">
          <button
            onClick={onSwitchToSignIn}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Sign In
          </button>
          
          <div>
            <span className="text-gray-500">Didn't receive the code? </span>
            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 font-medium"
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;