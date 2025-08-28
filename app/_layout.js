import { Stack } from 'expo-router';
import { useColorScheme, Text, View, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect, useContext, useState } from 'react';
import React from 'react';
import { ScrollContextProvider, ScrollContext } from './context/ScrollContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import LoadingScreen from '../screens/LoadingScreen';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    console.error('[ErrorBoundary] Caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Error details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>App Crashed</Text>
          <Text style={{ fontSize: 14, marginBottom: 20, textAlign: 'center' }}>The app encountered an error and needs to restart.</Text>
          <ScrollView style={{ maxHeight: 200 }}>
            <Text style={{ fontSize: 12, fontFamily: 'monospace' }}>
              {this.state.error ? this.state.error.toString() : 'Unknown error'}
            </Text>
          </ScrollView>
        </View>
      );
    }

    return this.props.children;
  }
}

function AuthenticatedStackNavigator() {
  console.log('[DEBUG] AuthenticatedStackNavigator rendering');
  const isDark = useColorScheme() === 'dark';
  const { isScrolled } = useContext(ScrollContext);

  const colors = {
    light: {
      header: '#ffffff',
      text: '#005538'
    },
    dark: {
      header: '#222222',
      text: '#f3faf6'
    }
  };

  const theme = isDark ? colors.dark : colors.light;

  return (
    <Stack
      screenOptions={{
        animation: 'none',
      }}
    >
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: !isScrolled,
          title: "Grünerator",
          headerStyle: {
            backgroundColor: theme.header,
            height: 80,
          },
          headerTitleStyle: {
            fontFamily: 'GrueneType',
            fontSize: 24,
            color: theme.text,
          },
          headerTitleContainerStyle: {
            left: 24,
          },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}

function AppNavigator() {
  console.log('[DEBUG] AppNavigator rendering');
  const { isAuthenticated, isLoading } = useAuth();
  console.log('[DEBUG] Auth state - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);

  if (isLoading) {
    console.log('[DEBUG] Rendering LoadingScreen');
    return <LoadingScreen />;
  }

  // Skip authentication requirement for now
  console.log('[DEBUG] Rendering AuthenticatedStackNavigator (auth optional)');
  return (
    <ScrollContextProvider>
      <AuthenticatedStackNavigator />
    </ScrollContextProvider>
  );
}

export default function Layout() {
  console.log('[DEBUG] Layout component starting');
  const [initError, setInitError] = useState(null);
  
  const [fontsLoaded] = useFonts({
    'PTSans': require('../assets/fonts/PTSans-Regular.ttf'),
    'PTSans-Bold': require('../assets/fonts/PTSans-Bold.ttf'),
    'GrueneType': require('../assets/fonts/GrueneType.ttf'),
  });
  
  console.log('[DEBUG] Fonts loaded:', fontsLoaded);

  useEffect(() => {
    console.log('[DEBUG] useEffect triggered, fontsLoaded:', fontsLoaded);
    try {
      if (!fontsLoaded) {
        console.log('[DEBUG] Preventing splash screen auto-hide');
        SplashScreen.preventAutoHideAsync();
      } else {
        console.log('[DEBUG] Hiding splash screen');
        SplashScreen.hideAsync();
      }
    } catch (error) {
      console.error('[ERROR] SplashScreen error:', error);
      setInitError(error);
    }
  }, [fontsLoaded]);

  if (initError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Initialization Error</Text>
        <Text style={{ fontSize: 14, textAlign: 'center' }}>{initError.toString()}</Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    console.log('[DEBUG] Fonts not loaded yet, returning null');
    return null;
  }

  console.log('[DEBUG] All initialized, rendering main app');
  return (
    <ErrorBoundary>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppNavigator />
        </GestureHandlerRootView>
      </AuthProvider>
    </ErrorBoundary>
  );
} 