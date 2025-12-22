/**
 * Reconstructed from Claude Code bundle - Auth Types
 *
 * Source modules: A2, ACA, JdA
 */

export interface OAuthTokens {
  accessToken: string;
  refreshToken: string | null;
  expiresAt: number | null;
  scopes: string[];
  subscriptionType: SubscriptionType | null;
  rateLimitTier: string | null;
}

export type SubscriptionType = 'max' | 'pro' | 'enterprise' | 'team' | null;

export interface OAuthAccount {
  accountUuid: string;
  emailAddress: string;
  organizationUuid?: string;
  displayName?: string;
  hasExtraUsageEnabled?: boolean;
  organizationRole?: string;
  workspaceRole?: string;
  organizationName?: string;
}

export interface TokenExchangeResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope: string;
  account?: {
    uuid: string;
    email_address: string;
  };
  organization?: {
    uuid: string;
  };
}

export interface UserProfile {
  subscriptionType: SubscriptionType;
  rateLimitTier: string | null;
  hasExtraUsageEnabled: boolean | null;
  displayName?: string;
}

export interface OAuthConfig {
  BASE_API_URL: string;
  TOKEN_URL: string;
  ROLES_URL: string;
  API_KEY_URL: string;
  CLIENT_ID: string;
  CONSOLE_AUTHORIZE_URL: string;
  CLAUDE_AI_AUTHORIZE_URL: string;
  MANUAL_REDIRECT_URL: string;
  CONSOLE_SUCCESS_URL: string;
  CLAUDEAI_SUCCESS_URL: string;
}

export interface OAuthFlowOptions {
  loginWithClaudeAi?: boolean;
  inferenceOnly?: boolean;
  expiresIn?: number;
  orgUUID?: string;
}

export interface AuthorizationUrlParams {
  codeChallenge: string;
  state: string;
  port: number;
  isManual: boolean;
  loginWithClaudeAi?: boolean;
  inferenceOnly?: boolean;
  orgUUID?: string;
}

/**
 * API Message Types
 */
export interface MessageContent {
  type: 'text';
  text: string;
  cache_control?: { type: 'ephemeral' };
}

export interface SystemMessage {
  type: 'text';
  text: string;
  cache_control?: { type: 'ephemeral' };
}

export interface ApiMessage {
  role: 'user' | 'assistant';
  content: MessageContent[] | string;
}

export interface ApiRequestBody {
  model: string;
  max_tokens: number;
  messages: ApiMessage[];
  system?: SystemMessage[];
  stream?: boolean;
  metadata?: {
    user_id?: string;
  };
}

export interface ApiResponse {
  id: string;
  type: 'message';
  role: 'assistant';
  model: string;
  content: Array<{ type: 'text'; text: string }>;
  stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence' | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
    cache_creation_input_tokens?: number;
    cache_read_input_tokens?: number;
  };
}

/**
 * Model identifiers
 *
 * Source: formatted.js lines 124011-124067
 * Variables: VwA, HwA, DwA, FwA, gAA, Ph1, EwA, zwA, uAA
 * Accessor function: _aA() at line 124093
 */
export interface ModelConfig {
  firstParty: string;   // api.anthropic.com
  bedrock: string;      // AWS Bedrock
  vertex: string;       // Google Vertex AI
  foundry: string;      // Azure Foundry
}

export const MODEL_CONFIGS = {
  // Claude 3.5 family
  sonnet35: {
    firstParty: 'claude-3-5-sonnet-20241022',
    bedrock: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
    vertex: 'claude-3-5-sonnet-v2@20241022',
    foundry: 'claude-3-5-sonnet',
  },
  haiku35: {
    firstParty: 'claude-3-5-haiku-20241022',
    bedrock: 'us.anthropic.claude-3-5-haiku-20241022-v1:0',
    vertex: 'claude-3-5-haiku@20241022',
    foundry: 'claude-3-5-haiku',
  },
  // Claude 3.7 family
  sonnet37: {
    firstParty: 'claude-3-7-sonnet-20250219',
    bedrock: 'us.anthropic.claude-3-7-sonnet-20250219-v1:0',
    vertex: 'claude-3-7-sonnet@20250219',
    foundry: 'claude-3-7-sonnet',
  },
  // Claude 4 family
  haiku45: {
    firstParty: 'claude-haiku-4-5-20251001',
    bedrock: 'us.anthropic.claude-haiku-4-5-20251001-v1:0',
    vertex: 'claude-haiku-4-5@20251001',
    foundry: 'claude-haiku-4-5',
  },
  sonnet40: {
    firstParty: 'claude-sonnet-4-20250514',
    bedrock: 'us.anthropic.claude-sonnet-4-20250514-v1:0',
    vertex: 'claude-sonnet-4@20250514',
    foundry: 'claude-sonnet-4',
  },
  sonnet45: {
    firstParty: 'claude-sonnet-4-5-20250929',
    bedrock: 'us.anthropic.claude-sonnet-4-5-20250929-v1:0',
    vertex: 'claude-sonnet-4-5@20250929',
    foundry: 'claude-sonnet-4-5',
  },
  opus40: {
    firstParty: 'claude-opus-4-20250514',
    bedrock: 'us.anthropic.claude-opus-4-20250514-v1:0',
    vertex: 'claude-opus-4@20250514',
    foundry: 'claude-opus-4',
  },
  opus41: {
    firstParty: 'claude-opus-4-1-20250805',
    bedrock: 'us.anthropic.claude-opus-4-1-20250805-v1:0',
    vertex: 'claude-opus-4-1@20250805',
    foundry: 'claude-opus-4-1',
  },
  opus45: {
    firstParty: 'claude-opus-4-5-20251101',
    bedrock: 'us.anthropic.claude-opus-4-5-20251101-v1:0',
    vertex: 'claude-opus-4-5@20251101',
    foundry: 'claude-opus-4-5',
  },
} as const;

export type ModelId = typeof MODEL_CONFIGS[keyof typeof MODEL_CONFIGS]['firstParty'];
