# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native/Expo mobile app called "Gruenerator" that serves as a WebView container for the Gruenerator platform. The app provides mobile access to political content generators with authentication and video editing capabilities.

## Commands

### Development
- `npm start` or `expo start --dev-client` - Start development server with custom dev client
- `npm run android` - Run on Android device/emulator  
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run web version

### Testing & Quality
- `npm test` - Run Jest tests in watch mode
- `npm run lint` - Run Expo linter

### Platform-specific builds
- `expo run:android` - Build and run Android
- `expo run:ios` - Build and run iOS

## Architecture

### Core Structure
- **Expo Router**: File-based routing with tab navigation
- **WebView Integration**: SafeWebView component handles authenticated web content
- **Authentication**: OAuth2/OIDC flow with PKCE, token refresh, and secure storage
- **Video Editing**: Integration with react-native-videoeditorsdk for IMG.LY video editing

### Key Components
- `app/_layout.js` - Root layout with authentication flow and font loading
- `app/components/SafeWebView.js` - Enhanced WebView with auth token injection and dark mode support
- `contexts/AuthContext.js` - Global authentication state management
- `services/authService.js` - OAuth2 authentication with PKCE flow
- `services/tokenStorage.js` - Secure token storage using Expo SecureStore

### Navigation
- Tab-based navigation in `app/(tabs)/` with routes: index, reel, suche, about
- WebView screens for different generators in `app/grueneratoren/`
- Menu configuration in `config/menuItems.js`

### Authentication Flow
1. OAuth2/OIDC with PKCE code challenge
2. Token exchange and secure storage
3. Automatic token refresh
4. Token injection into WebView for authenticated requests
5. Mobile-specific backend endpoints at `/auth/mobile/*`

### WebView Enhancement
- Dark mode detection and theme injection
- Authentication token injection for API calls
- Custom headers for mobile app identification
- JavaScript injection for seamless web app integration

## Dependencies

### Core
- React Native 0.76.7 with Expo SDK ~52.0
- Expo Router for navigation
- React Native WebView for content display

### Authentication
- expo-auth-session for OAuth2 flows
- expo-secure-store for token storage
- expo-crypto for PKCE implementation

### Video Editing  
- react-native-videoeditorsdk (IMG.LY integration)
- Requires specific Android SDK versions and modules (see app.json plugins)

## Platform Configuration

### iOS
- Bundle ID: `de.gruenerator.app`
- Minimum iOS: 15.1
- Camera, photo library, and microphone permissions required

### Android
- Package: `de.gruenerator.app` 
- Min SDK: 24, Target SDK: 34
- Permissions: CAMERA, READ/WRITE_EXTERNAL_STORAGE, RECORD_AUDIO

## Development Notes

- Uses custom fonts: GrueneType, PTSans
- Supports dark mode with automatic theme switching
- WebView URLs point to `beta.gruenerator.de` domain
- Custom scheme: `gruenerator://` for deep linking
- Video editor requires IMG.LY license and specific module configuration