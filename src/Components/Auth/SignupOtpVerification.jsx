import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';

const SignupOtpVerification = ({ signupData, onBackToSignup, onVerificationSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timer = timeLeft > 0 && !canResend && 
      setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    
    if (timeLeft === 0) {
      setCanResend(true);
    }

    return () => timer && clearInterval(timer);
  }, [timeLeft, canResend]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (element.value && index < 5) {
      const nextInput = element.parentElement.nextSibling.querySelector('input');
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = e.target.parentElement.previousSibling.querySelector('input');
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter all digits');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/users/verify-otp', {
        email: signupData.email,
        otp: otpValue
      });
      message.success(response.data.message);
      // If successful
      onVerificationSuccess();
      
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setCanResend(false);
    setTimeLeft(30);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/users/resend-otp', {
        email: signupData.email
      });

      // Optionally show a success message
      setError(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to resend OTP. Please try again.');
      setCanResend(true);
    }
  }; 

  return (
    <div className="w-full bg-white rounded-3xl">
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-3xl" />
      
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Verify Email
        </h2>
        
        <p className="text-center text-gray-600 mb-8">
          We've sent a verification code to<br />
          <span className="font-medium text-gray-900">{signupData?.email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <div key={index} className="w-12">
                <input
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full h-12 text-center text-xl font-semibold bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isVerifying ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          {!canResend ? (
            <p className="text-gray-600">
              Resend code in {timeLeft} seconds
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Resend Code
            </button>
          )}

          <button
            onClick={onBackToSignup}
            className="text-gray-600 hover:text-gray-700"
          >
            ← Back to Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupOtpVerification;