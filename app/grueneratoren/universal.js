import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

export default function UniversalScreen() {
  const colorScheme = useColorScheme();
  const webViewRef = useRef(null);
  
  const injectScript = `
    (function() {
      // Dark Mode Status setzen
      document.documentElement.setAttribute('data-theme', '${colorScheme}');
      
      // Media Query überschreiben
      window.matchMedia = window.matchMedia || function() {
        return {
          matches: ${colorScheme === 'dark'},
          addListener: function() {},
          removeListener: function() {}
        };
      };
      
      // Force-Reload der Seite mit neuem Theme
      if (document.body) {
        document.body.style.display = 'none';
        document.body.offsetHeight;
        document.body.style.display = '';
      }
    })();
  `;

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#222222' : '#ffffff' }]}>
      <WebView
        source={{ uri: 'https://beta.gruenerator.de/universal-no-header-footer' }}
        style={styles.webview}
        injectedJavaScript={injectScript}
        onLoadEnd={() => {
          // Nach dem Laden nochmal das Script ausführen
          webViewRef.current?.injectJavaScript(injectScript);
        }}
        ref={webViewRef}
        cacheEnabled={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        thirdPartyCookiesEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {
    flex: 1
  }
}); 