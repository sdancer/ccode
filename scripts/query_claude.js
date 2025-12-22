#!/usr/bin/env node
/**
 * Query Claude API using OAuth token - raw fetch version
 *
 * Usage:
 *   node query_claude.js "What is 2+2?"
 *   node query_claude.js --model haiku "Hello"
 *   node query_claude.js --model opus "Complex task"
 */

const fs = require('fs');
const path = require('path');

const MODELS = {
  sonnet: 'claude-sonnet-4-20250514',
  haiku: 'claude-haiku-4-5-20251001',
  opus: 'claude-opus-4-5-20251101',
};

// Parse args
const args = process.argv.slice(2);
let model = MODELS.sonnet;
let prompt = null;
let stream = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--model' && args[i + 1]) {
    const m = args[++i].toLowerCase();
    model = MODELS[m] || m;
  } else if (args[i] === '--stream') {
    stream = true;
  } else if (!args[i].startsWith('--')) {
    prompt = args[i];
  }
}

if (!prompt) {
  console.log('Usage: node query_claude.js [--model sonnet|haiku|opus] [--stream] "prompt"');
  process.exit(1);
}

// Load tokens
const tokenPath = path.join(process.cwd(), '.claude_tokens.json');
if (!fs.existsSync(tokenPath)) {
  console.error('No .claude_tokens.json found');
  process.exit(1);
}
const tokens = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));

console.log(`Using: ${tokens.account?.email_address || 'unknown'}`);
console.log(`Model: ${model}`);
console.log(`Prompt: ${prompt}\n`);

const url = 'https://api.anthropic.com/v1/messages?beta=true';

// claude-code-20250219 is required for non-haiku models
const headers = {
  'accept': 'application/json',
  'anthropic-beta': 'claude-code-20250219,oauth-2025-04-20,interleaved-thinking-2025-05-14',
  'anthropic-dangerous-direct-browser-access': 'true',
  'anthropic-version': '2023-06-01',
  'authorization': `Bearer ${tokens.access_token}`,
  'content-type': 'application/json',
  'user-agent': 'claude-cli/2.0.72 (external, cli)',
  'x-app': 'cli',
};

const body = {
  model,
  max_tokens: 4096,
  messages: [{
    role: 'user',
    content: [{ type: 'text', text: prompt, cache_control: { type: 'ephemeral' } }]
  }],
  system: [{
    type: 'text',
    text: 'You are Claude Code, Anthropic\'s official CLI for Claude.',
    cache_control: { type: 'ephemeral' }
  }],
  stream,
};

async function main() {
  if (stream) {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error(`Error: ${res.status} ${await res.text()}`);
      process.exit(1);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          try {
            const event = JSON.parse(data);
            if (event.type === 'content_block_delta' && event.delta?.text) {
              process.stdout.write(event.delta.text);
            }
          } catch {}
        }
      }
    }
    console.log();
  } else {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const text = await res.text();

    if (!res.ok) {
      console.error(`Error: ${res.status} ${text}`);
      process.exit(1);
    }

    const msg = JSON.parse(text);
    const content = msg.content
      .filter(c => c.type === 'text')
      .map(c => c.text)
      .join('');

    console.log(content);
    console.log('\n---');
    console.log(`Usage: ${msg.usage.input_tokens} in, ${msg.usage.output_tokens} out`);
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
