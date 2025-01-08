import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function WebViewScreen() {
  const { url } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  
  const injectDarkMode = `
    (function() {
      window.matchMedia = window.matchMedia || function() {
        return {
          matches: ${colorScheme === 'dark'},
          addListener: function() {},
          removeListener: function() {}
        };
      };
    })();
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        cacheEnabled={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        thirdPartyCookiesEnabled={true}
        injectedJavaScript={injectDarkMode}
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