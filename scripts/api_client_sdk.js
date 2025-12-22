#!/usr/bin/env node
/**
 * Anthropic API Client using Official SDK with OAuth Token
 *
 * Uses the Anthropic SDK with authToken parameter for OAuth authentication.
 *
 * Usage:
 *   node api_client_sdk.js "What is 2+2?"
 *   node api_client_sdk.js --model claude-sonnet-4-20250514 "Hello"
 *   node api_client_sdk.js --stream "Tell me a joke"
 *
 * First run: npm install @anthropic-ai/sdk
 */

const fs = require('fs');
const path = require('path');

// Default configuration
const CONFIG = {
  DEFAULT_MODEL: 'claude-sonnet-4-20250514',
  MAX_TOKENS: 4096,
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

async function main() {
  const options = parseArgs();

  if (!options.prompt) {
    console.log('Usage: node api_client_sdk.js [--model MODEL] [--stream] [--max-tokens N] "prompt"');
    console.log('\nModels:');
    console.log('  claude-sonnet-4-20250514 (default)');
    console.log('  claude-haiku-4-20250514');
    console.log('  claude-opus-4-20250514');
    console.log('\nNote: First run `npm install @anthropic-ai/sdk`');
    process.exit(1);
  }

  // Dynamic import of SDK
  let Anthropic;
  try {
    Anthropic = (await import('@anthropic-ai/sdk')).default;
  } catch (e) {
    console.error('Anthropic SDK not installed. Run: npm install @anthropic-ai/sdk');
    process.exit(1);
  }

  const tokens = loadTokens();
  console.log(`Using OAuth token for: ${tokens.account?.email_address || 'unknown'}`);

  // Create client with authToken (OAuth) instead of apiKey
  // Exact headers from Claude Code (captured via fetch logging)
  const client = new Anthropic({
    authToken: tokens.access_token,
    baseURL: 'https://api.anthropic.com',
    defaultHeaders: {
      'x-app': 'cli',
      'anthropic-beta': 'oauth-2025-04-20,interleaved-thinking-2025-05-14,context-management-2025-06-27',
      'anthropic-dangerous-direct-browser-access': 'true',
      'User-Agent': 'claude-cli/2.0.72 (external, cli)',
    },
    defaultQuery: {
      beta: 'true',
    },
  });

  try {
    if (options.stream) {
      console.log(`\nStreaming from ${options.model}...\n`);

      // Use beta.messages like Claude Code does
      const stream = await client.beta.messages.stream({
        model: options.model,
        max_tokens: options.maxTokens,
        messages: [{ role: 'user', content: options.prompt }],
      });

      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
          process.stdout.write(event.delta.text);
        }
      }

      const finalMessage = await stream.finalMessage();
      console.log('\n\n---');
      console.log(`Model: ${finalMessage.model}`);
      console.log(`Usage: ${finalMessage.usage.input_tokens} in, ${finalMessage.usage.output_tokens} out`);
      console.log(`Stop reason: ${finalMessage.stop_reason}`);
    } else {
      console.log(`\nQuerying ${options.model}...\n`);

      // Use beta.messages like Claude Code does
      const message = await client.beta.messages.create({
        model: options.model,
        max_tokens: options.maxTokens,
        messages: [{ role: 'user', content: options.prompt }],
      });

      // Extract text from response
      const text = message.content
        .filter(c => c.type === 'text')
        .map(c => c.text)
        .join('');

      console.log(text);
      console.log('\n---');
      console.log(`Model: ${message.model}`);
      console.log(`Usage: ${message.usage.input_tokens} in, ${message.usage.output_tokens} out`);
      console.log(`Stop reason: ${message.stop_reason}`);
    }
  } catch (err) {
    console.error('Error:', err.message);
    if (err.status) {
      console.error(`Status: ${err.status}`);
    }
    process.exit(1);
  }
}

main();
