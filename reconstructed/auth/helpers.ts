/**
 * Reconstructed from Claude Code bundle - Auth Helpers
 *
 * Source module: ACA (lines 63737-63977)
 *
 * Original minified names:
 * - Yh() -> hasInferenceScope()
 * - SdA() -> parseScopes()
 * - mN1() -> buildAuthorizationUrl()
 * - J4Q() -> exchangeCodeForToken()
 * - dN1() -> refreshAccessToken()
 * - cN1() -> fetchUserProfile()
 * - dy() -> getOrgUUID()
 * - pp() -> isTokenExpiringSoon()
 * - pN1() -> saveOAuthAccount()
 */

import type {
  OAuthTokens,
  TokenExchangeResponse,
  UserProfile,
  AuthorizationUrlParams,
  OAuthAccount,
  SubscriptionType,
} from './types';
import { getOAuthConfig, INFERENCE_SCOPE, DEFAULT_SCOPES } from './config';

// Assuming axios-like HTTP client
interface HttpClient {
  post(url: string, data: any, config?: any): Promise<{ status: number; statusText: string; data: any }>;
  get(url: string, config?: any): Promise<{ status: number; statusText: string; data: any }>;
}

// These would be injected or imported from other modules
declare const httpClient: HttpClient;
declare function getStoredConfig(): { oauthAccount?: OAuthAccount };
declare function updateConfig(updater: (config: any) => any): void;
declare function fetchOrganizationProfile(accessToken: string): Promise<any>;

/**
 * Check if scopes include inference permission
 *
 * Original minified: Yh()
 */
export function hasInferenceScope(scopes: string[] | undefined): boolean {
  return Boolean(scopes?.includes(INFERENCE_SCOPE));
}

/**
 * Parse space-separated scope string into array
 *
 * Original minified: SdA()
 */
export function parseScopes(scopeString: string | undefined): string[] {
  return scopeString?.split(' ').filter(Boolean) ?? [];
}

/**
 * Build the OAuth authorization URL
 *
 * Original minified: mN1()
 */
export function buildAuthorizationUrl(params: AuthorizationUrlParams): string {
  const config = getOAuthConfig();

  const authorizeUrl = params.loginWithClaudeAi
    ? config.CLAUDE_AI_AUTHORIZE_URL
    : config.CONSOLE_AUTHORIZE_URL;

  const url = new URL(authorizeUrl);

  // Add required parameters
  url.searchParams.append('code', 'true');
  url.searchParams.append('client_id', config.CLIENT_ID);
  url.searchParams.append('response_type', 'code');
  url.searchParams.append(
    'redirect_uri',
    params.isManual ? config.MANUAL_REDIRECT_URL : `http://localhost:${params.port}/callback`
  );

  // Add scopes
  const scopes = params.inferenceOnly ? [INFERENCE_SCOPE] : DEFAULT_SCOPES;
  url.searchParams.append('scope', scopes.join(' '));

  // Add PKCE parameters
  url.searchParams.append('code_challenge', params.codeChallenge);
  url.searchParams.append('code_challenge_method', 'S256');
  url.searchParams.append('state', params.state);

  // Add optional org UUID
  if (params.orgUUID) {
    url.searchParams.append('orgUUID', params.orgUUID);
  }

  return url.toString();
}

/**
 * Exchange authorization code for access token
 *
 * Original minified: J4Q()
 */
export async function exchangeCodeForToken(
  authCode: string,
  state: string,
  codeVerifier: string,
  port: number,
  isManual: boolean = false,
  expiresIn?: number
): Promise<TokenExchangeResponse> {
  const config = getOAuthConfig();

  const payload: Record<string, any> = {
    grant_type: 'authorization_code',
    code: authCode,
    redirect_uri: isManual
      ? config.MANUAL_REDIRECT_URL
      : `http://localhost:${port}/callback`,
    client_id: config.CLIENT_ID,
    code_verifier: codeVerifier,
    state: state,
  };

  if (expiresIn !== undefined) {
    payload.expires_in = expiresIn;
  }

  const response = await httpClient.post(config.TOKEN_URL, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    throw new Error(
      response.status === 401
        ? 'Authentication failed: Invalid authorization code'
        : `Token exchange failed (${response.status}): ${response.statusText}`
    );
  }

  // telemetry: tengu_oauth_token_exchange_success
  return response.data;
}

/**
 * Refresh an access token using refresh token
 *
 * Original minified: dN1()
 */
