import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import { AUTH_CONFIG, getDiscoveryDocument } from './authConfig';
import { TokenStorage } from './tokenStorage';

export class AuthService {
  static discoveryDocument = getDiscoveryDocument();

  static async loginWithProvider(provider) {
    try {
      const providerConfig = AUTH_CONFIG.providers[provider];
      if (!providerConfig) {
        throw new Error(`Unknown provider: ${provider}`);
      }

      console.log(`[AuthService] Starting login with ${provider}`);

      // Generate PKCE challenge
      const codeVerifier = AuthSession.AuthRequest.createRandomCodeChallenge();
      const codeChallenge = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        codeVerifier,
        { encoding: Crypto.CryptoEncoding.BASE64URL }
      );

      // Create auth request
      const request = new AuthSession.AuthRequest({
        clientId: AUTH_CONFIG.clientId,
        scopes: ['openid', 'profile', 'email'],
        responseType: AuthSession.ResponseType.Code,
        redirectUri: AuthSession.makeRedirectUri({ useProxy: false }),
        codeChallenge,
        codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
        additionalParameters: {
          ...providerConfig.additionalParameters,
          prompt: 'login' // Force fresh authentication
        },
        state: provider, // Remember which provider was used
      });

      // Perform authentication
      const result = await request.promptAsync(this.discoveryDocument);
      
      if (result.type === 'success') {
        console.log(`[AuthService] Auth successful for ${provider}`);
        
        // Exchange code for tokens
        const tokens = await this.exchangeCodeForTokens(
          result.params.code,
          request.redirectUri,
          codeVerifier
        );
        
        // Store tokens securely
        await TokenStorage.storeTokens(tokens);
        
        // Get user profile
        const user = await this.getCurrentUser();
        
        return {
          success: true,
          user,
          tokens,
          provider
        };
      } else {
        console.log(`[AuthService] Auth cancelled or failed for ${provider}:`, result);
        return {
          success: false,
          error: result.type === 'cancel' ? 'User cancelled' : 'Authentication failed'
        };
      }
    } catch (error) {
      console.error(`[AuthService] Login error for ${provider}:`, error);
      return {
        success: false,
        error: error.message || 'Login failed'
      };
    }
  }

  static async exchangeCodeForTokens(code, redirectUri, codeVerifier) {
    try {
      const tokenResponse = await fetch(this.discoveryDocument.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: AUTH_CONFIG.clientId,
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.text();
        console.error('[AuthService] Token exchange error:', errorData);
        throw new Error('Token exchange failed');
      }

      const tokens = await tokenResponse.json();
      console.log('[AuthService] Tokens received successfully');
      return tokens;
    } catch (error) {
      console.error('[AuthService] Token exchange error:', error);
      throw error;
    }
  }

  static async getCurrentUser() {
    try {
      console.log('[DEBUG] AuthService - Getting current user');
      
      console.log('[DEBUG] AuthService - Getting tokens for user request');
      const tokens = await TokenStorage.getTokens();
      if (!tokens) {
        console.log('[DEBUG] AuthService - No tokens for user request');
        throw new Error('No valid tokens found');
      }

      const url = `${AUTH_CONFIG.backendUrl}/auth/mobile/status`;
      console.log('[DEBUG] AuthService - Fetching user from:', url);
      console.log('[DEBUG] AuthService - Using token:', tokens.access_token ? 'TOKEN_EXISTS' : 'NO_TOKEN');
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('[DEBUG] AuthService - User fetch response status:', response.status);
      console.log('[DEBUG] AuthService - User fetch response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[AuthService] User fetch failed with status:', response.status, 'body:', errorText);
        throw new Error(`Failed to fetch user data: ${response.status} ${errorText}`);
      }

      console.log('[DEBUG] AuthService - Parsing user response JSON');
      const data = await response.json();
      console.log('[DEBUG] AuthService - User response data:', { 
        isAuthenticated: data.isAuthenticated, 
        hasUser: !!data.user 
      });
      
      if (data.isAuthenticated && data.user) {
        console.log('[DEBUG] AuthService - Storing user data');
        await TokenStorage.storeUserData(data.user);
        console.log('[DEBUG] AuthService - User data stored successfully');
        return data.user;
      } else {
        console.log('[DEBUG] AuthService - User not authenticated in response');
        throw new Error('User not authenticated');
      }
    } catch (error) {
      console.error('[AuthService] Get user error:', error);
      console.error('[AuthService] Get user error details:', error.message, error.stack);
      throw error;
    }
  }

  static async refreshTokens() {
    try {
      const refreshToken = await TokenStorage.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${AUTH_CONFIG.backendUrl}/auth/mobile/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken
        }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const tokens = await response.json();
      await TokenStorage.storeTokens(tokens);
      
      console.log('[AuthService] Tokens refreshed successfully');
      return tokens;
    } catch (error) {
      console.error('[AuthService] Token refresh error:', error);
      throw error;
    }
  }

  static async logout() {
    try {
      const refreshToken = await TokenStorage.getRefreshToken();
      const tokens = await TokenStorage.getTokens();
      
      if (tokens) {
        // Notify backend of logout
        await fetch(`${AUTH_CONFIG.backendUrl}/auth/mobile/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh_token: refreshToken
          }),
        });
      }
    } catch (error) {
      console.error('[AuthService] Logout error:', error);
    } finally {
      // Always clear local tokens
      await TokenStorage.clearTokens();
      console.log('[AuthService] Logout completed');
    }
  }

  static async checkAuthStatus() {
    try {
      console.log('[DEBUG] AuthService - Starting checkAuthStatus');
      
      console.log('[DEBUG] AuthService - Getting tokens from storage');
      const tokens = await TokenStorage.getTokens();
      console.log('[DEBUG] AuthService - Tokens result:', tokens ? 'TOKENS_EXIST' : 'NO_TOKENS');
      
      if (!tokens) {
        console.log('[DEBUG] AuthService - No tokens found, returning unauthenticated');
        return { isAuthenticated: false, user: null };
      }

      console.log('[DEBUG] AuthService - Attempting to get current user');
      const user = await this.getCurrentUser();
      console.log('[DEBUG] AuthService - Successfully got user, returning authenticated');
      return { isAuthenticated: true, user };
    } catch (error) {
      console.error('[AuthService] Auth check error:', error);
      console.error('[AuthService] Error details:', error.message, error.stack);
      
      console.log('[DEBUG] AuthService - Auth check failed, attempting token refresh');
      try {
        console.log('[DEBUG] AuthService - Refreshing tokens');
        await this.refreshTokens();
        
        console.log('[DEBUG] AuthService - Getting user after token refresh');
        const user = await this.getCurrentUser();
        console.log('[DEBUG] AuthService - Token refresh successful, returning authenticated');
        return { isAuthenticated: true, user };
      } catch (refreshError) {
        console.error('[AuthService] Token refresh failed:', refreshError);
        console.error('[AuthService] Refresh error details:', refreshError.message, refreshError.stack);
        
        console.log('[DEBUG] AuthService - Clearing tokens due to refresh failure');
        await TokenStorage.clearTokens();
        console.log('[DEBUG] AuthService - Returning unauthenticated after refresh failure');
        return { isAuthenticated: false, user: null };
      }
    }
  }
}