// Patch to add at the very top of formatted.js (after the shebang line)
// This intercepts all fetch calls and logs them to a file

import { appendFileSync as _appendFileSync } from 'fs';
import { join as _pathJoin } from 'path';

const _originalFetch = globalThis.fetch;
const _logFile = _pathJoin(process.env.HOME || '/tmp', '.claude_requests.log');

globalThis.fetch = async function(url, options = {}) {
  const timestamp = new Date().toISOString();
  const method = options.method || 'GET';
  const headers = options.headers || {};

  // Log request
  const logEntry = {
    timestamp,
    method,
    url: typeof url === 'string' ? url : url.toString(),
    headers: typeof headers.entries === 'function'
      ? Object.fromEntries(headers.entries())
      : headers,
    bodyPreview: options.body ? String(options.body).slice(0, 500) : null,
  };

  _appendFileSync(_logFile, JSON.stringify(logEntry) + '\n');

  // Call original fetch
  const response = await _originalFetch.apply(this, arguments);

  // Log response status
  _appendFileSync(_logFile, JSON.stringify({
    timestamp: new Date().toISOString(),
    type: 'response',
    url: logEntry.url,
    status: response.status,
    statusText: response.statusText,
  }) + '\n');

  return response;
};

console.error(`[PATCH] Fetch logging enabled -> ${_logFile}`);
