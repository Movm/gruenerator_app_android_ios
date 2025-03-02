import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { handleLink } from '../helpers/linkHandler';

export default function AboutScreen() {
  const isDark = useColorScheme() === 'dark';
  const { width } = useWindowDimensions();
  
  const theme = {
    background: isDark ? '#222222' : '#ffffff',
    text: isDark ? '#f3faf6' : '#333333',
    primary: '#005538',
    primaryText: isDark ? '#7FBF9E' : '#005538',
    secondary: isDark ? '#888888' : '#666666',
    divider: isDark ? '#444444' : '#e0e0e0',
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
      </View>
    </ScrollView>
  );
} 