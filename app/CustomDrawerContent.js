import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { menuItems } from '../config/menuItems';
import { handleLink } from './helpers/linkHandler';

const createStyles = (isDark) => StyleSheet.create({
  scrollView: {
    backgroundColor: isDark ? '#222222' : '#ffffff',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: isDark ? '#222222' : '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: isDark ? '#f3faf6' : '#005538',
    marginBottom: 4,
    fontFamily: 'GrueneType',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: isDark ? '#f3faf6' : '#666666',
    fontFamily: 'PTSans',
  },
  divider: {
    height: 1,
    backgroundColor: isDark ? '#444444' : '#e0e0e0',
    marginVertical: 8,
  },
  menuSection: {
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: isDark ? '#222222' : '#ffffff',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    color: isDark ? '#f3faf6' : '#005538',
  },
  menuText: {
    fontSize: 16,
    color: isDark ? '#f3faf6' : '#333333',
    fontWeight: '500',
    fontFamily: 'PTSans',
  },
  submenu: {
    backgroundColor: isDark ? '#333333' : '#f5f5f5',
  },
  submenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 32,
  },
  submenuIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    color: isDark ? '#f3faf6' : '#005538',
  },
  submenuText: {
    fontSize: 14,
    color: isDark ? '#f3faf6' : '#333333',
    fontFamily: 'PTSans',
  },
  footerLinks: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: isDark ? '#444444' : '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  footerIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    color: isDark ? '#888888' : '#666666',
  },
  footerText: {
    fontSize: 12,
    color: isDark ? '#888888' : '#666666',
    fontFamily: 'PTSans',
  },
});

export default function CustomDrawerContent(props) {
  const [gptsOpen, setGptsOpen] = useState(false);
  const router = useRouter();
  const styles = createStyles(props.isDark);

  const navigateToWebView = (url) => {
    handleLink(url, { 
      useWebView: true,
      onClose: () => props.navigation.closeDrawer()
    });
  };

  const renderGPTsSubmenu = () => {
    if (!gptsOpen) return null;
    return (
      <View style={styles.submenu}>
        <TouchableOpacity 
          style={styles.submenuItem}
          onPress={() => handleLink('https://chat.openai.com/g/g-ZZwx8kZS3-grunerator-social-media')}
        >
          <MaterialCommunityIcons name="robot-outline" size={24} style={styles.submenuIcon} />
          <Text style={styles.submenuText}>Social Media GPT</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.submenuItem}
          onPress={() => handleLink('https://chatgpt.com/g/g-Npcb04iH7-grunerator-pressemitteilungen')}
        >
          <MaterialCommunityIcons name="robot-outline" size={24} style={styles.submenuIcon} />
          <Text style={styles.submenuText}>Pressemitteilung GPT</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <DrawerContentScrollView {...props} style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Grünerator</Text>
          <Text style={styles.subtitle}>Dein KI-Assistent für grüne Politik</Text>
        </View>
        
        <View style={styles.divider} />

        <View style={styles.menuSection}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              router.push("/");
              props.navigation.closeDrawer();
            }}
          >
            <MaterialCommunityIcons name="home" size={24} style={styles.icon} />
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>

          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigateToWebView(item.route)}
            >
              <item.icon.component name={item.icon.name} size={24} style={styles.icon} />
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => setGptsOpen(!gptsOpen)}
        >
          <MaterialCommunityIcons name="robot" size={24} style={styles.icon} />
          <Text style={styles.menuText}>
            GPTs für ChatGPT {gptsOpen ? '▼' : '▶'}
          </Text>
        </TouchableOpacity>
        {renderGPTsSubmenu()}

        <View style={styles.footerLinks}>
          <TouchableOpacity 
            style={styles.footerItem}
            onPress={() => navigateToWebView('https://beta.gruenerator.de/impressum')}
          >
            <MaterialCommunityIcons name="information-outline" size={16} style={styles.footerIcon} />
            <Text style={styles.footerText}>Impressum</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.footerItem}
            onPress={() => navigateToWebView('https://beta.gruenerator.de/datenschutz')}
          >
            <MaterialCommunityIcons name="shield-check-outline" size={16} style={styles.footerIcon} />
            <Text style={styles.footerText}>Datenschutz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
} 