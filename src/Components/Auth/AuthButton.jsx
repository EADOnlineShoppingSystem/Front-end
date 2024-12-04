import React, { useState } from 'react';
import AuthModalPopup from './AuthModal';

const AuthButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialView, setInitialView] = useState('signin');

  const handleOpenModal = (view) => {
    setInitialView(view);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setInitialView('signin');
  };

  return (
    <div className="relative flex gap-2">
      <button
        onClick={() => handleOpenModal('signin')}
        className="px-4 py-2 text-white font-semibold rounded-md bg-gradient-to-r from-[#4169E1] to-[#FF7F6E] hover:opacity-90 transition-opacity"
      >
        Sign In
      </button>
      <button
        onClick={() => handleOpenModal('signup')}
        className="px-4 py-2 text-white font-semibold rounded-md bg-gradient-to-r from-[#4169E1] to-[#FF7F6E] hover:opacity-90 transition-opacity"
      >
        Sign Up
      </button>
      <AuthModalPopup 
        isOpen={isOpen} 
        onClose={handleClose}
        initialView={initialView}
      />
    </div>
  );
};

export default AuthButton;