import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '../components/ThemedText';
import { useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    icon: 'robot',
    title: 'Willkommen beim Grünerator',
    subtitle: 'Dein KI-Assistent für grüne Politik'
  },
  {
    id: '2',
    icon: 'apps',
    title: 'Vielfältige Funktionen',
    subtitle: 'Von Anträgen bis zu Social Media - alles was du für deine politische Arbeit brauchst'
  },
  {
    id: '3',
    icon: 'rocket-launch',
    title: 'Los geht\'s!',
    subtitle: 'Starte jetzt und nutze die Kraft der KI für deine grüne Politik'
  }
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    light: {
      background: '#ffffff',
      text: '#005538',
      secondaryText: '#666666',
      icon: '#005538',
      dot: '#e0e0e0',
      dotActive: '#005538',
      button: '#005538',
      buttonText: '#ffffff'
    },
    dark: {
      background: '#222222',
      text: '#f3faf6',
      secondaryText: '#f3faf6',
      icon: '#f3faf6',
      dot: '#444444',
      dotActive: '#f3faf6',
      button: '#f3faf6',
      buttonText: '#222222'
    }
  };

  const theme = isDark ? colors.dark : colors.light;
  const iconSize = Math.min(width * 0.4, 200);

  const handleDone = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      router.replace('/');
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: theme.background }]}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons 
          name={item.icon}
          size={iconSize}
          color={theme.icon}
        />
      </View>
      <View style={styles.textContainer}>
        <ThemedText type="title" style={[styles.title, { color: theme.text }]}>
          {item.title}
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: theme.secondaryText }]}>
          {item.subtitle}
        </ThemedText>
      </View>
    </View>
  );

  const renderDots = () => {
    return (
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? theme.dotActive : theme.dot }
            ]}
          />
        ))}
      </View>
    );
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true
      });
    } else {
      handleDone();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />
      {renderDots()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.button }]} 
          onPress={handleNext}
        >
          <ThemedText style={[styles.buttonText, { color: theme.buttonText }]}>
            {currentIndex === slides.length - 1 ? 'Los geht\'s!' : 'Weiter'}
          </ThemedText>
        </TouchableOpacity>
        {currentIndex < slides.length - 1 && (
          <TouchableOpacity 
            style={styles.skipButton} 
            onPress={handleDone}
          >
            <ThemedText style={[styles.skipText, { color: theme.secondaryText }]}>
              Überspringen
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: width * 0.8,
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 10,
    minWidth: 160,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    fontSize: 14,
  },
}); 