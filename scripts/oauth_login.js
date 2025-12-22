#!/usr/bin/env node
/**
 * Claude Code OAuth Login Script
 *
 * This script demonstrates the OAuth login flow used by Claude Code.
 * It can be used to obtain an access token for API access.
 *
 * Usage:
 *   node oauth_login.js [--claude-ai] [--inference-only]
 *
 * Options:
 *   --claude-ai      Use claude.ai for login (default: console.anthropic.com)
 *   --inference-only Only request user:inference scope (for long-lived tokens)
 */

const crypto = require('crypto');
const http = require('http');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// OAuth Configuration (extracted from Claude Code bundle - module BJ.js)
const CONFIG = {
  CLIENT_ID: '9d1c250a-e61b-44d9-88ed-5944d1962f5e',
  CONSOLE_AUTHORIZE_URL: 'https://console.anthropic.com/oauth/authorize',
  CLAUDE_AI_AUTHORIZE_URL: 'https://claude.ai/oauth/authorize',
  TOKEN_URL: 'https://console.anthropic.com/v1/oauth/token',
  MANUAL_REDIRECT_URL: 'https://console.anthropic.com/oauth/code/callback',
  CONSOLE_SUCCESS_URL: 'https://console.anthropic.com/buy_credits?returnUrl=/oauth/code/success%3Fapp%3Dclaude-code',
  CLAUDEAI_SUCCESS_URL: 'https://console.anthropic.com/oauth/code/success?app=claude-code',
  INFERENCE_SCOPE: 'user:inference',
  CREATE_API_KEY_SCOPE: 'org:create_api_key',
};

// PKCE Helpers
function base64UrlEncode(buffer) {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function generateCodeVerifier() {
  return base64UrlEncode(crypto.randomBytes(32));
}

function generateCodeChallenge(verifier) {
  const hash = crypto.createHash('sha256');
  hash.update(verifier);
  return base64UrlEncode(hash.digest());
}

function generateState() {
  return base64UrlEncode(crypto.randomBytes(32));
}

// Build authorization URL
function buildAuthorizationUrl({
  codeChallenge,
  state,
  port,
  isManual,
  useClaudeAi,
  inferenceOnly
}) {
  const baseUrl = useClaudeAi
    ? CONFIG.CLAUDE_AI_AUTHORIZE_URL
    : CONFIG.CONSOLE_AUTHORIZE_URL;

  const url = new URL(baseUrl);

  url.searchParams.append('code', 'true');
  url.searchParams.append('client_id', CONFIG.CLIENT_ID);
  url.searchParams.append('response_type', 'code');
  url.searchParams.append(
    'redirect_uri',
    isManual ? CONFIG.MANUAL_REDIRECT_URL : `http://localhost:${port}/callback`
  );

  const scopes = inferenceOnly
    ? [CONFIG.INFERENCE_SCOPE]
    : [CONFIG.INFERENCE_SCOPE, CONFIG.CREATE_API_KEY_SCOPE];
  url.searchParams.append('scope', scopes.join(' '));

  url.searchParams.append('code_challenge', codeChallenge);
  url.searchParams.append('code_challenge_method', 'S256');
  url.searchParams.append('state', state);

  return url.toString();
}

// Exchange authorization code for tokens
async function exchangeCodeForToken(code, state, codeVerifier, port, isManual, expiresIn) {
  const payload = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: isManual
      ? CONFIG.MANUAL_REDIRECT_URL
      : `http://localhost:${port}/callback`,
    client_id: CONFIG.CLIENT_ID,
    code_verifier: codeVerifier,
    state,
  };

  if (expiresIn) {
    payload.expires_in = expiresIn;
  }

  const response = await fetch(CONFIG.TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Token exchange failed (${response.status}): ${text}`);
  }

  return response.json();
}

// Open URL in browser
function openBrowser(url) {
  const platform = process.platform;
  let cmd;

  if (platform === 'darwin') {
    cmd = `open "${url}"`;
  } else if (platform === 'win32') {
    cmd = `start "" "${url}"`;
  } else {
    cmd = `xdg-open "${url}"`;
  }

  try {
    execSync(cmd, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Create callback server
function createCallbackServer(expectedState) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://${req.headers.host}`);

      if (url.pathname !== '/callback') {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');

      if (!code) {
        res.writeHead(400);
        res.end('No authorization code received');
        reject(new Error('No authorization code received'));
        server.close();
        return;
      }

      if (state !== expectedState) {
        res.writeHead(400);
        res.end('Invalid state parameter');
        reject(new Error('Invalid state parameter'));
        server.close();
        return;
      }

      // Send success response with redirect
      res.writeHead(302, {
        Location: CONFIG.CLAUDEAI_SUCCESS_URL
      });
      res.end();

      resolve({ code, isAutomatic: true });
      server.close();
    });

    server.listen(0, 'localhost', () => {
      const { port } = server.address();
      resolve({ server, port });
    });

    server.on('error', reject);
  });
}

