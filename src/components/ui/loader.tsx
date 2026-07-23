import React from 'react';

interface LoaderProps {
  /**
   * Whether to show the loader
   */
  loading: boolean;
  
  /**
   * Color of the spinner - can be any Tailwind color class
   * @default 'border-amber-700'
   */
  color?: string;
  
  /**
   * Thickness of the spinner border
   * @default 'border-4'
   */
  thickness?: string;
  
  /**
   * Size of the spinner
   * @default 'w-16 h-16'
   */
  spinnerSize?: string;
  
  /**
   * Background color of the overlay
   * @default 'bg-white/80'
   */
  overlayColor?: string;
  
  /**
   * Additional text to display below the spinner
   */
  message?: string;
  
  /**
   * Custom className for the overlay
   */
  className?: string;
}

/**
 * Full page loader that appears as a popup overlay
 * with a smooth fade-in animation
 */
const Loader: React.FC<LoaderProps> = ({
  loading,
  color = 'border-amber-700',
  thickness = 'border-4',
  spinnerSize = 'w-16 h-16',
  overlayColor = 'bg-white/80',
  message,
  className = ''
}) => {
  if (!loading) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-[9999] 
        flex flex-col items-center justify-center
        ${overlayColor} backdrop-blur-sm
        transition-all duration-300 ease-in-out
        ${className}
      `}
      style={{
        animation: 'fadeIn 0.3s ease-in-out'
      }}
    >
      {/* Spinner */}
      <div 
        className={`
          ${thickness} 
          border-t-transparent 
          ${color}
          rounded-full 
          animate-spin
          ${spinnerSize}
          aspect-square
        `}
      />
      
      {/* Optional message */}
      {message && (
        <p className="mt-6 text-gray-700 font-medium animate-pulse">
          {message}
        </p>
      )}
      
      {/* Optional loader dots animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

/**
 * Full page loader with a card-style popup
 * More prominent and visually appealing
 */
export const LoaderCard: React.FC<LoaderProps> = ({
  loading,
  color = 'border-amber-700',
  thickness = 'border-4',
  spinnerSize = 'w-16 h-16',
  overlayColor = 'bg-black/50',
  message = 'Loading...',
  className = ''
}) => {
  if (!loading) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-[9999] 
        flex items-center justify-center
        ${overlayColor} backdrop-blur-sm
        transition-all duration-300
        ${className}
      `}
      style={{
        animation: 'fadeIn 0.3s ease-in-out'
      }}
    >
      <div 
        className="
          bg-white rounded-2xl shadow-2xl 
          p-8 md:p-12 
          max-w-sm w-full mx-4
          flex flex-col items-center
          transform transition-all duration-300
        "
        style={{
          animation: 'slideUp 0.4s ease-out'
        }}
      >
        {/* Spinner */}
        <div 
          className={`
            ${thickness} 
            border-t-transparent 
            ${color}
            rounded-full 
            animate-spin
            ${spinnerSize}
            aspect-square
            mb-4
          `}
        />
        
        {/* Message */}
        {message && (
          <>
            <p className="text-gray-800 font-medium text-center">
              {message}
            </p>
            <div className="flex gap-1 mt-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </>
        )}
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

/**
 * Simple full page loader with just a spinner
 * Minimal version
 */
export const SimpleLoader: React.FC<{
  loading: boolean;
  color?: string;
}> = ({ loading, color = 'border-amber-700' }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div 
        className={`
          border-4 border-t-transparent 
          ${color}
          rounded-full 
          animate-spin
          w-12 h-12
        `}
      />
    </div>
  );
};

// Example usage component
export const LoaderExamples: React.FC = () => {
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [loading3, setLoading3] = React.useState(false);

  const handleLoad = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(true);
    setTimeout(() => setter(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8">
      <h2 className="text-3xl font-serif text-amber-800 mb-8">Full Page Loader Examples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Example 1: Simple full page loader */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-2">Simple Loader</h3>
          <p className="text-sm text-gray-600 mb-4">Minimal overlay with spinner</p>
          <button 
            onClick={() => handleLoad(setLoading1)}
            className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors"
          >
            Show Loader
          </button>
          <Loader loading={loading1} />
        </div>

        {/* Example 2: Loader with message */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-2">With Message</h3>
          <p className="text-sm text-gray-600 mb-4">Shows loading text</p>
          <button 
            onClick={() => handleLoad(setLoading2)}
            className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors"
          >
            Show Loader
          </button>
          <Loader 
            loading={loading2} 
            message="Please wait while we process your request..."
          />
        </div>

        {/* Example 3: Card style loader */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-2">Card Style</h3>
          <p className="text-sm text-gray-600 mb-4">Popup with card design</p>
          <button 
            onClick={() => handleLoad(setLoading3)}
            className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors"
          >
            Show Loader
          </button>
          <LoaderCard 
            loading={loading3} 
            message="Loading your content..."
          />
        </div>
      </div>

      {/* Custom loader example */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h3 className="font-semibold text-gray-800 mb-2">Custom Styled Loader</h3>
        <p className="text-sm text-gray-600 mb-4">With custom colors and size</p>
        <button 
          onClick={() => {
            const customLoader = document.getElementById('custom-loader');
            if (customLoader) {
              customLoader.style.display = 'flex';
              setTimeout(() => {
                customLoader.style.display = 'none';
              }, 3000);
            }
          }}
          className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors"
        >
          Show Custom Loader
        </button>
        
        <div 
          id="custom-loader"
          className="fixed inset-0 z-[9999] hidden items-center justify-center bg-indigo-900/80 backdrop-blur-sm"
        >
          <div className="text-center">
            <div className="border-4 border-t-transparent border-rose-400 rounded-full animate-spin w-20 h-20 mx-auto" />
            <p className="text-white mt-4 text-lg font-medium">Loading your custom experience...</p>
            <p className="text-indigo-300 text-sm mt-2">This might take a moment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;