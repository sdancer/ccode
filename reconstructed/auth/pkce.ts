/**
 * Reconstructed from Claude Code bundle - PKCE Helpers
 *
 * Source module: jB2 (lines ~37-48)
 *
 * Original minified names:
 * - KZ0() -> base64UrlEncode()
 * - TB2() -> generateCodeVerifier()
 * - PB2() -> generateCodeChallenge()
 * - SB2() -> generateState()
 */

import * as crypto from 'crypto';

/**
 * Base64 URL encode (no padding)
 *
 * Original minified: KZ0()
 */
function base64UrlEncode(buffer: Buffer): string {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Generate a random PKCE code verifier
 *
 * Original minified: TB2()
 */
export function generateCodeVerifier(): string {
  return base64UrlEncode(crypto.randomBytes(32));
}

/**
 * Generate code challenge from verifier using SHA-256
 *
 * Original minified: PB2()
 */
export function generateCodeChallenge(verifier: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(verifier);
  return base64UrlEncode(hash.digest());
}

/**
 * Generate random state parameter
 *
 * Original minified: SB2()
 */
export function generateState(): string {
  return base64UrlEncode(crypto.randomBytes(32));
}
