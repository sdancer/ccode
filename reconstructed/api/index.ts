/**
 * Reconstructed Claude Code API Module
 *
 * Provides API client functionality for Claude Code CLI.
 *
 * Key discoveries from reverse engineering:
 * - OAuth tokens require specific beta headers to be accepted
 * - Non-Haiku models require a specific system prompt
 * - All messages should use cache_control: { type: 'ephemeral' }
 * - URL must include ?beta=true query parameter
 *
 * Source locations in formatted.js:
 * - Model configs: lines 124011-124067
 * - Model accessor: _aA() at line 124093
 * - Display names: lines 123996-124007
 */

// Types
export type {
  TextContent,
  CacheControl,
  SystemMessage,
  Message,
  CreateMessageRequest,
  MessageResponse,
  StopReason,
  Usage,
  StreamEvent,
  MessageStartEvent,
  ContentBlockStartEvent,
  ContentBlockDeltaEvent,
  ContentBlockStopEvent,
  MessageDeltaEvent,
  MessageStopEvent,
  PingEvent,
  ErrorEvent,
  ApiError,
  RequestOptions,
} from './types';

// Models
export {
  MODEL_CONFIGS,
  DEFAULT_MODELS,
  getModelsForProvider,
  getModelDisplayName,
  requiresSystemPrompt,
  supportsExtendedThinking,
  type ModelConfig,
  type ModelAlias,
  type Provider,
} from './models';

// Client
export {
  ClaudeClient,
  createClient,
  API_CONFIG,
  getBetaHeader,
  buildHeaders,
  buildRequestBody,
  getMessagesEndpoint,
} from './client';
