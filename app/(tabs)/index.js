import React, { useState, useContext, useEffect } from 'react';
import { View, useColorScheme, Animated, TouchableOpacity, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { ScrollContext, createFadeAnimation } from '../context/ScrollContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FocusButton from '../components/FocusButton';
import SafeWebView from '../components/SafeWebView';

const Tab = createMaterialTopTabNavigator();

function AntragScreen() {
  return <SafeWebView url="https://beta.gruenerator.de/antrag-no-header-footer" />;
}

function SocialScreen() {
  return <SafeWebView url="https://beta.gruenerator.de/presse-social-no-header-footer" />;
}

function UniversalScreen() {
  return <SafeWebView url="https://beta.gruenerator.de/universal-no-header-footer" />;
}

function GJScreen() {
  return <SafeWebView url="https://beta.gruenerator.de/gruene-jugend-no-header-footer" />;
}

//function UScreen() {
//  return <SafeWebView url="https://beta.gruenerator.de/you-no-header-footer" />;
//}

export default function TabIndexScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { isScrolled, setIsScrolled } = useContext(ScrollContext);
  const fadeAnim = useState(new Animated.Value(1))[0];
  const buttonScaleAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const updateNavigationBar = async () => {
      if (isScrolled) {
        await NavigationBar.setVisibilityAsync('hidden');
      } else {
        await NavigationBar.setVisibilityAsync('visible');
      }
    };

    Animated.parallel([
      Animated.spring(fadeAnim, {
        toValue: isScrolled ? 0 : 1,
        useNativeDriver: true,
        tension: 25,
        friction: 9
      }),
      Animated.spring(buttonScaleAnim, {
        toValue: isScrolled ? 1.1 : 1,
        useNativeDriver: true,
        tension: 25,
        friction: 9
      })
    ]).start();
    
    updateNavigationBar();
  }, [isScrolled]);

  const colors = {
    light: {
      background: '#ffffff',
      text: '#005538',
      inactive: '#666666',
    },
    dark: {
      background: '#222222',
      text: '#f3faf6',
      inactive: '#888888',
    }
  };

  const theme = isDark ? colors.dark : colors.light;

  const toggleFocus = () => {
    // Button-Feedback Animation
    Animated.sequence([
      Animated.spring(buttonScaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
        tension: 120,
        friction: 8
      }),
      Animated.spring(buttonScaleAnim, {
        toValue: isScrolled ? 1 : 1.1,
        useNativeDriver: true,
        tension: 80,
        friction: 8
      })
    ]).start();

    setIsScrolled(!isScrolled);
  };

  return (
    <SafeAreaView 
      style={{ 
        flex: 1, 
        backgroundColor: theme.background,
      }}
      edges={['left', 'right']}
    >
      <StatusBar 
        style={isDark ? 'light' : 'dark'} 
        hidden={isScrolled}
        animated={true}
      />
      <Tab.Navigator
        style={{ flex: 1 }}
        screenOptions={{
          tabBarStyle: { 
            backgroundColor: theme.background,
            elevation: 0,
            shadowOpacity: 0,
            marginTop: 0,
            marginBottom: 8,
            transform: [{ 
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-48, 0]
              })
            }],
            opacity: fadeAnim,
            height: isScrolled ? 0 : 48,
            paddingHorizontal: 0,
          },
          swipeEnabled: false,
          animationEnabled: true,
          tabBarActiveTintColor: theme.text,
          tabBarInactiveTintColor: theme.inactive,
          tabBarLabelStyle: { 
            fontFamily: 'PTSans',
            fontSize: 14,
            textTransform: 'none',
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'transparent'
          },
          tabBarScrollEnabled: false,
          tabBarBounces: false,
          tabBarItemStyle: {
            minWidth: '20%',
            padding: 0,
          },
          style: {
            width: '100%'
          },
          lazy: true,
          contentContainerStyle: {
            paddingBottom: 65, // Abstand für die Tab-Bar
          }
        }}
      >
        {/*   <Tab.Screen
             name="U"
             component={UScreen}
             options={{ title: 'U' }}
           />*/}
        <Tab.Screen
          name="Social"
          component={SocialScreen}
          options={{ title: 'Social' }}
        />
        <Tab.Screen
          name="Antrag"
          component={AntragScreen}
          options={{ title: 'Antrag' }}
        />
        <Tab.Screen
          name="Universal"
          component={UniversalScreen}
          options={{ title: 'Universal' }}
        />
        <Tab.Screen
          name="GJ"
          component={GJScreen}
          options={{ title: 'GJ' }}
        />
      </Tab.Navigator>
      <FocusButton 
        isScrolled={isScrolled}
        onPress={toggleFocus}
      />
    </SafeAreaView>
  );
} 