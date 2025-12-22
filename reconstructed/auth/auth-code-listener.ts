/**
 * Reconstructed from Claude Code bundle - Auth Code Listener
 *
 * Source module: jPA (lines 323421-323535)
 *
 * Original minified class: WZ0
 *
 * This class creates a local HTTP server to receive OAuth callbacks.
 * It listens for the authorization code redirect from the OAuth provider.
 */

import * as http from 'http';
import type { ServerResponse, IncomingMessage } from 'http';
import { getOAuthConfig } from './config';
import { hasInferenceScope } from './helpers';

/**
 * Local HTTP server that listens for OAuth callback redirects
 *
 * Original minified: WZ0
 */
export class AuthCodeListener {
  private localServer: http.Server;
  private port: number = 0;
  private promiseResolver: ((code: string) => void) | null = null;
  private promiseRejecter: ((error: Error) => void) | null = null;
  private expectedState: string | null = null;
  private pendingResponse: ServerResponse | null = null;
  private callbackPath: string;

  constructor(callbackPath: string = '/callback') {
    this.localServer = http.createServer();
    this.callbackPath = callbackPath;
  }

  /**
   * Start the local server on a random available port
   */
  async start(preferredPort?: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.localServer.once('error', (err: Error) => {
        reject(new Error(`Failed to start OAuth callback server: ${err.message}`));
      });

      this.localServer.listen(preferredPort ?? 0, 'localhost', () => {
        const address = this.localServer.address() as { port: number };
        this.port = address.port;
        resolve(this.port);
      });
    });
  }

  /**
   * Get the port the server is listening on
   */
  getPort(): number {
    return this.port;
  }

  /**
   * Check if there's a pending response waiting to be sent
   */
  hasPendingResponse(): boolean {
    return this.pendingResponse !== null;
  }

  /**
   * Wait for the authorization code to be received
   *
   * @param expectedState - The state parameter to validate
   * @param onReady - Callback invoked when the server is ready
   */
  async waitForAuthorization(expectedState: string, onReady: () => void): Promise<string> {
    return new Promise((resolve, reject) => {
      this.promiseResolver = resolve;
      this.promiseRejecter = reject;
      this.expectedState = expectedState;
      this.startLocalListener(onReady);
    });
  }

  /**
   * Handle successful redirect (send user to success page)
   */
  handleSuccessRedirect(
    scopes: string[],
    customHandler?: (res: ServerResponse, scopes: string[]) => void
  ): void {
    if (!this.pendingResponse) return;

    if (customHandler) {
      customHandler(this.pendingResponse, scopes);
      this.pendingResponse = null;
      // telemetry: tengu_oauth_automatic_redirect with custom_handler: true
      return;
    }

    const config = getOAuthConfig();
    const successUrl = hasInferenceScope(scopes)
      ? config.CLAUDEAI_SUCCESS_URL
      : config.CONSOLE_SUCCESS_URL;

    this.pendingResponse.writeHead(302, { Location: successUrl });
    this.pendingResponse.end();
    this.pendingResponse = null;
    // telemetry: tengu_oauth_automatic_redirect
  }

  /**
   * Handle error redirect
   */
  handleErrorRedirect(): void {
    if (!this.pendingResponse) return;

    const config = getOAuthConfig();
    this.pendingResponse.writeHead(302, { Location: config.CLAUDEAI_SUCCESS_URL });
    this.pendingResponse.end();
    this.pendingResponse = null;
    // telemetry: tengu_oauth_automatic_redirect_error
  }

  /**
   * Start listening for requests
   */
  private startLocalListener(onReady: () => void): void {
    this.localServer.on('request', this.handleRedirect.bind(this));
    this.localServer.on('error', this.handleError.bind(this));
    onReady();
  }

  /**
   * Handle incoming HTTP requests
   */
  private handleRedirect(req: IncomingMessage, res: ServerResponse): void {
    const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);

    if (url.pathname !== this.callbackPath) {
      res.writeHead(404);
      res.end();
      return;
    }

    const code = url.searchParams.get('code') ?? undefined;
    const state = url.searchParams.get('state') ?? undefined;

    this.validateAndRespond(code, state, res);
  }

  /**
   * Validate the callback parameters and respond
   */
  private validateAndRespond(
    code: string | undefined,
    state: string | undefined,
    res: ServerResponse
  ): void {
    if (!code) {
      res.writeHead(400);
      res.end('Authorization code not found');
      this.reject(new Error('No authorization code received'));
      return;
    }

    if (state !== this.expectedState) {
      res.writeHead(400);
      res.end('Invalid state parameter');
      this.reject(new Error('Invalid state parameter'));
      return;
    }

    // Store response for later redirect
    this.pendingResponse = res;
    this.resolve(code);
  }

  /**
   * Handle server errors
   */
  private handleError(err: Error): void {
    // Log error
    this.close();
    this.reject(err);
  }

  /**
   * Resolve the promise with the authorization code
   */
  private resolve(code: string): void {
    if (this.promiseResolver) {
      this.promiseResolver(code);
      this.promiseResolver = null;
      this.promiseRejecter = null;
    }
  }

  /**
   * Reject the promise with an error
   */
  private reject(err: Error): void {
    if (this.promiseRejecter) {
      this.promiseRejecter(err);
      this.promiseResolver = null;
      this.promiseRejecter = null;
    }
  }

  /**
   * Close the server and clean up
   */
  close(): void {
    if (this.pendingResponse) {
      this.handleErrorRedirect();
    }
    if (this.localServer) {
      this.localServer.removeAllListeners();
      this.localServer.close();
    }
  }
}
