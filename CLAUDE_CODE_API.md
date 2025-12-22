# Claude Code OAuth API Authentication

Reverse-engineered from Claude Code CLI v2.0.72.

## OAuth Flow

### Endpoints
- Authorization: `https://claude.ai/oauth/authorize`
- Token Exchange: `https://console.anthropic.com/v1/oauth/token`
- Callback: `https://console.anthropic.com/oauth/code/callback`

### Client ID
```
9d1c250a-e61b-44d9-88ed-5944d1962f5e
```

### Required Scopes
```
org:create_api_key user:profile user:inference user:sessions:claude_code
```

The `user:sessions:claude_code` scope is critical - without it, tokens cannot access the API.

### PKCE
Standard S256 code challenge method.

## API Requests

### Endpoint
```
POST https://api.anthropic.com/v1/messages?beta=true
```

### Required Headers
```http
accept: application/json
anthropic-beta: claude-code-20250219,oauth-2025-04-20,interleaved-thinking-2025-05-14
anthropic-dangerous-direct-browser-access: true
anthropic-version: 2023-06-01
authorization: Bearer <oauth_access_token>
content-type: application/json
user-agent: claude-cli/2.0.72 (external, cli)
x-app: cli
```

### Required Body Structure

The API validates that requests come from Claude Code by checking for a specific system prompt:

```json
{
  "model": "claude-opus-4-5-20251101",
  "max_tokens": 4096,
  "messages": [{
    "role": "user",
    "content": [{
      "type": "text",
      "text": "Your prompt here",
      "cache_control": { "type": "ephemeral" }
    }]
  }],
  "system": [{
    "type": "text",
    "text": "You are Claude Code, Anthropic's official CLI for Claude.",
    "cache_control": { "type": "ephemeral" }
  }]
}
```

### Key Requirements

| Requirement | Details |
|-------------|---------|
| URL query param | `?beta=true` |
| Beta header | Must include `claude-code-20250219` for Sonnet/Opus |
| System prompt | Must start with "You are Claude Code..." |
| Cache control | Messages need `cache_control: { type: "ephemeral" }` |

## Model Support

| Model | Model ID | Notes |
|-------|----------|-------|
| Haiku | `claude-haiku-4-5-20251001` | Works without system prompt |
| Sonnet | `claude-sonnet-4-20250514` | Requires system prompt |
| Opus | `claude-opus-4-5-20251101` | Requires system prompt |

### All Model Configurations

Source: `formatted.js` lines 124011-124067
Variables: `VwA`, `HwA`, `DwA`, `FwA`, `gAA`, `Ph1`, `EwA`, `zwA`, `uAA`
Accessor: `_aA()` at line 124093

| Alias | firstParty | Bedrock | Vertex | Foundry |
|-------|------------|---------|--------|---------|
| sonnet35 | `claude-3-5-sonnet-20241022` | `anthropic.claude-3-5-sonnet-20241022-v2:0` | `claude-3-5-sonnet-v2@20241022` | `claude-3-5-sonnet` |
| haiku35 | `claude-3-5-haiku-20241022` | `us.anthropic.claude-3-5-haiku-20241022-v1:0` | `claude-3-5-haiku@20241022` | `claude-3-5-haiku` |
| sonnet37 | `claude-3-7-sonnet-20250219` | `us.anthropic.claude-3-7-sonnet-20250219-v1:0` | `claude-3-7-sonnet@20250219` | `claude-3-7-sonnet` |
| haiku45 | `claude-haiku-4-5-20251001` | `us.anthropic.claude-haiku-4-5-20251001-v1:0` | `claude-haiku-4-5@20251001` | `claude-haiku-4-5` |
| sonnet40 | `claude-sonnet-4-20250514` | `us.anthropic.claude-sonnet-4-20250514-v1:0` | `claude-sonnet-4@20250514` | `claude-sonnet-4` |
| sonnet45 | `claude-sonnet-4-5-20250929` | `us.anthropic.claude-sonnet-4-5-20250929-v1:0` | `claude-sonnet-4-5@20250929` | `claude-sonnet-4-5` |
| opus40 | `claude-opus-4-20250514` | `us.anthropic.claude-opus-4-20250514-v1:0` | `claude-opus-4@20250514` | `claude-opus-4` |
| opus41 | `claude-opus-4-1-20250805` | `us.anthropic.claude-opus-4-1-20250805-v1:0` | `claude-opus-4-1@20250805` | `claude-opus-4-1` |
| opus45 | `claude-opus-4-5-20251101` | `us.anthropic.claude-opus-4-5-20251101-v1:0` | `claude-opus-4-5@20251101` | `claude-opus-4-5` |

## Token Structure

Access tokens: `sk-ant-oat01-...`
Refresh tokens: `sk-ant-ort01-...`

Tokens expire in 28800 seconds (8 hours).

## Error Messages

### Missing beta header
```json
{"type":"error","error":{"type":"authentication_error","message":"OAuth authentication is currently not supported."}}
```

### Missing system prompt or wrong scopes
```json
{"type":"error","error":{"type":"invalid_request_error","message":"This credential is only authorized for use with Claude Code and cannot be used for other API requests."}}
```

## Scripts

- `scripts/oauth_login_simple.js` - OAuth login flow
- `scripts/query_claude.js` - Query any model with OAuth token
- `scripts/warmup_haiku.js` - Minimal warmup request
- `scripts/fetch_logger_patch.js` - Patch to intercept fetch calls

## Usage

```bash
# Login (generates .claude_tokens.json)
node scripts/oauth_login_simple.js

# Query models
node scripts/query_claude.js "Hello"
node scripts/query_claude.js --model haiku "Hello"
node scripts/query_claude.js --model opus "Hello"
```
