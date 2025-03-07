import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect, useContext } from 'react';
import { ScrollContextProvider, ScrollContext } from './context/ScrollContext';

function StackNavigator() {
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

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'PTSans': require('../assets/fonts/PTSans-Regular.ttf'),
    'PTSans-Bold': require('../assets/fonts/PTSans-Bold.ttf'),
    'GrueneType': require('../assets/fonts/GrueneType.ttf'),
  });

  useEffect(() => {
    if (!fontsLoaded) {
      SplashScreen.preventAutoHideAsync();
    } else {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StackNavigator />
      </GestureHandlerRootView>
    </ScrollContextProvider>
  );
} 