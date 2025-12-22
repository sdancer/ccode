/**
 * Reconstructed from Claude Code bundle - OAuth Client
 *
 * Source module: eG1 (lines 365507-365633)
 *
 * Original minified class: oSA
 *
 * This is the main OAuth client that orchestrates the entire OAuth flow:
 * 1. Generate PKCE code verifier/challenge
 * 2. Start local callback server
 * 3. Build authorization URL
 * 4. Open browser for user login
 * 5. Wait for callback with auth code
 * 6. Exchange code for tokens
 */

import type { OAuthTokens, OAuthFlowOptions } from './types';
import { AuthCodeListener } from './auth-code-listener';
import { generateCodeVerifier, generateCodeChallenge, generateState } from './pkce';
import {
  buildAuthorizationUrl,
  exchangeCodeForToken,
  fetchUserProfile,
  parseScopes,
  saveOAuthAccount,
} from './helpers';

// External dependencies that would be imported
declare function openBrowser(url: string): Promise<void>;
declare function clearStoredAuth(options: { clearOnboarding: boolean }): Promise<void>;

/**
 * OAuth client for Claude Code authentication
 *
 * Original minified: oSA
 */
export class OAuthClient {
  private codeVerifier: string;
  private authCodeListener: AuthCodeListener | null = null;
  private port: number | null = null;
  private manualAuthCodeResolver: ((code: string) => void) | null = null;

  constructor() {
    this.codeVerifier = generateCodeVerifier();
  }

  /**
   * Start the OAuth flow
   *
   * @param onUrlReady - Callback when the auth URL is ready (for display to user)
   * @param options - OAuth flow options
   * @returns Promise resolving to OAuth tokens
   */
  async startOAuthFlow(
    onUrlReady: (url: string) => Promise<void>,
    options?: OAuthFlowOptions
  ): Promise<OAuthTokens> {
    // Create and start the callback listener
    this.authCodeListener = new AuthCodeListener();
    this.port = await this.authCodeListener.start();

    // Generate PKCE challenge and state
    const codeChallenge = generateCodeChallenge(this.codeVerifier);
    const state = generateState();

    // Build authorization URLs (manual and automatic)
    const urlParams = {
      codeChallenge,
      state,
      port: this.port,
      loginWithClaudeAi: options?.loginWithClaudeAi,
      inferenceOnly: options?.inferenceOnly,
      orgUUID: options?.orgUUID,
    };

    const manualUrl = buildAuthorizationUrl({ ...urlParams, isManual: true });
    const automaticUrl = buildAuthorizationUrl({ ...urlParams, isManual: false });

    // Wait for authorization code
    const authCode = await this.waitForAuthorizationCode(state, async () => {
      // Notify caller of manual URL, then open browser with automatic URL
      await onUrlReady(manualUrl);
      await openBrowser(automaticUrl);
    });

    const wasAutomatic = this.authCodeListener?.hasPendingResponse() ?? false;
    // telemetry: tengu_oauth_auth_code_received { automatic: wasAutomatic }

    try {
      // Exchange code for tokens
      const tokenResponse = await exchangeCodeForToken(
        authCode,
        state,
        this.codeVerifier,
        this.port,
        !wasAutomatic,  // isManual
        options?.expiresIn
      );

      // Clear any existing auth state
      await clearStoredAuth({ clearOnboarding: false });

      // Fetch user profile
      const profile = await fetchUserProfile(tokenResponse.access_token);

      // Save account info if available
      if (tokenResponse.account) {
        saveOAuthAccount({
          accountUuid: tokenResponse.account.uuid,
          emailAddress: tokenResponse.account.email_address,
          organizationUuid: tokenResponse.organization?.uuid,
          displayName: profile.displayName,
          hasExtraUsageEnabled: profile.hasExtraUsageEnabled ?? undefined,
        });
      }

      // Handle automatic redirect
      if (wasAutomatic) {
        const scopes = parseScopes(tokenResponse.scope);
        this.authCodeListener?.handleSuccessRedirect(scopes);
      }

      return this.formatTokens(tokenResponse, profile.subscriptionType, profile.rateLimitTier);
    } catch (err) {
      // Handle error redirect if automatic flow
      if (wasAutomatic) {
        this.authCodeListener?.handleErrorRedirect();
      }
      throw err;
    } finally {
      this.authCodeListener?.close();
    }
  }

  /**
   * Wait for authorization code from callback or manual entry
   */
  private async waitForAuthorizationCode(
    expectedState: string,
    onReady: () => Promise<void>
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      // Store resolver for manual entry
      this.manualAuthCodeResolver = resolve;

      // Wait for automatic callback
      this.authCodeListener
        ?.waitForAuthorization(expectedState, onReady)
        .then((code) => {
          this.manualAuthCodeResolver = null;
          resolve(code);
        })
        .catch((err) => {
          this.manualAuthCodeResolver = null;
          reject(err);
        });
    });
  }

  /**
   * Handle manual auth code input (when browser redirect doesn't work)
   *
   * The user copies a code from the browser and pastes it into the CLI.
   * The code format is: authCode#state
   */
  handleManualAuthCodeInput(input: { authorizationCode: string; state: string }): void {
    if (this.manualAuthCodeResolver) {
      this.manualAuthCodeResolver(input.authorizationCode);
      this.manualAuthCodeResolver = null;
      this.authCodeListener?.close();
    }
  }

  /**
   * Format token response into OAuthTokens structure
   */
  private formatTokens(
    response: {
      access_token: string;
      refresh_token?: string;
      expires_in: number;
      scope: string;
    },
    subscriptionType: OAuthTokens['subscriptionType'],
    rateLimitTier: OAuthTokens['rateLimitTier']
  ): OAuthTokens {
    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token ?? null,
      expiresAt: Date.now() + response.expires_in * 1000,
      scopes: parseScopes(response.scope),
      subscriptionType,
      rateLimitTier,
    };
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    this.authCodeListener?.close();
    this.manualAuthCodeResolver = null;
  }
}
