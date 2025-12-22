#!/usr/bin/env node
/**
 * Create API Key from OAuth Token
 *
 * Uses the OAuth access token to generate a real API key that can be used
 * for direct API access (not restricted to Claude Code).
 *
 * Requires the 'org:create_api_key' scope - re-login with oauth_login_simple.js
 * if you only have 'user:inference'.
 *
 * Usage:
 *   node create_api_key.js
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  BASE_API_URL: 'https://api.anthropic.com',
  API_KEY_URL: 'https://api.anthropic.com/api/oauth/claude_cli/create_api_key',
};

function loadTokens() {
  const tokenPath = path.join(process.cwd(), '.claude_tokens.json');
  if (!fs.existsSync(tokenPath)) {
    console.error('No .claude_tokens.json found. Run oauth_login_simple.js first.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
}

async function createApiKey(tokens) {
  console.log('\nCreating API key from OAuth token...\n');

  // Check scope
  const scopes = tokens.scope?.split(' ') || [];
  if (!scopes.includes('org:create_api_key')) {
    console.error('Error: OAuth token does not have org:create_api_key scope.');
    console.error('Current scopes:', tokens.scope);
    console.error('\nRe-run oauth_login_simple.js to login with full scopes.');
    process.exit(1);
  }

  const response = await fetch(CONFIG.API_KEY_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokens.access_token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API Error (${response.status}): ${text}`);
  }

  const data = await response.json();
  return data;
}

async function main() {
  const tokens = loadTokens();
  console.log(`Using OAuth token for: ${tokens.account?.email_address || 'unknown'}`);
  console.log(`Scopes: ${tokens.scope}`);

  try {
    const result = await createApiKey(tokens);

    if (result.raw_key) {
      console.log('\n✅ API Key Created!\n');
      console.log(`API Key: ${result.raw_key}`);
      console.log('\nYou can now use this key with the standard Anthropic API.');
      console.log('Set it as ANTHROPIC_API_KEY environment variable.\n');

      // Save to file
      const outputPath = path.join(process.cwd(), '.anthropic_api_key');
      fs.writeFileSync(outputPath, result.raw_key);
      console.log(`Saved to: ${outputPath}`);
    } else {
      console.log('Response:', JSON.stringify(result, null, 2));
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
