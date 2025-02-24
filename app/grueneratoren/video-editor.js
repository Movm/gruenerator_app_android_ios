import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import VideoEditor from '../components/VideoEditor/VideoEditor';

export function Page() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const pickVideo = async () => {
    try {
      // Frage nach Berechtigungen
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Berechtigung erforderlich', 'Wir benötigen Zugriff auf Ihre Medienbibliothek.');
        return;
      }

      console.log('Starte Video-Auswahl...');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        quality: 1,
        allowsEditing: true,
      });

      console.log('Image Picker Ergebnis:', result);

      if (result.canceled) {
        console.log('Benutzer hat Auswahl abgebrochen');
        return;
      }

      if (result.assets && result.assets[0]) {
        console.log('Video ausgewählt:', result.assets[0].uri);
        setSelectedVideo(result.assets[0].uri);
      } else {
        console.log('Keine Assets gefunden');
        Alert.alert('Fehler', 'Es wurde kein Video ausgewählt');
      }
    } catch (error) {
      console.error('Unerwarteter Fehler:', error);
      Alert.alert('Fehler', 'Ein unerwarteter Fehler ist aufgetreten');
    }
  };
  
  return (
    <View style={{ flex: 1, gap: 10, padding: 20 }}>
      <Button title="Video auswählen" onPress={pickVideo} />
      {selectedVideo && <VideoEditor videoUri={selectedVideo} />}
    </View>
  );
} 