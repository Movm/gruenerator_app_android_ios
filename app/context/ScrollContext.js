import React, { createContext, useContext, useState } from 'react';
import { Animated } from 'react-native';

export const ScrollContext = createContext(null);

export const createFadeAnimation = (animatedValue, toValue) => {
  return Animated.spring(animatedValue, {
    toValue,
    useNativeDriver: true,
    tension: 25,
    friction: 9,
  });
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollContextProvider');
  }
  return context;
};

export function ScrollContextProvider({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <ScrollContext.Provider value={{ isScrolled, setIsScrolled }}>
      {children}
    </ScrollContext.Provider>
  );
}

export default ScrollContext; 