/**
 * Reconstructed from Claude Code bundle - Token Storage
 *
 * Source module: A2 (lines 124735-124893)
 *
 * Original minified names:
 * - a6 -> getStoredOAuthTokens (memoized)
 * - wwA -> getManagedApiKey (memoized)
 * - gN1 -> getClaudeCodeToken (from env or other source)
 * - AN -> getConfigReader
 * - v1 -> getConfig
 * - n0 -> updateConfig
 *
 * Token retrieval priority:
 * 1. CLAUDE_CODE_OAUTH_TOKEN env var
 * 2. Session token from other sources
 * 3. Stored OAuth tokens from ~/.claude.json
 */

import type { OAuthTokens, OAuthAccount } from './types';
import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

// Config file paths
const CLAUDE_DIR = join(homedir(), '.claude');
const CONFIG_FILE = join(CLAUDE_DIR, 'claude.json');

// Keychain service name
const KEYCHAIN_SERVICE = 'claude-code';

interface ClaudeConfig {
  primaryApiKey?: string;
  claudeAiOauth?: OAuthTokens;
  oauthAccount?: OAuthAccount;
  installMethod?: string;
}

/**
 * Simple memoization helper
 *
 * Original minified: Y0 (appears to be a memoization utility)
 */
function memoize<T>(fn: () => T): () => T {
  let cached: T | undefined;
  let hasCached = false;

  return () => {
    if (!hasCached) {
      cached = fn();
      hasCached = true;
    }
    return cached as T;
  };
}

/**
 * Read config from ~/.claude.json
 */
function readConfig(): ClaudeConfig | null {
  try {
    if (!existsSync(CONFIG_FILE)) return null;
    const content = readFileSync(CONFIG_FILE, 'utf8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Write config to ~/.claude.json
 */
function writeConfig(config: ClaudeConfig): void {
  try {
    if (!existsSync(CLAUDE_DIR)) {
      mkdirSync(CLAUDE_DIR, { recursive: true });
    }
    writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write config:', err);
  }
}

/**
 * Get config with lazy initialization
 *
 * Original minified: v1()
 */
export function getConfig(): ClaudeConfig {
  return readConfig() ?? {};
}

/**
 * Update config with a function
 *
 * Original minified: n0()
 */
export function updateConfig(updater: (config: ClaudeConfig) => ClaudeConfig): void {
  const current = getConfig();
  const updated = updater(current);
  writeConfig(updated);
}

/**
 * Get Claude Code token from environment or other sources
 *
 * Original minified: gN1()
 */
function getClaudeCodeToken(): string | null {
  // Check for direct token env var
  return process.env.CLAUDE_CODE_SESSION_TOKEN ?? null;
}

/**
 * Get API key from macOS keychain or config
 *
 * Original minified: wwA (memoized)
 */
export const getManagedApiKey = memoize((): { key: string; source: string } | null => {
  // Try macOS keychain first
  if (process.platform === 'darwin') {
    const service = KEYCHAIN_SERVICE;
    try {
      const key = execSync(
        `security find-generic-password -a $USER -w -s "${service}"`,
        { encoding: 'utf8' }
      ).trim();
      if (key) {
        return { key, source: '/login managed key' };
      }
    } catch {
      // Keychain access failed, continue to config
    }
  }

  // Fall back to config file
  const config = getConfig();
  if (!config.primaryApiKey) return null;

  return { key: config.primaryApiKey, source: '/login managed key' };
});

/**
 * Get stored OAuth tokens
 *
 * Priority:
 * 1. CLAUDE_CODE_OAUTH_TOKEN env var (for CI/automation)
 * 2. Session token from external source
 * 3. Stored tokens from ~/.claude.json
 *
 * Original minified: a6 (memoized)
 */
export const getStoredOAuthTokens = memoize((): OAuthTokens | null => {
  // Priority 1: Environment variable
  if (process.env.CLAUDE_CODE_OAUTH_TOKEN) {
    return {
      accessToken: process.env.CLAUDE_CODE_OAUTH_TOKEN,
      refreshToken: null,
      expiresAt: null,
      scopes: ['user:inference'],
      subscriptionType: null,
      rateLimitTier: null,
    };
  }

  // Priority 2: Session token from external source
  const sessionToken = getClaudeCodeToken();
  if (sessionToken) {
    return {
      accessToken: sessionToken,
      refreshToken: null,
      expiresAt: null,
      scopes: ['user:inference'],
      subscriptionType: null,
      rateLimitTier: null,
    };
  }

  // Priority 3: Stored OAuth tokens
  try {
    const config = readConfig();
    const oauthData = config?.claudeAiOauth;
    if (!oauthData?.accessToken) return null;
    return oauthData;
  } catch (err) {
    // Log error
    return null;
  }
});

/**
 * Save OAuth tokens to config
 */
export function saveOAuthTokens(tokens: OAuthTokens): void {
  updateConfig((config) => ({
    ...config,
    claudeAiOauth: tokens,
  }));
}

/**
 * Clear stored OAuth tokens
 */
export function clearOAuthTokens(): void {
  updateConfig((config) => {
    const { claudeAiOauth, oauthAccount, ...rest } = config;
    return rest;
  });
}

/**
 * Config reader interface (matches original AN())
 */
export const configReader = {
  read: readConfig,
  write: writeConfig,
};
