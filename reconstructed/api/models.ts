/**
 * Reconstructed from Claude Code bundle - Model Configurations
 *
 * Source: formatted.js lines 124011-124067
 * Variables: VwA, HwA, DwA, FwA, gAA, Ph1, EwA, zwA, uAA
 * Accessor function: _aA() at line 124093
 */

export type Provider = 'firstParty' | 'bedrock' | 'vertex' | 'foundry';

export interface ModelConfig {
  firstParty: string;   // api.anthropic.com
  bedrock: string;      // AWS Bedrock
  vertex: string;       // Google Vertex AI
  foundry: string;      // Azure Foundry
}

// VwA - Claude 3.7 Sonnet
const sonnet37Config: ModelConfig = {
  firstParty: 'claude-3-7-sonnet-20250219',
  bedrock: 'us.anthropic.claude-3-7-sonnet-20250219-v1:0',
  vertex: 'claude-3-7-sonnet@20250219',
  foundry: 'claude-3-7-sonnet',
};

// HwA - Claude 3.5 Sonnet
const sonnet35Config: ModelConfig = {
  firstParty: 'claude-3-5-sonnet-20241022',
  bedrock: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
  vertex: 'claude-3-5-sonnet-v2@20241022',
  foundry: 'claude-3-5-sonnet',
};

// DwA - Claude 3.5 Haiku
const haiku35Config: ModelConfig = {
  firstParty: 'claude-3-5-haiku-20241022',
  bedrock: 'us.anthropic.claude-3-5-haiku-20241022-v1:0',
  vertex: 'claude-3-5-haiku@20241022',
  foundry: 'claude-3-5-haiku',
};

// FwA - Claude 4.5 Haiku
const haiku45Config: ModelConfig = {
  firstParty: 'claude-haiku-4-5-20251001',
  bedrock: 'us.anthropic.claude-haiku-4-5-20251001-v1:0',
  vertex: 'claude-haiku-4-5@20251001',
  foundry: 'claude-haiku-4-5',
};

// gAA - Claude 4 Sonnet
const sonnet40Config: ModelConfig = {
  firstParty: 'claude-sonnet-4-20250514',
  bedrock: 'us.anthropic.claude-sonnet-4-20250514-v1:0',
  vertex: 'claude-sonnet-4@20250514',
  foundry: 'claude-sonnet-4',
};

// Ph1 - Claude 4.5 Sonnet
const sonnet45Config: ModelConfig = {
  firstParty: 'claude-sonnet-4-5-20250929',
  bedrock: 'us.anthropic.claude-sonnet-4-5-20250929-v1:0',
  vertex: 'claude-sonnet-4-5@20250929',
  foundry: 'claude-sonnet-4-5',
};

// EwA - Claude 4 Opus
const opus40Config: ModelConfig = {
  firstParty: 'claude-opus-4-20250514',
  bedrock: 'us.anthropic.claude-opus-4-20250514-v1:0',
  vertex: 'claude-opus-4@20250514',
  foundry: 'claude-opus-4',
};

// zwA - Claude 4.1 Opus
const opus41Config: ModelConfig = {
  firstParty: 'claude-opus-4-1-20250805',
  bedrock: 'us.anthropic.claude-opus-4-1-20250805-v1:0',
  vertex: 'claude-opus-4-1@20250805',
  foundry: 'claude-opus-4-1',
};

// uAA - Claude 4.5 Opus
const opus45Config: ModelConfig = {
  firstParty: 'claude-opus-4-5-20251101',
  bedrock: 'us.anthropic.claude-opus-4-5-20251101-v1:0',
  vertex: 'claude-opus-4-5@20251101',
  foundry: 'claude-opus-4-5',
};

/**
 * All model configurations
 */
export const MODEL_CONFIGS = {
  haiku35: haiku35Config,
  haiku45: haiku45Config,
  sonnet35: sonnet35Config,
  sonnet37: sonnet37Config,
  sonnet40: sonnet40Config,
  sonnet45: sonnet45Config,
  opus40: opus40Config,
  opus41: opus41Config,
  opus45: opus45Config,
} as const;

export type ModelAlias = keyof typeof MODEL_CONFIGS;

/**
 * Get all model IDs for a specific provider
 *
 * Original minified: _aA()
 */
export function getModelsForProvider(provider: Provider): Record<ModelAlias, string> {
  return {
    haiku35: haiku35Config[provider],
    haiku45: haiku45Config[provider],
    sonnet35: sonnet35Config[provider],
    sonnet37: sonnet37Config[provider],
    sonnet40: sonnet40Config[provider],
    sonnet45: sonnet45Config[provider],
    opus40: opus40Config[provider],
    opus41: opus41Config[provider],
    opus45: opus45Config[provider],
  };
}

/**
 * Default models for different use cases
 */
export const DEFAULT_MODELS = {
  fast: haiku45Config.firstParty,      // Quick responses
  balanced: sonnet40Config.firstParty,  // Default for most tasks
  powerful: opus45Config.firstParty,    // Complex reasoning
} as const;

/**
 * Check if a model requires the Claude Code system prompt
 * (All non-Haiku models require it for OAuth)
 */
export function requiresSystemPrompt(modelId: string): boolean {
  return !modelId.includes('haiku');
}

/**
 * Get display name for a model
 *
 * Source: formatted.js lines 123996-124007
 */
export function getModelDisplayName(modelId: string): string {
  if (modelId.includes('claude-sonnet-4-5')) return 'Sonnet 4.5';
  if (modelId.includes('claude-sonnet-4')) return 'Sonnet 4';
  if (modelId.includes('claude-opus-4-5')) return 'Opus 4.5';
  if (modelId.includes('claude-opus-4-1')) return 'Opus 4.1';
  if (modelId.includes('claude-opus-4')) return 'Opus 4';
  if (modelId.includes('claude-haiku-4-5')) return 'Haiku 4.5';
  if (modelId.includes('claude-3-7-sonnet')) return 'Sonnet 3.7';
  if (modelId.includes('claude-3-5-sonnet')) return 'Sonnet 3.5';
  if (modelId.includes('claude-3-5-haiku')) return 'Haiku 3.5';
  return modelId;
}

/**
 * Check if model supports extended thinking
 *
 * Source: formatted.js line 64062
 */
export function supportsExtendedThinking(modelId: string): boolean {
  return modelId.includes('claude-opus-4') || modelId.includes('claude-sonnet-4');
}
