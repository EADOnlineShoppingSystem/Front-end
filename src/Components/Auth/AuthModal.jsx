import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import OtpForm from './OtpForm';
import NewPasswordForm from './NewPasswordForm';
import SignupOtpVerification from './SignupOtpVerification';  // Add this import

const AuthModal = ({ isOpen, onClose, initialView }) => {
  const [currentView, setCurrentView] = useState(initialView);
  const [email, setEmail] = useState('');
  const [verifiedOtp, setVerifiedOtp] = useState('');
  const [signupData, setSignupData] = useState(null);  // Add this state for signup data

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Reset all states to initial values
      setEmail('');
      setVerifiedOtp('');
      setSignupData(null);  // Reset signup data
    }
  }, [isOpen]);

  // Update currentView when initialView changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentView(initialView);
    }
  }, [initialView, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    // Reset view to initial state before closing
    setCurrentView(initialView);
    onClose();
  };

  const modalVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
      rotateX: 45,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        scale: {
          type: "spring",
          damping: 20,
          stiffness: 300,
        },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateX: -45,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    },
  };

  const formVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  const renderAuthComponent = () => {
    const getComponent = () => {
      switch (currentView) {
        case 'signup':
          return (
            <SignUpForm 
              onSwitchToSignIn={() => setCurrentView('signin')}
              onSignupSubmit={(data) => {
                setSignupData(data);  // Store signup data
                setCurrentView('signup-otp');  // Switch to OTP verification
              }}
            />
          );
        case 'signup-otp':  // Add new case for signup OTP verification
          return (
            <SignupOtpVerification
              signupData={signupData}
              onBackToSignup={() => setCurrentView('signup')}
              onVerificationSuccess={() => {
                handleClose();  // Close modal after successful verification
                // You might want to trigger a success callback here
              }}
            />
          );
        case 'forgot-password':
          return (
            <ForgotPasswordForm 
              onSwitchToSignIn={() => setCurrentView('signin')}
              onSwitchToOTP={(userEmail) => {
                setEmail(userEmail);
                setCurrentView('otp');
              }}
            />
          );
        case 'otp':
          return (
            <OtpForm 
              email={email}
              onSwitchToSignIn={() => setCurrentView('signin')}
              onOtpVerified={(otp) => {
                setVerifiedOtp(otp);
                setCurrentView('new-password');
              }}
            />
          );
        case 'new-password':
          return (
            <NewPasswordForm 
              email={email}
              otp={verifiedOtp}
              onSwitchToSignIn={() => setCurrentView('signin')}
              onClose={handleClose}
            />
          );
        default:
          return (
            <SignInForm
              onSwitchToSignUp={() => setCurrentView('signup')}
              onSwitchToForgotPassword={() => setCurrentView('forgot-password')}
            />
          );
      }
    };

    return (
      <motion.div
        key={currentView}
        variants={formVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {getComponent()}
      </motion.div>
    );
  };

  const closeButtonVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 90,
      transition: {
        duration: 0.2
      }
    },
    tap: { 
      scale: 0.9,
      rotate: 45
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 backdrop-blur-sm bg-black/60 z-40"
            onClick={handleClose}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white rounded-xl shadow-2xl p-6 w-full md:w-1/3 max-h-[90vh] overflow-y-auto relative"
              style={{ 
                perspective: "1000px",
                backfaceVisibility: "hidden"
              }}
            >
              <div className="flex justify-end mb-6">
                <motion.button
                  variants={closeButtonVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </motion.button>
              </div>

              <AnimatePresence mode="wait">
                {renderAuthComponent()}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;