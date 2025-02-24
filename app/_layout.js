import { Drawer } from 'expo-router/drawer';
import { useColorScheme, StatusBar } from 'react-native';
import CustomDrawerContent from './CustomDrawerContent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

export default function Layout() {
  const isDark = useColorScheme() === 'dark';
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.header}
        translucent={true}
      />
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.header,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: theme.text,
          drawerStyle: {
            width: 280,
            backgroundColor: theme.header,
          },
          headerShown: true,
          headerTitle: 'Grünerator',
          headerTitleStyle: {
            fontFamily: 'GrueneType',
            fontSize: 24,
            color: theme.text,
          }
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} isDark={isDark} />}
      >
        <Drawer.Screen 
          name="index" 
          options={{
            drawerLabel: 'Home',
            headerTitle: 'Grünerator'
          }}
        />
        <Drawer.Screen 
          name="grueneratoren/social" 
          options={{
            drawerLabel: 'Social Media',
            title: 'Social Media'
          }}
        />
        <Drawer.Screen 
          name="grueneratoren/pressemitteilung" 
          options={{
            drawerLabel: 'Pressemitteilungen',
            title: 'Pressemitteilungen'
          }}
        />
        <Drawer.Screen 
          name="grueneratoren/antrag" 
          options={{
            drawerLabel: 'Anträge',
            title: 'Anträge'
          }}
        />
        <Drawer.Screen 
          name="grueneratoren/universal" 
          options={{
            drawerLabel: 'Universal',
            title: 'Universal'
          }}
        />
        <Drawer.Screen 
          name="grueneratoren/rede" 
          options={{
            drawerLabel: 'Politische Rede',
            title: 'Politische Rede'
          }}
        />
        <Drawer.Screen 
          name="grueneratoren/programm" 
          options={{
            drawerLabel: 'Wahlprogramm',
            title: 'Wahlprogramm'
          }}
        />
        <Drawer.Screen 
          name="grueneratoren/sharepic" 
          options={{
            drawerLabel: 'Sharepic Generator',
            title: 'Sharepic Generator'
          }}
        />
        <Drawer.Screen 
          name="grueneratoren/btw-kompass" 
          options={{
            drawerLabel: 'Wahlprüfstein BTW',
            title: 'Wahlprüfstein BTW'
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
} 