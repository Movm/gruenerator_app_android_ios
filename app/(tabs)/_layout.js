import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { useContext } from 'react';
import { ScrollContext } from '../context/ScrollContext';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scrollContext = useContext(ScrollContext);
  const { isScrolled } = scrollContext || { isScrolled: false };

  const colors = {
    light: {
      background: '#ffffff',
      text: '#005538',
      inactive: '#666666',
      border: '#e0e0e0'
    },
    dark: {
      background: '#222222',
      text: '#f3faf6',
      inactive: '#888888',
      border: '#444444'
    }
  };

  const theme = isDark ? colors.dark : colors.light;

  // Berechnung der Tab-Leisten-Sichtbarkeit basierend auf Scroll-Status
  const tabBarHeight = !isScrolled ? 65 : 0;

  return (
    <>
      <StatusBar 
        style={isDark ? 'light' : 'dark'}
        backgroundColor={theme.background}
        animated={true}
      />
      
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.text,
          tabBarInactiveTintColor: theme.inactive,
          tabBarLabelStyle: {
            fontFamily: 'PTSans',
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: theme.background,
            borderTopWidth: 0,
            height: tabBarHeight,
            paddingBottom: !isScrolled ? 12 : 0,
            paddingTop: !isScrolled ? 8 : 0,
            display: isScrolled ? 'none' : 'flex',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          },
          // Füge Padding zum Inhalt hinzu, um Überlappung mit Tabs zu vermeiden
          contentStyle: {
            paddingBottom: !isScrolled ? 65 : 0,
          },
          headerShown: false,
          tabBarShowLabel: true,
          tabBarBounces: false,
          animationEnabled: false,
          tabBarHideOnKeyboard: false
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Texte',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="view-grid" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="suche"
          options={{
            title: 'Suche',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="reel"
          options={{
            title: 'Reel',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="video-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'Über',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="information-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
} 