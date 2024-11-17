import React, { useState } from 'react';

const SignUpForm = ({ onSwitchToSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-up logic here
  };

  return (
    <div className="w-full bg-white rounded-3xl">
      {/* Decorative header line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-3xl" />
      
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        
        <form className="space-y-3" onSubmit={handleSubmit}>
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
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90 transition-opacity"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-px bg-gray-300 w-full" />
          <span className="text-gray-500 flex-shrink-0">or</span>
          <div className="h-px bg-gray-300 w-full" />
        </div>

        <div className="mt-6 text-center">
          <span className="text-gray-500">Already have an account? </span>
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

export default SignUpForm;