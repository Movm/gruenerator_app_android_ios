import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View } from 'react-native';
import CustomDrawerContent from './CustomDrawerContent';
import * as Font from 'expo-font';
import { useEffect, useState, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';

// Halte den Splash Screen sichtbar bis wir bereit sind
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [appIsReady, setAppIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // Lade die Schriftarten
        await Font.loadAsync({
          'GrueneType': require('../assets/fonts/GrueneType.ttf'),
          'PTSans': require('../assets/fonts/PTSans-Regular.ttf'),
        });

        // Prüfe, ob der Nutzer das Onboarding bereits gesehen hat
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        setShowOnboarding(!hasSeenOnboarding);
      } catch (e) {
        console.warn('Error loading fonts:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const colors = {
    light: {
      statusBar: '#f3faf6',
      header: '#ffffff',
      text: '#005538',
      statusBarStyle: 'dark'
    },
    dark: {
      statusBar: '#222222',
      header: '#222222',
      text: '#f3faf6',
      statusBarStyle: 'light'
    }
  };

  const theme = isDark ? colors.dark : colors.light;

  if (!appIsReady) {
    return null;
  }

  if (showOnboarding) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
      </Stack>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar backgroundColor={theme.statusBar} style={theme.statusBarStyle} />
        <Drawer
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.header,
            },
            headerTintColor: theme.text,
            drawerStyle: {
              width: 280,
            },
            headerTitle: 'Grünerator',
            headerTitleStyle: {
              fontFamily: 'GrueneType',
            }
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} isDark={isDark} />}
        >
          <Drawer.Screen 
            name="index" 
            options={{
              drawerLabel: 'Home',
              title: 'Grünerator'
            }}
          />
          <Drawer.Screen 
            name="webview" 
            options={{
              drawerLabel: 'Webview',
              title: 'Grünerator'
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </View>
  );
} 