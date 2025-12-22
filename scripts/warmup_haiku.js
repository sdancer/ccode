#!/usr/bin/env node
/**
 * Warmup request to Haiku - exact replica of Claude Code's warmup call
 */

const fs = require('fs');
const path = require('path');

// Load tokens
const tokenPath = path.join(process.cwd(), '.claude_tokens.json');
if (!fs.existsSync(tokenPath)) {
  console.error('No .claude_tokens.json found');
  process.exit(1);
}
const tokens = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));

console.log(`Using token for: ${tokens.account?.email_address || 'unknown'}`);

const url = 'https://api.anthropic.com/v1/messages?beta=true';

const headers = {
  'accept': 'application/json',
  'anthropic-beta': 'oauth-2025-04-20,interleaved-thinking-2025-05-14,context-management-2025-06-27',
  'anthropic-dangerous-direct-browser-access': 'true',
  'anthropic-version': '2023-06-01',
  'authorization': `Bearer ${tokens.access_token}`,
  'content-type': 'application/json',
  'user-agent': 'claude-cli/2.0.72 (external, cli)',
  'x-app': 'cli',
};

const body = {
  model: 'claude-haiku-4-5-20251001',
  max_tokens: 1,
  messages: [{ role: 'user', content: 'quota' }],
  metadata: {
    user_id: `user_${tokens.account?.uuid || 'unknown'}_session_warmup`
  }
};

console.log('\nSending warmup request to Haiku...');
console.log('URL:', url);
console.log('Body:', JSON.stringify(body, null, 2));

fetch(url, {
  method: 'POST',
  headers,
  body: JSON.stringify(body),
})
.then(async res => {
  const text = await res.text();
  console.log(`\nStatus: ${res.status} ${res.statusText}`);
  console.log('Response:', text);
})
.catch(err => {
  console.error('Error:', err.message);
});
