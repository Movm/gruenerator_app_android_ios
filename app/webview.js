import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import SafeWebView from './components/SafeWebView';

export default function WebViewScreen() {
  const { url } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <SafeWebView url={url} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 