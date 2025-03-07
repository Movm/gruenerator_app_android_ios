import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, useColorScheme } from 'react-native';

export default function SafeWebView({ url, style, ...props }) {
  const webViewRef = useRef(null);
  const isDark = useColorScheme() === 'dark';
  
  // Vereinfachtes JavaScript für Dark Mode
  const injectScript = `
    (function() {
      // Dark Mode Unterstützung
      document.documentElement.setAttribute('data-theme', '${isDark ? 'dark' : 'light'}');
    })();
  `;
  
  return (
    <View style={[styles.container, style]}>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        cacheEnabled={true}
        javaScriptEnabled={true}
        bounces={false}
        overScrollMode="never"
        keyboardDisplayRequiresUserAction={false}
        injectedJavaScript={injectScript}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
}); 