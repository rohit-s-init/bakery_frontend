// contexts/LoaderContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoaderContextType {
  isLoaderVisible: boolean;
  setIsLoaderVisible: (visible: boolean) => void;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  const showLoader = () => setIsLoaderVisible(true);
  const hideLoader = () => setIsLoaderVisible(false);

  return (
    <LoaderContext.Provider value={{ 
      isLoaderVisible, 
      setIsLoaderVisible,
      showLoader,
      hideLoader 
    }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
}

// Alternative: You can keep your original useLoader but make it use the context
// export function useLoader() {
//   const context = useContext(LoaderContext);
//   if (context === undefined) {
//     throw new Error('useLoader must be used within a LoaderProvider');
//   }
//   return { 
//     isLoaderVisible: context.isLoaderVisible, 
//     setIsLoaderVisible: context.setIsLoaderVisible 
//   };
// }