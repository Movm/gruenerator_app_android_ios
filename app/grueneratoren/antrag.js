import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';

export default function AntragScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://beta.gruenerator.de/antrag-no-header-footer' }}
        style={styles.webview}
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
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
  },
}); 