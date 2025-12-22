/**
 * Reconstructed from Claude Code bundle - OAuth Config
 *
 * Source module: JdA (lines 58773-58809)
 *
 * Original minified names:
 * - w9() -> getOAuthConfig()
 * - v2Q() -> getEnvironment()
 * - k2Q() -> getEnvSuffix()
 * - B5A -> INFERENCE_SCOPE
 * - S44 -> CREATE_API_KEY_SCOPE
 * - fp -> OAUTH_VERSION
 */

import type { OAuthConfig } from './types';

type Environment = 'local' | 'staging' | 'prod';

// OAuth scopes
export const INFERENCE_SCOPE = 'user:inference';
export const PROFILE_SCOPE = 'user:profile';
export const SESSIONS_SCOPE = 'user:sessions:claude_code';
export const CREATE_API_KEY_SCOPE = 'org:create_api_key';

// API beta flags - CRITICAL for authentication
export const OAUTH_BETA = 'oauth-2025-04-20';
export const CLAUDE_CODE_BETA = 'claude-code-20250219';  // Required for Sonnet/Opus
export const THINKING_BETA = 'interleaved-thinking-2025-05-14';

// Combined beta header for API requests
export const API_BETA_HEADER = `${CLAUDE_CODE_BETA},${OAUTH_BETA},${THINKING_BETA}`;

// System prompt required for API validation (Sonnet/Opus only)
export const CLAUDE_CODE_SYSTEM_PROMPT = 'You are Claude Code, Anthropic\'s official CLI for Claude.';

/**
 * Get current environment (always 'prod' in released builds)
 */
function getEnvironment(): Environment {
  return 'prod';
}

/**
 * Get environment suffix for OAuth redirect URIs
 */
export function getEnvSuffix(): string {
  switch (getEnvironment()) {
    case 'local':
      return '-local-oauth';
    case 'staging':
      return '-staging-oauth';
    case 'prod':
      return '';
  }
}

// Production config - verified via reverse engineering
const PROD_CONFIG: OAuthConfig = {
  BASE_API_URL: 'https://api.anthropic.com',
  TOKEN_URL: 'https://console.anthropic.com/v1/oauth/token',  // Note: console.anthropic.com, not api
  ROLES_URL: 'https://api.anthropic.com/api/oauth/account/roles',
  API_KEY_URL: 'https://api.anthropic.com/api/oauth/account/api_key',
  CLIENT_ID: '9d1c250a-e61b-44d9-88ed-5944d1962f5e',  // Actual UUID, not 'claude-code'
  CONSOLE_AUTHORIZE_URL: 'https://console.anthropic.com/oauth/authorize',
  CLAUDE_AI_AUTHORIZE_URL: 'https://claude.ai/oauth/authorize',
  MANUAL_REDIRECT_URL: 'https://console.anthropic.com/oauth/code/callback',  // Note: console, not claude.ai
  CONSOLE_SUCCESS_URL: 'https://console.anthropic.com/oauth/success',
  CLAUDEAI_SUCCESS_URL: 'https://claude.ai/oauth/success',
};

// Staging and local configs would differ but are not used in production
const STAGING_CONFIG: OAuthConfig | undefined = undefined;
const LOCAL_CONFIG: OAuthConfig | undefined = undefined;

/**
 * Get OAuth configuration for current environment
 *
 * Original minified: w9()
 */
export function getOAuthConfig(): OAuthConfig {
  switch (getEnvironment()) {
    case 'local':
      return LOCAL_CONFIG ?? PROD_CONFIG;
    case 'staging':
      return STAGING_CONFIG ?? PROD_CONFIG;
    case 'prod':
      return PROD_CONFIG;
  }
}

/**
 * Default scopes for full OAuth login
 * CRITICAL: user:sessions:claude_code is required for API access
 */
export const DEFAULT_SCOPES = [
  CREATE_API_KEY_SCOPE,
  PROFILE_SCOPE,
  INFERENCE_SCOPE,
  SESSIONS_SCOPE,
];
