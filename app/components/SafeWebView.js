import React, { useRef, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function SafeWebView({ url, style, ...props }) {
  const webViewRef = useRef(null);
  const isDark = useColorScheme() === 'dark';
  const { isAuthenticated, getAuthToken } = useAuth();
  const [authToken, setAuthToken] = useState(null);
  
  useEffect(() => {
    if (isAuthenticated) {
      getAuthToken().then(token => {
        setAuthToken(token);
      });
    } else {
      // No authentication needed for now
      setAuthToken(null);
    }
  }, [isAuthenticated]);

  // Enhanced JavaScript injection for Dark Mode and Authentication
  const injectScript = `
    (function() {
      // Dark Mode Unterstützung
      document.documentElement.setAttribute('data-theme', '${isDark ? 'dark' : 'light'}');
      
      // Authentication token injection
      ${authToken ? `
        // Store auth token in localStorage for web app access
        localStorage.setItem('mobile_auth_token', '${authToken}');
        
        // Inject auth header into fetch requests
        const originalFetch = window.fetch;
        window.fetch = function(url, options = {}) {
          if (url.includes('/api/') || url.includes('beta.gruenerator.de')) {
            options.headers = options.headers || {};
            options.headers['Authorization'] = 'Bearer ${authToken}';
          }
          return originalFetch.apply(this, arguments);
        };
        
        // Signal to web app that mobile auth is available
        window.mobileAuthAvailable = true;
        window.mobileAuthToken = '${authToken}';
      ` : ''}
    })();
  `;

  // Prepare headers for requests (no auth required for now)
  const headers = {
    'X-Mobile-App': 'true'
  };
  
  return (
    <View style={[styles.container, style]}>
      <WebView
        ref={webViewRef}
        source={{ 
          uri: url,
          headers: headers
        }}
        style={styles.webview}
        cacheEnabled={true}
        javaScriptEnabled={true}
        bounces={false}
        overScrollMode="never"
        keyboardDisplayRequiresUserAction={false}
        injectedJavaScript={injectScript}
        onNavigationStateChange={(navState) => {
          // Skip auth token injection for now
          console.log('[SafeWebView] Navigation to:', navState.url);
        }}
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