import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollContext } from '../context/ScrollContext';
import FocusButton from '../components/FocusButton';
import SafeWebView from '../components/SafeWebView';

export default function SucheScreen() {
  const { isScrolled, setIsScrolled } = useContext(ScrollContext);

  const toggleFocus = () => {
    setIsScrolled(!isScrolled);
  };

  return (
    <View style={styles.container}>
      <SafeWebView url="https://beta.gruenerator.de/suche-no-header-footer" />
      <FocusButton 
        isScrolled={isScrolled}
        onPress={toggleFocus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
  },
}); 