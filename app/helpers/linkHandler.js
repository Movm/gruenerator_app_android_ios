import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * Öffnet einen Link entweder im In-App-Browser oder im externen Browser,
 * abhängig von der Domain.
 * 
 * @param {string} url - Die URL, die geöffnet werden soll
 * @param {object} options - Optionale Parameter
 * @param {function} options.onClose - Callback, der aufgerufen wird, wenn der Browser geschlossen wird
 * @param {boolean} options.useWebView - Wenn true, wird die URL in der WebView-Komponente geöffnet
 * @returns {Promise<void>}
 */
export const handleLink = async (url, options = {}) => {
  const { onClose, useWebView } = options;
  
  // Prüfe, ob die URL zu einer der spezifizierten Domains gehört
  const isGrueneratorLink = 
    url.includes('gruenera.uber.space') || 
    url.includes('links.gruenerator.de') ||
    url.includes('gruenerator.de') ||
    url.includes('fax.gruenerator.de');
  
  if (isGrueneratorLink) {
    // Öffne den Link im In-App-Browser
    if (useWebView) {
      // Wenn useWebView true ist, verwende die WebView-Komponente
      const router = useRouter();
      router.push({
        pathname: '/webview',
        params: { url }
      });
    } else {
      // Sonst verwende den In-App-Browser
      await WebBrowser.openBrowserAsync(url, {
        readerMode: false,
        controlsColor: '#005538',
        toolbarColor: '#ffffff',
        dismissButtonStyle: 'close',
        presentationStyle: 'pageSheet',
      });
      
      // Rufe den onClose-Callback auf, wenn vorhanden
      if (onClose && typeof onClose === 'function') {
        onClose();
      }
    }
  } else {
    // Öffne andere Links im externen Browser
    await Linking.openURL(url);
  }
}; 