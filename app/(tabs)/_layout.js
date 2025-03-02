import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme, Animated } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { ScrollContext, createFadeAnimation } from '../context/ScrollContext';
import { useKeyboard } from '../context/KeyboardContext';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scrollContext = useContext(ScrollContext);
  const { isScrolled } = scrollContext || { isScrolled: false };
  const { isKeyboardVisible } = useKeyboard();
  const fadeAnim = useState(new Animated.Value(1))[0];

  // Fade animation for scrolling
  useEffect(() => {
    if (scrollContext) {
      createFadeAnimation(fadeAnim, isScrolled ? 0 : 1).start();
    }
  }, [isScrolled, scrollContext, fadeAnim]);

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

  // Calculate tab bar visibility based on both scroll and keyboard
  const shouldShowTabBar = !isScrolled && !isKeyboardVisible;
  const tabBarHeight = shouldShowTabBar ? 65 : 0;

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
            paddingBottom: shouldShowTabBar ? 12 : 0,
            paddingTop: shouldShowTabBar ? 8 : 0,
            transform: [{ 
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [65, 0]
              })
            }],
            opacity: fadeAnim,
            display: isKeyboardVisible ? 'none' : 'flex', // Hide completely when keyboard is visible
            overflow: 'hidden',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000, // Ensure tabs are above content but below keyboard
          },
          // Add bottom padding to screen content to prevent overlap with tabs
          contentStyle: {
            paddingBottom: shouldShowTabBar ? 65 : 0,
          },
          headerShown: false,
          tabBarShowLabel: true,
          tabBarBounces: false,
          animationEnabled: true
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