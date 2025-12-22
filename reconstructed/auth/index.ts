/**
 * Reconstructed Claude Code Authentication Module
 *
 * This module provides OAuth authentication for Claude Code CLI.
 *
 * Original minified modules:
 * - A2 (token storage)
 * - ACA (OAuth helpers)
 * - eG1 (OAuth client)
 * - HBA (API helpers)
 * - JdA (config)
 * - jB2 (PKCE)
 * - jPA (auth code listener)
 *
 * Key features:
 * - PKCE-based OAuth 2.0 flow
 * - Local HTTP callback server for automatic redirect
 * - Manual code entry fallback
 * - Token refresh
 * - Secure token storage (macOS keychain, ~/.claude.json)
 */

// Types and Model Configs
export * from './types';
export { MODEL_CONFIGS } from './types';

// Configuration
export {
  getOAuthConfig,
  getEnvSuffix,
  INFERENCE_SCOPE,
  PROFILE_SCOPE,
  SESSIONS_SCOPE,
  CREATE_API_KEY_SCOPE,
  OAUTH_BETA,
  CLAUDE_CODE_BETA,
  THINKING_BETA,
  API_BETA_HEADER,
  CLAUDE_CODE_SYSTEM_PROMPT,
  DEFAULT_SCOPES,
} from './config';

// PKCE utilities
export {
  generateCodeVerifier,
  generateCodeChallenge,
  generateState,
} from './pkce';

// Auth code listener
export { AuthCodeListener } from './auth-code-listener';

// OAuth client
export { OAuthClient } from './oauth-client';

// Token storage
export {
  getStoredOAuthTokens,
  getManagedApiKey,
  saveOAuthTokens,
  clearOAuthTokens,
  getConfig,
  updateConfig,
  configReader,
} from './token-store';

// OAuth helpers
export {
  hasInferenceScope,
  parseScopes,
  buildAuthorizationUrl,
  exchangeCodeForToken,
  refreshAccessToken,
  fetchUserProfile,
  getOrgUUID,
  isTokenExpiringSoon,
  saveOAuthAccount,
} from './helpers';

// API helpers
export {
  getAccessTokenAndOrg,
  getAuthHeaders,
  buildMessageBody,
  getMessagesEndpoint,
  fetchCodeSessions,
  fetchSessionById,
  getSessionBranch,
  sendSessionEvent,
  type CodeSession,
  type SessionStatus,
} from './api-helpers';
