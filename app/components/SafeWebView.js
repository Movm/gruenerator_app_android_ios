import React from 'react';
import { WebView } from 'react-native-webview';
import { View, Platform, StyleSheet } from 'react-native';
import { useKeyboard } from '../context/KeyboardContext';
import { useContext } from 'react';
import { ScrollContext } from '../context/ScrollContext';

export default function SafeWebView({ url, style, ...props }) {
  const { isKeyboardVisible } = useKeyboard();
  const { isScrolled } = useContext(ScrollContext);
  
  // Berechne den benötigten Abstand basierend auf Tastatur und Scroll-Status
  const bottomPadding = (!isKeyboardVisible && !isScrolled) ? 65 : 0;
  
  // JavaScript, das in die WebView injiziert wird, um den Abstand am unteren Rand hinzuzufügen
  const injectPaddingScript = `
    (function() {
      // Füge einen Abstand am Ende der Seite hinzu
      var style = document.createElement('style');
      style.innerHTML = 'body { padding-bottom: ${bottomPadding}px; }';
      document.head.appendChild(style);
      
      // Beobachte Änderungen am DOM und stelle sicher, dass der Stil erhalten bleibt
      var observer = new MutationObserver(function(mutations) {
        if (!document.querySelector('style[data-padding-fix]')) {
          var style = document.createElement('style');
          style.setAttribute('data-padding-fix', 'true');
          style.innerHTML = 'body { padding-bottom: ${bottomPadding}px; }';
          document.head.appendChild(style);
        }
      });
      
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    })();
  `;
  
  return (
    <View style={[styles.container, style]}>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        cacheEnabled={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        thirdPartyCookiesEnabled={true}
        scrollEnabled={true}
        bounces={false}
        overScrollMode="never"
        contentInset={Platform.OS === 'ios' ? { bottom: bottomPadding } : undefined}
        containerStyle={Platform.OS === 'android' ? { paddingBottom: bottomPadding } : undefined}
        injectedJavaScript={injectPaddingScript}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
}); 