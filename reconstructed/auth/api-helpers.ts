/**
 * Reconstructed from Claude Code bundle - API Helpers
 *
 * Source module: HBA (lines 273646-273756)
 *
 * Original minified names:
 * - FP() -> getAccessTokenAndOrg()
 * - PV() -> getAuthHeaders()
 * - CcB() -> fetchCodeSessions()
 * - SjA() -> fetchSessionById()
 * - G80() -> getSessionBranch()
 *
 * These helpers provide authenticated API access for Claude Code features.
 */

import type { OAuthTokens } from './types';
import { getStoredOAuthTokens } from './token-store';
import { getOrgUUID } from './helpers';
import { getOAuthConfig, API_BETA_HEADER, CLAUDE_CODE_SYSTEM_PROMPT } from './config';

// HTTP client interface (would be axios or similar)
interface HttpClient {
  get(url: string, config?: any): Promise<{ status: number; statusText: string; data: any }>;
  post(url: string, data: any, config?: any): Promise<{ status: number; statusText: string; data: any }>;
}

declare const httpClient: HttpClient;

/**
 * Get access token and organization UUID for API calls
 *
 * Throws if not authenticated or org not found.
 *
 * Original minified: FP()
 */
export async function getAccessTokenAndOrg(): Promise<{
  accessToken: string;
  orgUUID: string;
}> {
  const tokens = getStoredOAuthTokens();
  const accessToken = tokens?.accessToken;

  if (accessToken === undefined) {
    throw new Error(
      'Claude Code web sessions require authentication with a Claude.ai account. ' +
      'API key authentication is not sufficient. ' +
      'Please run /login to authenticate, or check your authentication status with /status.'
    );
  }

  const orgUUID = await getOrgUUID();
  if (!orgUUID) {
    throw new Error('Unable to get organization UUID');
  }

  return { accessToken, orgUUID };
}

/**
 * Build standard auth headers for API requests
 *
 * Original minified: PV()
 *
 * CRITICAL: These headers are required for OAuth token acceptance:
 * - anthropic-beta must include 'claude-code-20250219' for Sonnet/Opus
 * - anthropic-dangerous-direct-browser-access must be 'true'
 * - x-app must be 'cli'
 * - user-agent must match Claude CLI format
 */
export function getAuthHeaders(accessToken: string): Record<string, string> {
  return {
    'accept': 'application/json',
    'authorization': `Bearer ${accessToken}`,
    'content-type': 'application/json',
    'anthropic-version': '2023-06-01',
    'anthropic-beta': API_BETA_HEADER,
    'anthropic-dangerous-direct-browser-access': 'true',
    'user-agent': 'claude-cli/2.0.72 (external, cli)',
    'x-app': 'cli',
  };
}

/**
 * Build message body for API requests
 *
 * CRITICAL: Non-Haiku models require a specific system prompt
 * for OAuth tokens to be accepted.
 */
export function buildMessageBody(
  model: string,
  messages: Array<{ role: string; content: string }>,
  options: {
    maxTokens?: number;
    stream?: boolean;
  } = {}
): Record<string, any> {
  const isHaiku = model.includes('haiku');

  const body: Record<string, any> = {
    model,
    max_tokens: options.maxTokens ?? 4096,
    messages: messages.map(msg => ({
      role: msg.role,
      content: [{ type: 'text', text: msg.content, cache_control: { type: 'ephemeral' } }],
    })),
  };

  // Sonnet/Opus require the Claude Code system prompt for OAuth acceptance
  if (!isHaiku) {
    body.system = [{
      type: 'text',
      text: CLAUDE_CODE_SYSTEM_PROMPT,
      cache_control: { type: 'ephemeral' },
    }];
  }

  if (options.stream) {
    body.stream = true;
  }

  return body;
}

/**
 * Get the messages API endpoint with required query param
 */
export function getMessagesEndpoint(): string {
  const config = getOAuthConfig();
  return `${config.BASE_API_URL}/v1/messages?beta=true`;
}

/**
 * Session status type
 */
export type SessionStatus = 'active' | 'completed' | 'failed' | string;

/**
 * Code session data
 */
