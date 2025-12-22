/**
 * Reconstructed from Claude Code bundle - API Types
 *
 * Message format and response types for Anthropic API
 */

/**
 * Content block with optional cache control
 */
export interface TextContent {
  type: 'text';
  text: string;
  cache_control?: CacheControl;
}

export interface CacheControl {
  type: 'ephemeral';
}

/**
 * System message format
 */
export interface SystemMessage {
  type: 'text';
  text: string;
  cache_control?: CacheControl;
}

/**
 * User/Assistant message
 */
export interface Message {
  role: 'user' | 'assistant';
  content: TextContent[] | string;
}

/**
 * API request body
 */
export interface CreateMessageRequest {
  model: string;
  max_tokens: number;
  messages: Message[];
  system?: SystemMessage[];
  stream?: boolean;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  stop_sequences?: string[];
  metadata?: {
    user_id?: string;
  };
}

/**
 * API response
 */
export interface MessageResponse {
  id: string;
  type: 'message';
  role: 'assistant';
  model: string;
  content: TextContent[];
  stop_reason: StopReason;
  stop_sequence: string | null;
  usage: Usage;
}

export type StopReason = 'end_turn' | 'max_tokens' | 'stop_sequence' | null;

export interface Usage {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens?: number;
  cache_read_input_tokens?: number;
  cache_creation?: {
    ephemeral_5m_input_tokens: number;
    ephemeral_1h_input_tokens: number;
  };
}

/**
 * Streaming event types
 */
export type StreamEvent =
  | MessageStartEvent
  | ContentBlockStartEvent
  | ContentBlockDeltaEvent
  | ContentBlockStopEvent
  | MessageDeltaEvent
  | MessageStopEvent
  | PingEvent
  | ErrorEvent;

export interface MessageStartEvent {
  type: 'message_start';
  message: Omit<MessageResponse, 'content'> & { content: [] };
}

export interface ContentBlockStartEvent {
  type: 'content_block_start';
  index: number;
  content_block: { type: 'text'; text: '' };
}

export interface ContentBlockDeltaEvent {
  type: 'content_block_delta';
  index: number;
  delta: { type: 'text_delta'; text: string };
}

export interface ContentBlockStopEvent {
  type: 'content_block_stop';
  index: number;
}

export interface MessageDeltaEvent {
  type: 'message_delta';
  delta: { stop_reason: StopReason; stop_sequence: string | null };
  usage: { output_tokens: number };
}

export interface MessageStopEvent {
  type: 'message_stop';
}

export interface PingEvent {
  type: 'ping';
}

export interface ErrorEvent {
  type: 'error';
  error: {
    type: string;
    message: string;
  };
}

/**
 * API error response
 */
export interface ApiError {
  type: 'error';
  error: {
    type: 'authentication_error' | 'invalid_request_error' | 'rate_limit_error' | 'api_error';
    message: string;
  };
  request_id?: string;
}

/**
 * Request options
 */
export interface RequestOptions {
  maxTokens?: number;
  stream?: boolean;
  temperature?: number;
  timeout?: number;
}
