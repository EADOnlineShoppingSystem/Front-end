import React, { useState } from 'react';

const NewPasswordForm = ({ email, otp, onSwitchToSignIn, onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsResetting(true);

    try {
      // Add your password reset API call here
      await resetPassword(email, otp, newPassword);
      // Show success message and close the modal
      onClose();
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };

  // Mock API function - replace with your actual API call
  const resetPassword = async (email, otp, newPassword) => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="w-full bg-white rounded-3xl">
      {/* Rest of the component remains the same until the form buttons */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-3xl" />
      
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Set New Password
        </h2>
        
        <p className="text-center text-gray-600 mb-8">
          Please enter your new password
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleResetPassword}>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="newPassword">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                placeholder="Enter new password"
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                placeholder="Confirm new password"
                minLength={8}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isResetting}
            className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isResetting ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-px bg-gray-300 w-full" />
          <span className="text-gray-500 flex-shrink-0">or</span>
          <div className="h-px bg-gray-300 w-full" />
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onSwitchToSignIn}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordForm;