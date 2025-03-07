import React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { VESDK, VideoEditorModal, Configuration } from 'react-native-videoeditorsdk';
import * as ImagePicker from 'expo-image-picker';

// Initialisiere das VESDK ohne Lizenz (für nicht-kommerzielle Anwendungen)
// Dies wird ein Wasserzeichen anzeigen
try {
  VESDK.unlockWithLicense(null);
  console.log('VESDK initialisiert (ohne Lizenz)');
} catch (error) {
  console.error('Fehler bei der VESDK-Initialisierung:', error);
}

export default function VideoEditorComponent() {
  const [visible, setVisible] = React.useState(false);
  const [videoUri, setVideoUri] = React.useState(null);

  const pickVideo = async () => {
    console.log('pickVideo wurde aufgerufen');
    
    try {
      // Berechtigungen anfordern
      console.log('Fordere Berechtigungen an...');
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('Berechtigungsstatus:', status);
      
      if (status !== 'granted') {
        console.log('Berechtigung verweigert');
        Alert.alert('Berechtigung benötigt', 'Wir benötigen Zugriff auf deine Medienbibliothek, um Videos auszuwählen.');
        return;
      }

      // Video auswählen
      console.log('Starte ImagePicker...');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Videos',
        allowsEditing: false,
        quality: 1,
      });
      
      console.log('ImagePicker Ergebnis:', JSON.stringify(result));

      if (!result.canceled && result.assets && result.assets.length > 0) {
        console.log('Video ausgewählt:', result.assets[0].uri);
        setVideoUri(result.assets[0].uri);
        setVisible(true);
      } else {
        console.log('Keine Auswahl getroffen oder abgebrochen');
      }
    } catch (error) {
      console.error('Fehler beim Auswählen des Videos:', error);
      Alert.alert('Fehler', 'Es ist ein Fehler beim Auswählen des Videos aufgetreten: ' + error.message);
    }
  };

  const handleExport = (result) => {
    console.log('Video wurde exportiert:', result);
    setVisible(false);
  };

  const handleCancel = () => {
    console.log('Bearbeitung abgebrochen');
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button 
        title="Video auswählen und bearbeiten" 
        onPress={pickVideo} 
      />
      
      {videoUri && (
        <VideoEditorModal
          visible={visible}
          video={{ uri: videoUri }}
          onExport={handleExport}
          onCancel={handleCancel}
          configuration={{
            // Hier können spezifische Konfigurationen hinzugefügt werden
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
}); 