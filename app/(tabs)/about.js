import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, useWindowDimensions, Modal, TextInput, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { handleLink } from '../helpers/linkHandler';

export default function AboutScreen() {
  const isDark = useColorScheme() === 'dark';
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [reportText, setReportText] = useState('');
  
  const theme = {
    background: isDark ? '#222222' : '#ffffff',
    text: isDark ? '#f3faf6' : '#333333',
    primary: '#005538',
    primaryText: isDark ? '#7FBF9E' : '#005538',
    secondary: isDark ? '#888888' : '#666666',
    divider: isDark ? '#444444' : '#e0e0e0',
    modalBackground: isDark ? '#333333' : '#f5f5f5',
    inputBackground: isDark ? '#444444' : '#ffffff',
  };

  // Funktion zum Öffnen des Kontaktformulars
  const openReportForm = () => {
    setModalVisible(true);
  };

  // Funktion zum Senden des Berichts
  const sendReport = () => {
    if (reportText.trim() === '') {
      Alert.alert('Hinweis', 'Bitte gib einen Text ein.');
      return;
    }

    // Hier würde normalerweise der API-Aufruf zum Senden des Berichts erfolgen
    // Für jetzt verwenden wir die E-Mail-Methode als Fallback
    const subject = 'Meldung: Unangebrachter AI-Inhalt';
    const body = reportText;
    const mailtoUrl = `mailto:info@moritz-waechter.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailtoUrl);
    
    // Modal schließen und Formular zurücksetzen
    setModalVisible(false);
    setReportText('');
    
    // Bestätigung anzeigen
    Alert.alert('Vielen Dank', 'Deine Meldung wurde gesendet.');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 20,
    },
    section: {
      marginBottom: 32,
    },
    title: {
      fontSize: 28,
      color: theme.primaryText,
      fontFamily: 'GrueneType',
      marginBottom: 16,
    },
    text: {
      fontSize: 16,
      color: theme.text,
      fontFamily: 'PTSans',
      lineHeight: 24,
    },
    divider: {
      height: 1,
      backgroundColor: theme.divider,
      marginVertical: 16,
    },
    link: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: theme.primary,
      borderRadius: 12,
      marginTop: 12,
      flex: 1,
      marginHorizontal: 6,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      justifyContent: 'center',
    },
    linkText: {
      color: '#ffffff',
      marginLeft: 12,
      fontSize: 16,
      fontFamily: 'PTSans',
      textAlign: 'center',
    },
    gptLink: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: 16,
      backgroundColor: theme.primary,
      borderRadius: 12,
      marginTop: 12,
      flex: 1,
      marginHorizontal: 6,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    gptLinkText: {
      color: '#ffffff',
      marginTop: 8,
      fontSize: 16,
      fontFamily: 'PTSans',
      textAlign: 'center',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 24,
    },
    footerLink: {
      padding: 8,
    },
    footerText: {
      color: theme.secondary,
      fontSize: 14,
      fontFamily: 'PTSans',
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -6,
      marginTop: 4,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
      margin: 20,
      backgroundColor: theme.modalBackground,
      borderRadius: 12,
      padding: 24,
      width: '90%',
      maxWidth: 500,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontFamily: 'GrueneType',
      color: theme.primaryText,
      marginBottom: 16,
    },
    input: {
      height: 150,
      borderWidth: 1,
      borderColor: theme.divider,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      textAlignVertical: 'top',
      backgroundColor: theme.inputBackground,
      color: theme.text,
      fontFamily: 'PTSans',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      borderRadius: 8,
      padding: 12,
      elevation: 2,
      flex: 1,
      marginHorizontal: 4,
      alignItems: 'center',
    },
    buttonCancel: {
      backgroundColor: '#888888',
    },
    buttonSubmit: {
      backgroundColor: theme.primary,
    },
    buttonText: {
      color: 'white',
      fontFamily: 'PTSans',
      fontSize: 16,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Der Grünerator</Text>
        <Text style={styles.text}>
          Der Grünerator ist ein KI-gestütztes Tool, das dir hilft, schnell und effizient grüne Inhalte zu erstellen. 
          Als Freizeitprojekt von Moritz Wächter entwickelt, nutzt es die Kraft von Anthropic, um Anträge, 
          Pressemitteilungen und Social-Media-Posts zu generieren. Bleib auf dem Laufenden und melde dich für unseren Newsletter an!
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.link}
        onPress={() => handleLink('https://fax.gruenerator.de')}
      >
        <MaterialCommunityIcons name="email-newsletter" size={24} color="#ffffff" />
        <Text style={styles.linkText}>Newsletter abonnieren</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.title}>GPTs für ChatGPT</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.link}
            onPress={() => handleLink('https://chat.openai.com/g/g-ZZwx8kZS3-grunerator-social-media')}
          >
            <MaterialCommunityIcons name="instagram" size={24} color="#ffffff" />
            <Text style={styles.linkText}>Social</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.link}
            onPress={() => handleLink('https://chatgpt.com/g/g-Npcb04iH7-grunerator-pressemitteilungen')}
          >
            <MaterialCommunityIcons name="newspaper-variant" size={24} color="#ffffff" />
            <Text style={styles.linkText}>Presse</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerLink}
          onPress={() => handleLink('https://beta.gruenerator.de/impressum')}
        >
          <Text style={styles.footerText}>Impressum</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.footerLink}
          onPress={() => handleLink('https://beta.gruenerator.de/datenschutz')}
        >
          <Text style={styles.footerText}>Datenschutz</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.footerLink}
          onPress={openReportForm}
        >
          <Text style={styles.footerText}>Inhalt melden</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Unangebrachten AI-Inhalt melden</Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Bitte füge hier den unangebrachten Inhalt ein..."
              placeholderTextColor={theme.secondary}
              value={reportText}
              onChangeText={setReportText}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Abbrechen</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonSubmit]}
                onPress={sendReport}
              >
                <Text style={styles.buttonText}>Senden</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
} 