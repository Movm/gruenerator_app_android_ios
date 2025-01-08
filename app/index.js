import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { menuItems } from '../config/menuItems';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const padding = 16;
const margin = 6;
const headerHeight = 80;
const availableHeight = windowHeight - headerHeight;
const rows = 4;
const buttonHeight = (availableHeight - (padding * 2) - (margin * (rows * 2))) / rows;
const buttonWidth = (windowWidth - (padding * 2) - (margin * 4)) / 2;
const iconSize = Math.floor(Math.min(buttonWidth, buttonHeight) * 0.2);

export default function Home() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    light: {
      background: '#ffffff',
      text: '#005538',
      buttonBg: '#ffffff',
      buttonText: '#333333',
      buttonIcon: '#005538',
    },
    dark: {
      background: '#222222',
      text: '#f3faf6',
      buttonBg: '#333333',
      buttonText: '#f3faf6',
      buttonIcon: '#f3faf6',
    }
  };

  const theme = isDark ? colors.dark : colors.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      flexGrow: 1,
    },
    heading: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.text,
      textAlign: 'left',
      marginBottom: 16,
      marginTop: 16,
      paddingHorizontal: 24,
      fontFamily: 'GrueneType',
    },
    menuGrid: {
      padding: padding,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    menuItem: {
      width: buttonWidth,
      height: buttonHeight,
      backgroundColor: theme.buttonBg,
      borderRadius: 15,
      padding: 12,
      margin: margin,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      shadowColor: isDark ? '#000' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.15,
      shadowRadius: 6,
    },
    icon: {
      color: theme.buttonIcon,
      marginBottom: 12,
    },
    menuText: {
      fontSize: Math.max(13, Math.min(buttonWidth, buttonHeight) * 0.1),
      color: theme.buttonText,
      textAlign: 'center',
      fontWeight: '500',
      fontFamily: 'PTSans',
    },
  });

  const navigateToWebView = (route) => {
    router.push(route);
  };

  const resetOnboarding = async () => {
    await AsyncStorage.removeItem('hasSeenOnboarding');
    router.replace('/onboarding');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id}
            style={styles.menuItem}
            onPress={() => navigateToWebView(item.route)}
          >
            <item.icon.component name={item.icon.name} size={iconSize} style={styles.icon} />
            <Text style={styles.menuText}>{item.shortTitle || item.title}</Text>
          </TouchableOpacity>
        ))}

        {__DEV__ && (
          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: '#ff4444' }]}
            onPress={resetOnboarding}
          >
            <MaterialCommunityIcons name="refresh" size={iconSize} style={[styles.icon, { color: '#ffffff' }]} />
            <Text style={[styles.menuText, { color: '#ffffff' }]}>Reset Onboarding</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
} 