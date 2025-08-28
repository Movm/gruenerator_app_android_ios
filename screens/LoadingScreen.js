import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoadingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    light: {
      background: '#ffffff',
      text: '#005538',
      secondary: '#666666',
    },
    dark: {
      background: '#222222',
      text: '#f3faf6',
      secondary: '#888888',
    }
  };

  const theme = isDark ? colors.dark : colors.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <View style={[styles.logoContainer, { backgroundColor: '#008939' }]}>
          <MaterialCommunityIcons name="leaf" size={40} color="white" />
        </View>
        
        <Text style={[styles.title, { color: theme.text }]}>Grünerator</Text>
        
        <ActivityIndicator 
          size="large" 
          color="#008939" 
          style={styles.spinner}
        />
        
        <Text style={[styles.loadingText, { color: theme.secondary }]}>
          Wird geladen...
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'GrueneType',
    marginBottom: 40,
  },
  spinner: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'PTSans',
  },
});