export async function refreshAccessToken(refreshToken: string): Promise<OAuthTokens> {
  const config = getOAuthConfig();

  const payload = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: config.CLIENT_ID,
    scope: DEFAULT_SCOPES.join(' '),
  };

  try {
    const response = await httpClient.post(config.TOKEN_URL, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      throw new Error(`Token refresh failed: ${response.statusText}`);
    }

    const data = response.data;
    const {
      access_token: accessToken,
      refresh_token: newRefreshToken = refreshToken,
      expires_in: expiresIn,
    } = data;

    const expiresAt = Date.now() + expiresIn * 1000;
    const scopes = parseScopes(data.scope);

    // telemetry: tengu_oauth_token_refresh_success

    const profile = await fetchUserProfile(accessToken);

    // Update stored account info if changed
    const storedConfig = getStoredConfig();
    if (storedConfig.oauthAccount) {
      const updates: Partial<OAuthAccount> = {};
      if (profile.displayName !== undefined) {
        updates.displayName = profile.displayName;
      }
      if (typeof profile.hasExtraUsageEnabled === 'boolean') {
        updates.hasExtraUsageEnabled = profile.hasExtraUsageEnabled;
      }
      if (Object.keys(updates).length > 0) {
        updateConfig((config) => ({
          ...config,
          oauthAccount: config.oauthAccount
            ? { ...config.oauthAccount, ...updates }
            : config.oauthAccount,
        }));
      }
    }

    return {
      accessToken,
      refreshToken: newRefreshToken,
      expiresAt,
      scopes,
      subscriptionType: profile.subscriptionType,
      rateLimitTier: profile.rateLimitTier,
    };
  } catch (err) {
    const error = err as Error;
    // telemetry: tengu_oauth_token_refresh_failure
    throw error;
  }
}

/**
 * Fetch user profile from API
 *
 * Original minified: cN1()
 */
export async function fetchUserProfile(accessToken: string): Promise<UserProfile> {
  const profileData = await fetchOrganizationProfile(accessToken);

  const orgType = profileData?.organization?.organization_type;
  let subscriptionType: SubscriptionType = null;

  switch (orgType) {
    case 'claude_max':
      subscriptionType = 'max';
      break;
    case 'claude_pro':
      subscriptionType = 'pro';
      break;
    case 'claude_enterprise':
      subscriptionType = 'enterprise';
      break;
    case 'claude_team':
      subscriptionType = 'team';
      break;
  }

  const result: UserProfile = {
    subscriptionType,
    rateLimitTier: profileData?.organization?.rate_limit_tier ?? null,
    hasExtraUsageEnabled: profileData?.organization?.has_extra_usage_enabled ?? null,
  };

  if (profileData?.account?.display_name) {
    result.displayName = profileData.account.display_name;
  }

  // telemetry: tengu_oauth_profile_fetch_success
  return result;
}

/**
 * Get organization UUID from stored config or API
 *
 * Original minified: dy()
 */
export async function getOrgUUID(): Promise<string | null> {
  // Check stored config first
  const storedConfig = getStoredConfig();
  const storedOrgUUID = storedConfig.oauthAccount?.organizationUuid;
  if (storedOrgUUID) return storedOrgUUID;

  // Fall back to fetching from API
  const tokens = getStoredTokens();
  if (!tokens?.accessToken) return null;

  const profileData = await fetchOrganizationProfile(tokens.accessToken);
  return profileData?.organization?.uuid ?? null;
}

/**
 * Check if token is expiring soon (within 5 minutes)
 *
 * Original minified: pp()
 */
export function isTokenExpiringSoon(expiresAt: number | null): boolean {
  if (expiresAt === null) return false;
  const bufferMs = 300000; // 5 minutes
  return Date.now() + bufferMs >= expiresAt;
}

/**
 * Save OAuth account information to config
 *
 * Original minified: pN1()
 */
export function saveOAuthAccount(account: {
  accountUuid: string;
  emailAddress: string;
  organizationUuid?: string;
  displayName?: string;
  hasExtraUsageEnabled?: boolean;
}): void {
  const oauthAccount: OAuthAccount = {
    accountUuid: account.accountUuid,
    emailAddress: account.emailAddress,
    organizationUuid: account.organizationUuid,
    hasExtraUsageEnabled: account.hasExtraUsageEnabled,
  };

  if (account.displayName) {
    oauthAccount.displayName = account.displayName;
  }

  updateConfig((config) => {
    // Skip update if nothing changed
    if (
      config.oauthAccount?.accountUuid === oauthAccount.accountUuid &&
      config.oauthAccount?.emailAddress === oauthAccount.emailAddress &&
      config.oauthAccount?.organizationUuid === oauthAccount.organizationUuid &&
      config.oauthAccount?.displayName === oauthAccount.displayName &&
      config.oauthAccount?.hasExtraUsageEnabled === oauthAccount.hasExtraUsageEnabled
    ) {
      return config;
    }
    return { ...config, oauthAccount };
  });
}

// Placeholder for getting stored tokens
declare function getStoredTokens(): OAuthTokens | null;