export interface CodeSession {
  id: string;
  title: string;
  description: string;
  status: SessionStatus;
  repo: {
    name: string;
    owner: { login: string };
    default_branch?: string;
  } | null;
  turns: any[];
  created_at: string;
  updated_at: string;
}

/**
 * Parse git repository URL to owner/repo format
 */
function parseGitUrl(url: string): string | null {
  // Extract owner/repo from various git URL formats
  const patterns = [
    /github\.com[:/]([^/]+\/[^/.]+)/,
    /gitlab\.com[:/]([^/]+\/[^/.]+)/,
    /bitbucket\.org[:/]([^/]+\/[^/.]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Fetch all code sessions for the current user
 *
 * Original minified: CcB()
 */
export async function fetchCodeSessions(): Promise<CodeSession[]> {
  const { accessToken, orgUUID } = await getAccessTokenAndOrg();
  const config = getOAuthConfig();
  const url = `${config.BASE_API_URL}/v1/sessions`;

  try {
    const headers = {
      ...getAuthHeaders(accessToken),
      'x-organization-uuid': orgUUID,
    };

    const response = await httpClient.get(url, { headers });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch code sessions: ${response.statusText}`);
    }

    // Map API response to CodeSession format
    return response.data.data.map((session: any) => {
      // Find git repository source
      const gitSource = session.session_context.sources.find(
        (s: any) => s.type === 'git_repository'
      );

      let repo: CodeSession['repo'] = null;
      if (gitSource?.url) {
        const ownerRepo = parseGitUrl(gitSource.url);
        if (ownerRepo) {
          const [owner, name] = ownerRepo.split('/');
          if (owner && name) {
            repo = {
              name,
              owner: { login: owner },
              default_branch: gitSource.revision || undefined,
            };
          }
        }
      }

      return {
        id: session.id,
        title: session.title || 'Untitled',
        description: '',
        status: session.session_status,
        repo,
        turns: [],
        created_at: session.created_at,
        updated_at: session.updated_at,
      };
    });
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    // Log error
    throw error;
  }
}

/**
 * Fetch a specific session by ID
 *
 * Original minified: SjA()
 */
export async function fetchSessionById(sessionId: string): Promise<any> {
  const { accessToken, orgUUID } = await getAccessTokenAndOrg();
  const config = getOAuthConfig();
  const url = `${config.BASE_API_URL}/v1/sessions/${sessionId}`;

  const headers = {
    ...getAuthHeaders(accessToken),
    'x-organization-uuid': orgUUID,
  };

  const response = await httpClient.get(url, {
    headers,
    timeout: 15000,
    validateStatus: (status: number) => status < 500,
  });

  if (response.status !== 200) {
    const errorMessage = response.data?.error?.message;

    if (response.status === 404) {
      throw new Error(`Session not found: ${sessionId}`);
    }
    if (response.status === 401) {
      throw new Error('Session expired. Please run /login to sign in again.');
    }
    throw new Error(
      errorMessage || `Failed to fetch session: ${response.status} ${response.statusText}`
    );
  }

  return response.data;
}

/**
 * Get the first branch from a session's git outcomes
 *
 * Original minified: G80()
 */
export function getSessionBranch(sessionData: any): string | undefined {
  return sessionData.session_context.outcomes
    ?.find((o: any) => o.type === 'git_repository')
    ?.git_info?.branches[0];
}

/**
 * Send an event to a session
 */
export async function sendSessionEvent(
  sessionId: string,
  content: string
): Promise<boolean> {
  try {
    const { accessToken, orgUUID } = await getAccessTokenAndOrg();
    const config = getOAuthConfig();
    const url = `${config.BASE_API_URL}/v1/sessions/${sessionId}/events`;

    const headers = {
      ...getAuthHeaders(accessToken),
      'x-organization-uuid': orgUUID,
    };

    const payload = {
      events: [
        {
          uuid: crypto.randomUUID(),
          session_id: sessionId,
          type: 'user',
          parent_tool_use_id: null,
          message: { role: 'user', content },
        },
      ],
    };

    const response = await httpClient.post(url, payload, {
      headers,
      validateStatus: (status: number) => status < 500,
    });

    return response.status === 200 || response.status === 201;
  } catch {
    return false;
  }
}
