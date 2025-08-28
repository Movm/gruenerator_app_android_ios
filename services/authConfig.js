export const AUTH_CONFIG = {
  // Keycloak configuration
  keycloakBaseUrl: 'https://auth.services.moritz-waechter.de',
  realm: 'Gruenerator',
  clientId: 'gruenerator-mobile',
  
  // Backend configuration
  backendUrl: 'https://beta.gruenerator.de/api',
  
  // Provider configurations
  providers: {
    gruenerator: {
      name: 'Grünerator Account',
      description: 'Login with your Grünerator account',
      color: '#008939',
      additionalParameters: {},
      icon: 'account'
    },
    netzbegruenung: {
      name: 'Netzbegrünung',
      description: 'Login with Netzbegrünung',
      color: '#009639',
      additionalParameters: { kc_idp_hint: 'netzbegruenung' },
      icon: 'web'
    },
    'gruenes-netz': {
      name: 'Grünes Netz',
      description: 'Login with Grünes Netz',
      color: '#00A651',
      additionalParameters: { kc_idp_hint: 'gruenes-netz' },
      icon: 'network'
    }
  }
};

// Discovery document
export const getDiscoveryDocument = () => ({
  authorizationEndpoint: `${AUTH_CONFIG.keycloakBaseUrl}/realms/${AUTH_CONFIG.realm}/protocol/openid-connect/auth`,
  tokenEndpoint: `${AUTH_CONFIG.keycloakBaseUrl}/realms/${AUTH_CONFIG.realm}/protocol/openid-connect/token`,
  userInfoEndpoint: `${AUTH_CONFIG.keycloakBaseUrl}/realms/${AUTH_CONFIG.realm}/protocol/openid-connect/userinfo`,
  issuer: `${AUTH_CONFIG.keycloakBaseUrl}/realms/${AUTH_CONFIG.realm}`,
  jwksUri: `${AUTH_CONFIG.keycloakBaseUrl}/realms/${AUTH_CONFIG.realm}/protocol/openid-connect/certs`,
  endSessionEndpoint: `${AUTH_CONFIG.keycloakBaseUrl}/realms/${AUTH_CONFIG.realm}/protocol/openid-connect/logout`,
});