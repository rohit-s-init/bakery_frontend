import React, { useState } from 'react';

interface OTPPopupProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  onVerify: (otp: string) => void;
}

const OTPPopup: React.FC<OTPPopupProps> = ({ isVisible, setIsVisible, onVerify }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    onVerify(otpValue);
  };

  const handleClose = () => {
    setIsVisible(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay - reduced blur */}
      <div 
        className="fixed inset-0 bg-black/40 z-50"
        onClick={handleClose}
      />
      
      {/* Popup - centered with bottom slide animation */}
      <div 
        className={`
          fixed inset-0 z-50 flex items-center justify-center p-4
          transition-all duration-500 ease-out
          ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div 
          className={`
            bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8
            transform transition-all duration-500 ease-out
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
            relative
          `}
        >
          {/* Close button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif text-amber-800 mb-2">Enter OTP</h2>
            <p className="text-gray-600 text-sm">
              We've sent a 6-digit code to your email
            </p>
            <p className="text-amber-700 text-sm font-medium mt-1">
              rohitrameshwarsawant@gmail.com
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-2 md:gap-3 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`
                    w-12 h-14 text-center text-xl font-semibold
                    border-2 rounded-lg focus:outline-none focus:ring-2
                    transition-all duration-200
                    ${error ? 'border-red-400 focus:ring-red-200' : 'border-amber-200 focus:ring-amber-200 focus:border-amber-400'}
                  `}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mb-3 animate-shake">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Verify OTP
            </button>
          </form>

          <div className="mt-4 text-center">
            <button 
              className="text-amber-600 text-sm hover:text-amber-800 transition-colors"
              onClick={() => {
                setOtp(['', '', '', '', '', '']);
                setError('');
              }}
            >
              Resend Code
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            By continuing, you agree to our Terms of Service
          </p>
        </div>
      </div>

      {/* Add shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default OTPPopup;