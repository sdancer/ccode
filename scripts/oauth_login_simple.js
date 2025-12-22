#!/usr/bin/env node
/**
 * Simple Claude Code OAuth Login
 *
 * Generates auth URL and waits for manual code input.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CONFIG = {
  CLIENT_ID: '9d1c250a-e61b-44d9-88ed-5944d1962f5e',
  CLAUDE_AI_AUTHORIZE_URL: 'https://claude.ai/oauth/authorize',
  TOKEN_URL: 'https://console.anthropic.com/v1/oauth/token',
  MANUAL_REDIRECT_URL: 'https://console.anthropic.com/oauth/code/callback',
};

function base64UrlEncode(buffer) {
  return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function generateCodeVerifier() {
  return base64UrlEncode(crypto.randomBytes(32));
}

function generateCodeChallenge(verifier) {
  return base64UrlEncode(crypto.createHash('sha256').update(verifier).digest());
}

function generateState() {
  return base64UrlEncode(crypto.randomBytes(32));
}

async function main() {
  console.log('\n🔐 Claude Code OAuth Login (Simple)\n');

  // Generate PKCE
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateState();

  console.log('PKCE Values (save these):');
  console.log(`  Code Verifier: ${codeVerifier}`);
  console.log(`  State: ${state}`);

  // Build URL
  const url = new URL(CONFIG.CLAUDE_AI_AUTHORIZE_URL);
  url.searchParams.append('code', 'true');
  url.searchParams.append('client_id', CONFIG.CLIENT_ID);
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('redirect_uri', CONFIG.MANUAL_REDIRECT_URL);
  // Request all scopes that Claude Code uses
  url.searchParams.append('scope', 'org:create_api_key user:profile user:inference user:sessions:claude_code');
  url.searchParams.append('code_challenge', codeChallenge);
  url.searchParams.append('code_challenge_method', 'S256');
  url.searchParams.append('state', state);

  console.log('\n📋 Open this URL in your browser:\n');
  console.log(url.toString());
  console.log('\nAfter login, you\'ll get a code. Paste the FULL code (including #state part):\n');

  // Wait for input
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const answer = await new Promise(resolve => {
    rl.question('Code: ', resolve);
  });
  rl.close();

  // Parse code
  const [authCode, returnedState] = answer.trim().split('#');

  if (!authCode) {
    console.error('❌ No code provided');
    process.exit(1);
  }

  if (returnedState !== state) {
    console.warn('⚠️  State mismatch - proceeding anyway');
  }

  console.log('\n🔄 Exchanging code for tokens...');

  // Exchange code
  const payload = {
    grant_type: 'authorization_code',
    code: authCode,
    redirect_uri: CONFIG.MANUAL_REDIRECT_URL,
    client_id: CONFIG.CLIENT_ID,
    code_verifier: codeVerifier,
    state: state,
  };

  try {
    const response = await fetch(CONFIG.TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    if (!response.ok) {
      console.error(`❌ Token exchange failed (${response.status}):`);
      console.error(text);
      process.exit(1);
    }

    const tokens = JSON.parse(text);

    console.log('\n✅ Login successful!\n');
    console.log('Tokens:');
    console.log(`  Access Token: ${tokens.access_token?.slice(0, 30)}...`);
    console.log(`  Token Type: ${tokens.token_type}`);
    console.log(`  Expires In: ${tokens.expires_in} seconds`);
    console.log(`  Scope: ${tokens.scope}`);
    if (tokens.refresh_token) {
      console.log(`  Refresh Token: ${tokens.refresh_token?.slice(0, 20)}...`);
    }

    // Save tokens
    const outputPath = path.join(process.cwd(), '.claude_tokens.json');
    fs.writeFileSync(outputPath, JSON.stringify(tokens, null, 2));
    console.log(`\n💾 Saved to: ${outputPath}`);

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
