/**
 * Reconstructed from Claude Code bundle - API Client
 *
 * Implements the Claude API client with OAuth authentication.
 *
 * CRITICAL REQUIREMENTS FOR OAUTH:
 * 1. anthropic-beta header must include 'claude-code-20250219' for Sonnet/Opus
 * 2. anthropic-dangerous-direct-browser-access must be 'true'
 * 3. x-app must be 'cli'
 * 4. Non-Haiku models require system prompt: "You are Claude Code..."
 * 5. Messages should use cache_control: { type: 'ephemeral' }
 * 6. URL must include ?beta=true
 */

import type {
  CreateMessageRequest,
  MessageResponse,
  Message,
  TextContent,
  RequestOptions,
  StreamEvent,
} from './types';
import { requiresSystemPrompt, DEFAULT_MODELS } from './models';

/**
 * API Configuration constants
 */
export const API_CONFIG = {
  BASE_URL: 'https://api.anthropic.com',
  MESSAGES_PATH: '/v1/messages',
  VERSION: '2023-06-01',

  // Beta flags - CRITICAL for OAuth acceptance
  BETA_FLAGS: {
    CLAUDE_CODE: 'claude-code-20250219',
    OAUTH: 'oauth-2025-04-20',
    THINKING: 'interleaved-thinking-2025-05-14',
  },

  // Required system prompt for non-Haiku models
  SYSTEM_PROMPT: 'You are Claude Code, Anthropic\'s official CLI for Claude.',

  // User agent format
  USER_AGENT: 'claude-cli/2.0.72 (external, cli)',
} as const;

/**
 * Build the full beta header string
 */
export function getBetaHeader(): string {
  return [
    API_CONFIG.BETA_FLAGS.CLAUDE_CODE,
    API_CONFIG.BETA_FLAGS.OAUTH,
    API_CONFIG.BETA_FLAGS.THINKING,
  ].join(',');
}

/**
 * Build headers for API requests
 */
export function buildHeaders(accessToken: string): Record<string, string> {
  return {
    'accept': 'application/json',
    'authorization': `Bearer ${accessToken}`,
    'content-type': 'application/json',
    'anthropic-version': API_CONFIG.VERSION,
    'anthropic-beta': getBetaHeader(),
    'anthropic-dangerous-direct-browser-access': 'true',
    'user-agent': API_CONFIG.USER_AGENT,
    'x-app': 'cli',
  };
}

/**
 * Build message content with cache control
 */
function buildContent(text: string): TextContent[] {
  return [{
    type: 'text',
    text,
    cache_control: { type: 'ephemeral' },
  }];
}

/**
 * Build request body for API call
 */
export function buildRequestBody(
  model: string,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  options: RequestOptions = {}
): CreateMessageRequest {
  const body: CreateMessageRequest = {
    model,
    max_tokens: options.maxTokens ?? 4096,
    messages: messages.map(msg => ({
      role: msg.role,
      content: buildContent(msg.content),
    })),
  };

  // Add system prompt for non-Haiku models (required for OAuth)
  if (requiresSystemPrompt(model)) {
    body.system = [{
      type: 'text',
      text: API_CONFIG.SYSTEM_PROMPT,
      cache_control: { type: 'ephemeral' },
    }];
  }

  if (options.stream) {
    body.stream = true;
  }

  if (options.temperature !== undefined) {
    body.temperature = options.temperature;
  }

  return body;
}

/**
 * Get the messages API endpoint
 */
export function getMessagesEndpoint(): string {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.MESSAGES_PATH}?beta=true`;
}

/**
 * Claude API Client
 */
export class ClaudeClient {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * Send a message and get a response
   */
  async createMessage(
    prompt: string,
    options: RequestOptions & { model?: string } = {}
  ): Promise<MessageResponse> {
    const model = options.model ?? DEFAULT_MODELS.balanced;
    const url = getMessagesEndpoint();
    const headers = buildHeaders(this.accessToken);
    const body = buildRequestBody(
      model,
      [{ role: 'user', content: prompt }],
      options
    );

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error ${response.status}: ${error}`);
    }

    return response.json();
  }

  /**
   * Send a message with streaming response
   */
  async *streamMessage(
    prompt: string,
    options: RequestOptions & { model?: string } = {}
  ): AsyncGenerator<StreamEvent, void, unknown> {
    const model = options.model ?? DEFAULT_MODELS.balanced;
    const url = getMessagesEndpoint();
    const headers = buildHeaders(this.accessToken);
    const body = buildRequestBody(
      model,
      [{ role: 'user', content: prompt }],
      { ...options, stream: true }
    );

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error ${response.status}: ${error}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          try {
            yield JSON.parse(data) as StreamEvent;
          } catch {
            // Skip invalid JSON
          }
        }
      }
    }
  }

  /**
   * Simple helper to get text response
   */
  async query(
    prompt: string,
    model?: string
  ): Promise<string> {
    const response = await this.createMessage(prompt, { model });
    return response.content
      .filter(c => c.type === 'text')
      .map(c => c.text)
      .join('');
  }

  /**
   * Update access token (after refresh)
   */
  updateToken(accessToken: string): void {
    this.accessToken = accessToken;
  }
}

/**
 * Create a client from stored tokens
 */
export function createClient(accessToken: string): ClaudeClient {
  return new ClaudeClient(accessToken);
}