// Read manual code input
async function readManualCode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('\nPaste code here (format: code#state): ', (answer) => {
      rl.close();
      const [code, state] = answer.trim().split('#');
      resolve({ code, state });
    });
  });
}

// Main login flow
async function login(options = {}) {
  const { useClaudeAi = true, inferenceOnly = false } = options;

  console.log('\n🔐 Claude Code OAuth Login\n');
  console.log(`Using: ${useClaudeAi ? 'claude.ai' : 'console.anthropic.com'}`);
  console.log(`Scopes: ${inferenceOnly ? 'user:inference' : 'user:inference, org:create_api_key'}\n`);

  // Generate PKCE values
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateState();

  console.log('Generated PKCE:');
  console.log(`  Code Verifier: ${codeVerifier.slice(0, 20)}...`);
  console.log(`  Code Challenge: ${codeChallenge.slice(0, 20)}...`);
  console.log(`  State: ${state.slice(0, 20)}...`);

  // Start callback server
  let server, port;
  try {
    const result = await createCallbackServer(state);
    if (result.server) {
      server = result.server;
      port = result.port;
      console.log(`\nCallback server listening on port ${port}`);
    }
  } catch (err) {
    console.error('Failed to start callback server:', err.message);
    process.exit(1);
  }

  // Build URLs
  const manualUrl = buildAuthorizationUrl({
    codeChallenge,
    state,
    port,
    isManual: true,
    useClaudeAi,
    inferenceOnly,
  });

  const automaticUrl = buildAuthorizationUrl({
    codeChallenge,
    state,
    port,
    isManual: false,
    useClaudeAi,
    inferenceOnly,
  });

  console.log('\n📋 Manual URL (if browser doesn\'t open):');
  console.log(manualUrl);

  console.log('\n🌐 Opening browser...');
  const browserOpened = openBrowser(automaticUrl);

  if (!browserOpened) {
    console.log('Could not open browser. Please visit the URL above manually.');
  }

  // Wait for callback or manual input
  console.log('\nWaiting for authorization...');
  console.log('(Or paste the code manually if browser redirect fails)\n');

  let code, isManual = false;

  // Race between automatic callback and manual input
  const callbackPromise = new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      // Server will close and resolve when code is received
    }, 100);

    server.on('close', () => {
      clearInterval(checkInterval);
    });
  });

  // Simple approach: wait for server to get the code
  // In a real implementation, you'd race this with manual input
  try {
    const result = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        console.log('\nTimeout waiting for automatic callback.');
        console.log('Please enter the code manually.');
        reject(new Error('timeout'));
      }, 120000); // 2 minute timeout

      server.on('close', () => {
        clearTimeout(timeout);
      });

      // Override the server request handler to capture the code
      const originalHandler = server.listeners('request')[0];
      server.removeAllListeners('request');
      server.on('request', (req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);

        if (url.pathname === '/callback') {
          const authCode = url.searchParams.get('code');
          const authState = url.searchParams.get('state');

          if (authCode && authState === state) {
            res.writeHead(302, { Location: CONFIG.CLAUDEAI_SUCCESS_URL });
            res.end();
            clearTimeout(timeout);
            server.close();
            resolve({ code: authCode, isManual: false });
            return;
          }
        }

        res.writeHead(404);
        res.end();
      });
    });

    code = result.code;
    isManual = result.isManual;
  } catch (err) {
    // Fall back to manual input
    server.close();
    const manual = await readManualCode();
    code = manual.code;
    isManual = true;

    if (manual.state !== state) {
      console.error('State mismatch! This could indicate a security issue.');
      process.exit(1);
    }
  }

  console.log(`\n✓ Received authorization code (${isManual ? 'manual' : 'automatic'})`);

  // Exchange code for tokens
  console.log('Exchanging code for tokens...');

  try {
    const tokens = await exchangeCodeForToken(
      code,
      state,
      codeVerifier,
      port,
      isManual,
      inferenceOnly ? 31536000 : undefined // 1 year for inference-only
    );

    console.log('\n✅ Login successful!\n');
    console.log('Token Response:');
    console.log(`  Access Token: ${tokens.access_token.slice(0, 20)}...`);
    console.log(`  Token Type: ${tokens.token_type}`);
    console.log(`  Expires In: ${tokens.expires_in} seconds`);
    console.log(`  Scope: ${tokens.scope}`);
    if (tokens.refresh_token) {
      console.log(`  Refresh Token: ${tokens.refresh_token.slice(0, 20)}...`);
    }

    // Optionally save to file
    const outputPath = path.join(process.cwd(), '.claude_tokens.json');
    fs.writeFileSync(outputPath, JSON.stringify(tokens, null, 2));
    console.log(`\nTokens saved to: ${outputPath}`);

    return tokens;
  } catch (err) {
    console.error('\n❌ Token exchange failed:', err.message);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  useClaudeAi: args.includes('--claude-ai') || !args.includes('--console'),
  inferenceOnly: args.includes('--inference-only'),
};

// Run login
login(options).catch(console.error);
