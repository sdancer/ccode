#!/usr/bin/env node
/**
 * Simple Anthropic API Client using OAuth Token
 *
 * Uses the OAuth access token from .claude_tokens.json to query Claude models.
 *
 * Usage:
 *   node api_client.js "What is 2+2?"
 *   node api_client.js --model claude-sonnet-4-20250514 "Hello"
 *   node api_client.js --stream "Tell me a joke"
 */

const fs = require('fs');
const path = require('path');

// API Configuration (from Claude Code bundle analysis)
const CONFIG = {
  API_URL: 'https://api.anthropic.com/v1/messages',
  DEFAULT_MODEL: 'claude-sonnet-4-20250514',
  MAX_TOKENS: 4096,
  API_VERSION: '2023-06-01',
};

// Load OAuth tokens
function loadTokens() {
  const tokenPath = path.join(process.cwd(), '.claude_tokens.json');
  if (!fs.existsSync(tokenPath)) {
    console.error('No .claude_tokens.json found. Run oauth_login_simple.js first.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    model: CONFIG.DEFAULT_MODEL,
    stream: false,
    maxTokens: CONFIG.MAX_TOKENS,
    prompt: null,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--model' && args[i + 1]) {
      options.model = args[++i];
    } else if (args[i] === '--stream') {
      options.stream = true;
    } else if (args[i] === '--max-tokens' && args[i + 1]) {
      options.maxTokens = parseInt(args[++i], 10);
    } else if (!args[i].startsWith('--')) {
      options.prompt = args[i];
    }
  }

  return options;
}

// Non-streaming API call
async function query(prompt, options, tokens) {
  const body = {
    model: options.model,
    max_tokens: options.maxTokens,
    messages: [
      { role: 'user', content: prompt }
    ],
  };

  console.log(`\nQuerying ${options.model}...\n`);

  const response = await fetch(CONFIG.API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.access_token}`,
      'anthropic-version': CONFIG.API_VERSION,
      'x-app': 'cli',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error (${response.status}): ${error}`);
  }

  const result = await response.json();
  return result;
}

// Streaming API call
async function queryStream(prompt, options, tokens) {
  const body = {
    model: options.model,
    max_tokens: options.maxTokens,
    stream: true,
    messages: [
      { role: 'user', content: prompt }
    ],
  };

  console.log(`\nStreaming from ${options.model}...\n`);

  const response = await fetch(CONFIG.API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.access_token}`,
      'anthropic-version': CONFIG.API_VERSION,
      'x-app': 'cli',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error (${response.status}): ${error}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';
  let usage = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop(); // Keep incomplete line in buffer

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;

        try {
          const event = JSON.parse(data);

          if (event.type === 'content_block_delta' && event.delta?.text) {
            process.stdout.write(event.delta.text);
            fullText += event.delta.text;
          } else if (event.type === 'message_delta' && event.usage) {
            usage = event.usage;
          }
        } catch (e) {
          // Skip non-JSON lines
        }
      }
    }
  }

  console.log('\n');
  return { text: fullText, usage };
}

// Main
async function main() {
  const options = parseArgs();

  if (!options.prompt) {
    console.log('Usage: node api_client.js [--model MODEL] [--stream] [--max-tokens N] "prompt"');
    console.log('\nModels:');
    console.log('  claude-sonnet-4-20250514 (default)');
    console.log('  claude-haiku-4-20250514');
    console.log('  claude-opus-4-20250514');
    process.exit(1);
  }

  const tokens = loadTokens();
  console.log(`Using OAuth token for: ${tokens.account?.email_address || 'unknown'}`);

  try {
    if (options.stream) {
      const result = await queryStream(options.prompt, options, tokens);
      if (result.usage) {
        console.log(`Usage: ${result.usage.output_tokens} output tokens`);
      }
    } else {
      const result = await query(options.prompt, options, tokens);

      // Extract text from response
      const text = result.content
        ?.filter(c => c.type === 'text')
        .map(c => c.text)
        .join('');

      console.log(text);
      console.log('\n---');
      console.log(`Model: ${result.model}`);
      console.log(`Usage: ${result.usage.input_tokens} in, ${result.usage.output_tokens} out`);
      console.log(`Stop reason: ${result.stop_reason}`);
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
