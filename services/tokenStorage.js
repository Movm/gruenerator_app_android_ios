import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'gruenerator_tokens';
const REFRESH_TOKEN_KEY = 'gruenerator_refresh_token';
const USER_DATA_KEY = 'gruenerator_user_data';

export class TokenStorage {
  static async storeTokens(tokens) {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify({
        access_token: tokens.access_token,
        expires_at: Date.now() + (tokens.expires_in * 1000),
        token_type: tokens.token_type
      }));
      
      if (tokens.refresh_token) {
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refresh_token);
      }
      
      console.log('[TokenStorage] Tokens stored securely');
    } catch (error) {
      console.error('[TokenStorage] Error storing tokens:', error);
      throw error;
    }
  }

  static async getTokens() {
    try {
      const tokensString = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!tokensString) return null;
      
      const tokens = JSON.parse(tokensString);
      
      // Check if token is expired
      if (tokens.expires_at && tokens.expires_at < Date.now()) {
        console.log('[TokenStorage] Access token expired');
        return null;
      }
      
      return tokens;
    } catch (error) {
      console.error('[TokenStorage] Error retrieving tokens:', error);
      return null;
    }
  }

  static async getRefreshToken() {
    try {
      return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('[TokenStorage] Error retrieving refresh token:', error);
      return null;
    }
  }

  static async clearTokens() {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      await AsyncStorage.removeItem(USER_DATA_KEY);
      console.log('[TokenStorage] All tokens cleared');
    } catch (error) {
      console.error('[TokenStorage] Error clearing tokens:', error);
    }
  }

  static async storeUserData(userData) {
    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('[TokenStorage] Error storing user data:', error);
    }
  }

  static async getUserData() {
    try {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('[TokenStorage] Error retrieving user data:', error);
      return null;
    }
  }
}