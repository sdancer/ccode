# Reconstructed Auth Module

This directory contains TypeScript reconstructions of Claude Code's authentication system, reverse-engineered from the minified webpack bundle.

## Source Mapping

| Reconstructed File | Original Module | Original Functions |
|-------------------|-----------------|-------------------|
| `types.ts` | Multiple | Type definitions |
| `config.ts` | `JdA` | `w9()` → `getOAuthConfig()` |
| `pkce.ts` | `jB2` | `TB2()` → `generateCodeVerifier()`, `PB2()` → `generateCodeChallenge()`, `SB2()` → `generateState()` |
| `auth-code-listener.ts` | `jPA` | `WZ0` class → `AuthCodeListener` |
| `oauth-client.ts` | `eG1` | `oSA` class → `OAuthClient` |
| `token-store.ts` | `A2` | `a6` → `getStoredOAuthTokens()`, `wwA` → `getManagedApiKey()` |
| `helpers.ts` | `ACA` | `mN1()` → `buildAuthorizationUrl()`, `J4Q()` → `exchangeCodeForToken()`, `dN1()` → `refreshAccessToken()`, `dy()` → `getOrgUUID()` |
| `api-helpers.ts` | `HBA` | `FP()` → `getAccessTokenAndOrg()`, `PV()` → `getAuthHeaders()`, `CcB()` → `fetchCodeSessions()` |

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           OAuthClient                                    │
│                            (oSA)                                         │
│  - Orchestrates full OAuth flow                                          │
│  - Manages PKCE, state, and code exchange                               │
└───────────────────────────────────────┬─────────────────────────────────┘
                                        │
            ┌───────────────────────────┼───────────────────────────┐
            │                           │                           │
            ▼                           ▼                           ▼
┌───────────────────┐      ┌───────────────────┐      ┌───────────────────┐
│ AuthCodeListener  │      │     PKCE Utils    │      │   Token Store     │
│      (WZ0)        │      │      (jB2)        │      │      (A2)         │
│ - HTTP server     │      │ - Code verifier   │      │ - ~/.claude.json  │
│ - Callback handler│      │ - Code challenge  │      │ - macOS keychain  │
└───────────────────┘      │ - State generator │      │ - Env vars        │
                           └───────────────────┘      └───────────────────┘
                                        │
                                        ▼
                           ┌───────────────────────┐
                           │    OAuth Helpers      │
                           │        (ACA)          │
                           │ - Build auth URL      │
                           │ - Exchange code       │
                           │ - Refresh tokens      │
                           └───────────────────────┘
                                        │
                                        ▼
                           ┌───────────────────────┐
                           │    API Helpers        │
                           │        (HBA)          │
                           │ - Auth headers        │
                           │ - Session management  │
                           └───────────────────────┘
```

## OAuth Flow

1. **Start Flow**: `OAuthClient.startOAuthFlow()` called
2. **PKCE Setup**: Generate code verifier, compute SHA-256 challenge
3. **Server Start**: `AuthCodeListener` starts on random port
4. **Build URLs**: Create authorization URL with PKCE params
5. **Browser Open**: Open browser with auth URL
6. **Wait for Callback**: Listen for redirect with auth code
7. **Code Exchange**: POST to token endpoint with code + verifier
8. **Store Tokens**: Save to ~/.claude.json

## Token Storage Priority

When retrieving tokens (`getStoredOAuthTokens()`):

1. `CLAUDE_CODE_OAUTH_TOKEN` environment variable
2. Session token from external source
3. Stored tokens in `~/.claude.json`

## Key Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/v1/oauth/token` | Token exchange and refresh |
| `/api/oauth/account/settings` | Account settings |
| `/api/oauth/account/roles` | User roles |
| `/v1/sessions` | Code sessions |

## Notes

- All reconstructions are based on analysis of the minified bundle
- Some external dependencies (HTTP client, telemetry) are declared but not implemented
- The memoization pattern `Y0()` is used to cache expensive operations
- Error handling follows original patterns with telemetry events
