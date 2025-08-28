import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  useColorScheme,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { AUTH_CONFIG } from '../services/authConfig';

export default function LoginScreen() {
  const { login } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState(null);

  const colors = {
    light: {
      background: '#ffffff',
      text: '#005538',
      secondary: '#666666',
      card: '#f8f9fa',
    },
    dark: {
      background: '#222222',
      text: '#f3faf6',
      secondary: '#888888',
      card: '#333333',
    }
  };

  const theme = isDark ? colors.dark : colors.light;

  const handleLogin = async (provider) => {
    try {
      setIsLoading(true);
      setLoadingProvider(provider);
      
      const result = await login(provider);
      
      if (result.success) {
        // Navigation will be handled by auth state change
        console.log('Login successful');
      } else {
        Alert.alert(
          'Login fehlgeschlagen',
          result.error || 'Ein Fehler ist beim Login aufgetreten',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Fehler',
        'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const getProviderIcon = (iconName) => {
    switch (iconName) {
      case 'account':
        return 'account-circle';
      case 'web':
        return 'web';
      case 'network':
        return 'network';
      default:
        return 'account-circle';
    }
  };

  const renderProviderButton = (providerId) => {
    const provider = AUTH_CONFIG.providers[providerId];
    const isProviderLoading = isLoading && loadingProvider === providerId;
    
    return (
      <TouchableOpacity
        key={providerId}
        style={[
          styles.providerButton,
          { backgroundColor: provider.color },
          isProviderLoading && styles.providerButtonLoading
        ]}
        onPress={() => handleLogin(providerId)}
        disabled={isLoading}
      >
        <View style={styles.providerButtonContent}>
          {isProviderLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <View style={styles.providerIcon}>
              <MaterialCommunityIcons
                name={getProviderIcon(provider.icon)}
                size={24}
                color="white"
              />
            </View>
          )}
          <View style={styles.providerTextContainer}>
            <Text style={styles.providerButtonText}>
              {provider.name}
            </Text>
            <Text style={styles.providerButtonSubtext}>
              {provider.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        style={isDark ? 'light' : 'dark'}
        backgroundColor={theme.background}
      />
      
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={[styles.logoPlaceholder, { backgroundColor: '#008939' }]}>
            <MaterialCommunityIcons name="leaf" size={40} color="white" />
          </View>
        </View>
        <Text style={[styles.title, { color: theme.text }]}>Grünerator</Text>
        <Text style={[styles.subtitle, { color: theme.secondary }]}>
          Wähle deine Login-Methode
        </Text>
      </View>

      <View style={styles.providersContainer}>
        {Object.keys(AUTH_CONFIG.providers).map(renderProviderButton)}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.secondary }]}>
          Sicher und verschlüsselt
        </Text>
        <Text style={[styles.footerSubtext, { color: theme.secondary }]}>
          Deine Daten sind bei uns sicher
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'GrueneType',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PTSans',
  },
  providersContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  providerButton: {
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  providerButtonLoading: {
    opacity: 0.7,
  },
  providerButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  providerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  providerTextContainer: {
    flex: 1,
  },
  providerButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
    fontFamily: 'PTSans-Bold',
  },
  providerButtonSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'PTSans',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    fontFamily: 'PTSans',
  },
  footerSubtext: {
    fontSize: 12,
    fontFamily: 'PTSans',
  },
});