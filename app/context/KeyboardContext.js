import React, { createContext, useState, useEffect, useContext } from 'react';
import { Keyboard, Platform } from 'react-native';

// Erstelle den Context
const KeyboardContext = createContext({
  isKeyboardVisible: false,
  keyboardHeight: 0
});

// Provider-Komponente
export function KeyboardContextProvider({ children }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event) => {
        const height = event.endCoordinates.height;
        setKeyboardHeight(height);
        setKeyboardVisible(true);
      }
    );
    
    const keyboardHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <KeyboardContext.Provider value={{ isKeyboardVisible, keyboardHeight }}>
      {children}
    </KeyboardContext.Provider>
  );
}

// Custom Hook für einfachen Zugriff
export function useKeyboard() {
  return useContext(KeyboardContext);
}

// Default-Export für Expo Router
export default KeyboardContext; 