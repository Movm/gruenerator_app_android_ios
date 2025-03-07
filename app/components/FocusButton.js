import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

export default function FocusButton({ isScrolled, onPress, style }) {
  const isDark = useColorScheme() === 'dark';
  const isKeyboardVisible = false; // Statischer Wert als Ersatz
  const buttonScaleAnim = useState(new Animated.Value(isScrolled ? 1.1 : 1))[0];
  const buttonPositionAnim = useState(new Animated.Value(isScrolled ? 64 : 0))[0];
  const buttonOpacityAnim = useState(new Animated.Value(1))[0];

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

  useEffect(() => {
    Animated.parallel([
      Animated.spring(buttonScaleAnim, {
        toValue: isScrolled ? 0.9 : 1,
        useNativeDriver: true,
        tension: 25,
        friction: 9
      }),
      Animated.spring(buttonPositionAnim, {
        toValue: isScrolled ? 64 : 0,
        useNativeDriver: true,
        tension: 25,
        friction: 9
      }),
      Animated.timing(buttonOpacityAnim, {
        toValue: isKeyboardVisible ? 0 : 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  }, [isScrolled, isKeyboardVisible]);

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(buttonScaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
        tension: 120,
        friction: 8
      }),
      Animated.spring(buttonScaleAnim, {
        toValue: isScrolled ? 0.9 : 1,
        useNativeDriver: true,
        tension: 25,
        friction: 9
      })
    ]).start();

    onPress?.();
  };

  // Wenn die Tastatur sichtbar ist, wird der Button nicht gerendert
  if (isKeyboardVisible) {
    return null;
  }

  return (
    <Animated.View
      style={[{
        position: 'absolute',
        bottom: 80,
        right: 16,
        transform: [
          { scale: buttonScaleAnim },
          { translateY: buttonPositionAnim }
        ],
        opacity: buttonOpacityAnim
      }, style]}
    >
      <TouchableOpacity 
        onPress={handlePress}
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: isScrolled ? theme.text : theme.background,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: isScrolled ? 0 : 1,
          borderColor: theme.text,
        }}
      >
        <MaterialCommunityIcons 
          name={isScrolled ? "fullscreen-exit" : "fullscreen"} 
          size={24} 
          color={isScrolled ? theme.background : theme.text}
        />
      </TouchableOpacity>
    </Animated.View>
  );
} 