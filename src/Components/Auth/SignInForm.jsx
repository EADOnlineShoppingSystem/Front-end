import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = ({ onSwitchToSignUp, onSwitchToForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  // Handle blur events for each field
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  // Validate individual field
  const validateField = (field) => {
    let fieldError = '';
    switch (field) {
      case 'email':
        fieldError = validateEmail(email);
        break;
      case 'password':
        fieldError = validatePassword(password);
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [field]: fieldError }));
    return fieldError;
  };

  // Validate all fields
  const validateForm = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError
    });

    return !emailError && !passwordError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    // Validate all fields before submission
    if (!validateForm()) {
      // Set all fields as touched to show errors
      setTouched({
        email: true,
        password: true
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });

      const { token } = response.data;
      sessionStorage.setItem('token', token);
      window.location.href = '/';
    } catch (err) {
      setApiError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl">
      {/* Decorative header line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-3xl" />
      
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Sign In
        </h2>
        
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* API Error Message */}
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              <p className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
                {apiError}
              </p>
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) validateField('email');
              }}
              onBlur={() => handleBlur('email')}
              className={`w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 
                ${errors.email && touched.email 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'focus:ring-purple-500'}`}
              placeholder="Enter your email"
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (touched.password) validateField('password');
              }}
              onBlur={() => handleBlur('password')}
              className={`w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 
                ${errors.password && touched.password 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'focus:ring-purple-500'}`}
              placeholder="Enter your password"
            />
            {errors.password && touched.password && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90 transition-opacity disabled:opacity-75"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={onSwitchToForgotPassword}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Forgot Password?
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-px bg-gray-300 w-full" />
          <span className="text-gray-500 flex-shrink-0">or</span>
          <div className="h-px bg-gray-300 w-full" />
        </div>

        <div className="mt-6 text-center">
          <span className="text-gray-500">Don't have an account? </span>
          <button
            onClick={onSwitchToSignUp}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;