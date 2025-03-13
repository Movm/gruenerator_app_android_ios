import React from 'react';
import { View, StyleSheet, Button, Alert, TouchableOpacity, Text, Animated, ScrollView, Image } from 'react-native';
import { VESDK, VideoEditorModal, Configuration } from 'react-native-videoeditorsdk';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function VideoEditorComponent() {
  const [visible, setVisible] = React.useState(false);
  const [videoUri, setVideoUri] = React.useState(null);
  const buttonScale = React.useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const pickVideo = async () => {
    animateButton();
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
        mediaTypes: ['videos'],
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
    
    // Kurze Verzögerung, damit der Modal-Dialog vollständig geschlossen wird
    setTimeout(() => {
      // Erfolgsmeldung anzeigen
      Alert.alert(
        'Video erfolgreich exportiert',
        'Möchtest du jetzt Untertitel hinzufügen?',
        [
          {
            text: 'Später',
            style: 'cancel'
          },
          {
            text: 'Ja, zu Untertiteln',
            onPress: () => navigation.navigate('Reel')
          }
        ]
      );
    }, 300);
  };

  const handleCancel = () => {
    console.log('Bearbeitung abgebrochen');
    setVisible(false);
  };

  const navigateToSubtitlesTab = () => {
    // Zum Untertitel-Tab navigieren
    navigation.navigate('Reel');
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Willkommen beim Reel Grünerator!</Text>
          <Text style={styles.welcomeText}>
            Erstelle professionelle Videos in zwei einfachen Schritten:
          </Text>
        </View>

        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Video bearbeiten</Text>
          </View>
          <Text style={styles.stepDescription}>
            Wähle ein Video aus, bearbeite es mit unserem Editor und lade es herunter.
          </Text>
          
          <Animated.View style={{ transform: [{ scale: buttonScale }], marginTop: 15 }}>
            <TouchableOpacity 
              style={styles.uploadButton} 
              onPress={pickVideo}
              activeOpacity={0.8}
            >
              <MaterialIcons name="video-library" size={24} color="#ffffff" />
              <Text style={styles.buttonText}>Video auswählen</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>Untertitel hinzufügen</Text>
          </View>
          <Text style={styles.stepDescription}>
            Wechsle zum Tab "Untertitel", lade dein bearbeitetes Video hoch und füge automatisch Untertitel hinzu.
          </Text>
          <TouchableOpacity 
            style={styles.arrowContainer} 
            onPress={navigateToSubtitlesTab}
            activeOpacity={0.7}
          >
            <MaterialIcons name="arrow-forward" size={24} color="#005538" />
            <Text style={styles.arrowText}>Zum "Untertitel"-Tab wechseln</Text>
          </TouchableOpacity>
        </View>
      </View>
      
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    paddingBottom: 100, // Zusätzliches Padding für die Tab-Navigation unten
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  welcomeCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#005538',
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 22,
  },
  stepCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#005538',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  stepDescription: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 15,
    lineHeight: 21,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#005538',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
  },
  arrowText: {
    fontSize: 15,
    color: '#005538',
    fontWeight: '500',
    marginLeft: 5,
  },
}); 