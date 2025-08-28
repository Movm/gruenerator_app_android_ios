import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, useColorScheme, Animated, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { ScrollContext } from '../context/ScrollContext';
import FocusButton from '../components/FocusButton';

const Tab = createMaterialTopTabNavigator();

function WebViewScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://beta.gruenerator.de/reel-no-header-footer' }}
        style={styles.webview}
        cacheEnabled={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        thirdPartyCookiesEnabled={true}
      />
    </View>
  );
}

function EditorScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const colors = {
    light: {
      background: '#ffffff',
      text: '#005538',
    },
    dark: {
      background: '#222222',
      text: '#f3faf6',
    }
  };

  const theme = isDark ? colors.dark : colors.light;
  
  return (
    <View style={[styles.placeholderContainer, { backgroundColor: theme.background }]}>
      <Text style={[styles.placeholderText, { color: theme.text }]}>
        Video Editor
      </Text>
      <Text style={[styles.placeholderSubtext, { color: theme.text }]}>
        Coming soon
      </Text>
    </View>
  );
}

export default function ReelScreen() {
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
            minWidth: '50%',
            padding: 0,
          },
          style: {
            width: '100%'
          },
          lazy: true,
        }}
      >
        <Tab.Screen
          name="Editor"
          component={EditorScreen}
          options={{ title: 'Editor' }}
        />
        <Tab.Screen
          name="Reel"
          component={WebViewScreen}
          options={{ title: 'Untertitel' }}
        />
      </Tab.Navigator>
      <FocusButton 
        isScrolled={isScrolled}
        onPress={toggleFocus}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontFamily: 'GrueneType',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 16,
    fontFamily: 'PTSans',
    opacity: 0.6,
  },
}); 