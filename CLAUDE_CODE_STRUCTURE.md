# Claude Code Application Structure

Analysis of the Claude Code CLI webpack bundle, identifying application modules vs third-party libraries.

## Bundle Statistics

- **Total modules**: 4,463
  - L (lazy loaders): 1,912
  - U (CommonJS wrappers): 2,551
- **Identified third-party libraries**: 34 (~3% of modules)
- **Application code**: ~97% of modules

## Application Module Categories

### 1. API Client (97 modules, ~27k lines)
Core Anthropic API integration for Claude models.

| Module | Lines | Description |
|--------|-------|-------------|
| `UE9` | 2,373 | Main API message handling |
| `sv` | 1,074 | API response processing |
| `ME9` | 1,015 | Message creation |
| `qr` | 847 | API query with streaming, caching, retry logic |
| `eA9` | 688 | API client configuration |

Key functionality:
- `beta.messages.create()` / `beta.messages.stream()`
- Prompt caching (`cache_control`, `ephemeral`)
- Token usage tracking
- Retry with exponential backoff
- Model selection (haiku, sonnet, opus)

### 2. OAuth & Authentication (161 modules, ~38k lines)
OAuth 2.0 flow for console.anthropic.com and claude.ai.

| Module | Lines | Description |
|--------|-------|-------------|
| `$o` | 1,764 | Main OAuth flow |
| `D39` | 1,672 | Token management |
| `BJ` | 129 | OAuth endpoint configuration |
| `TxB` | 924 | MCP authentication |

Endpoints:
- `https://console.anthropic.com/oauth/authorize`
- `https://claude.ai/oauth/authorize`
- `https://api.anthropic.com/api/oauth/claude_cli/create_api_key`

### 3. Terminal UI (149 modules, ~22k lines)
React/Ink-based terminal rendering.

| Module | Lines | Description |
|--------|-------|-------------|
| `tN0` | 807 | Main terminal renderer |
| `ee2` | 756 | Box/layout components |
| `GJ9` | 605 | Text rendering |
| `psA` | 560 | Input handling |
| `ci2` | 556 | Spinner/progress |

### 4. Permissions System (149 modules, ~32k lines)
Tool permission management and sandboxing.

| Module | Lines | Description |
|--------|-------|-------------|
| `yO2` | 3,051 | Core permission logic |
| `Go` | 1,052 | Permission rules |
| `C5A` | 962 | Sandbox enforcement |
| `E_0` | 240 | Tool permission prompts |
| `_FA` | 524 | Permission mode (default, strict, bypass) |

Permission modes:
- `allow` - Permit tool execution
- `deny` - Block with message
- `ask` - Prompt user

### 5. Tools (75 modules, ~15k lines)
Built-in tool implementations.

| Module | Lines | Description |
|--------|-------|-------------|
| `AV9` | 1,248 | Tool registry |
| `hq0` | 694 | Tool execution |
| `dH` | 559 | Bash tool |
| `FX9` | 514 | Edit tool |
| `lH` | 449 | Read tool |
| `EA9` | 415 | Glob tool |
| `zm` | 365 | Grep tool |
| `IPA` | 360 | Write tool |

Tool structure:
- `name` - Tool identifier
- `description()` - Dynamic description
- `inputJSONSchema` - Input validation
- `call()` - Execution function

### 6. MCP (Model Context Protocol) (39 modules, ~7k lines)
External tool server integration.

| Module | Lines | Description |
|--------|-------|-------------|
| `RI9` | 1,113 | MCP client |
| `LM0` | 684 | MCP server management |
| `$dB` | 505 | MCP protocol handling |
| `z4` | 150 | MCP CLI integration |

MCP features:
- Server discovery and connection
- Tool/resource proxying
- Session management

### 7. Settings & Configuration (62 modules, ~8k lines)
User preferences and project configuration.

| Module | Lines | Description |
|--------|-------|-------------|
| `UI9` | 715 | Settings storage |
| `y21` | 475 | Config loading |
| `_BA` | 424 | Project settings |
| `zJ1` | 349 | CLAUDE.md parsing |

Config files:
- `~/.claude/.config.json` - Global config
- `.claude/settings.json` - Project settings
- `CLAUDE.md` - Project instructions

### 8. Hooks (24 modules, ~2k lines)
Pre/post tool execution hooks.

| Module | Lines | Description |
|--------|-------|-------------|
| `aD1` | 192 | Hook execution |
| `TTA` | 184 | Hook registry |
| `pJ9` | 151 | Pre-tool hooks |
| `nz2` | 136 | Post-tool hooks |

Hook types:
- `pre_tool_call` - Before tool execution
- `post_tool_call` - After tool execution
- `user_prompt_submit` - Message interception

### 9. Agents (42 modules, ~5k lines)
Subagent spawning and management.

| Module | Lines | Description |
|--------|-------|-------------|
| `Ke2` | 350 | Agent spawning |
| `He2` | 299 | Agent communication |
| `fI9` | 288 | Background agents |
| `DI9` | 279 | Agent task tracking |

Agent types:
- `general-purpose` - Full tool access
- `Explore` - Codebase exploration
- `Plan` - Implementation planning

### 10. Streaming (35 modules, ~6k lines)
Response streaming and event handling.

| Module | Lines | Description |
|--------|-------|-------------|
| `SBB` | 1,695 | Stream processing |
| `YQB` | 523 | Event handling |
| `YGB` | 467 | Content blocks |

Event types:
- `message_start` - Message begins
- `content_block_start/delta/stop` - Streaming content
- `message_delta` - Usage updates

### 11. Git Integration (21 modules, ~2k lines)
Git operations and diff handling.

| Module | Lines | Description |
|--------|-------|-------------|
| `xw` | 312 | Git commands |
| `EL` | 265 | Diff parsing |
| `LA9` | 209 | Commit handling |
| `bD9` | 183 | Branch management |

### 12. Slash Commands (20 modules, ~2k lines)
Built-in command handling.

| Module | Lines | Description |
|--------|-------|-------------|
| `nc0` | 203 | Command registry |
| `kK1` | 190 | Command execution |
| `zF1` | 123 | /help command |

Commands: `/help`, `/clear`, `/compact`, `/config`, etc.

### 13. Cost Tracking (9 modules, ~1k lines)
Token usage and cost calculation.

| Module | Lines | Description |
|--------|-------|-------------|
| `j69` | 304 | Cost calculation |
| `DL0` | 187 | Usage aggregation |

## Third-Party Libraries (34 identified)

### Core Dependencies
| Library | Modules | Description |
|---------|---------|-------------|
| zod | 11 | Schema validation |
| @anthropic-ai/sdk | 5 | Anthropic API client |
| undici | 10 | HTTP client |
| tslib | 4 | TypeScript helpers |

### UI/Rendering
| Library | Modules | Description |
|---------|---------|-------------|
| react | 1 | React runtime |
| react-dom | 1 | React DOM |
| react-devtools | 1 | DevTools |
| highlight.js | 19 | Syntax highlighting |

### Parsing/Processing
| Library | Modules | Description |
|---------|---------|-------------|
| parse5 | 4 | HTML parsing |
| @xmldom/xmldom | 1 | XML/HTML entities |
| marked | 1 | Markdown parser |
| web-tree-sitter | 2 | Tree-sitter bindings |

### Networking
| Library | Modules | Description |
|---------|---------|-------------|
| ws | 4 | WebSocket |
| follow-redirects | 1 | HTTP redirects |
| got | 1 | HTTP/2 handler |

### Cloud/API
| Library | Modules | Description |
|---------|---------|-------------|
| @aws-sdk/* | 5 | AWS SDK |
| @smithy/* | 3 | AWS Smithy |
| @grpc/grpc-js | 5 | gRPC client |
| google-auth-library | 1 | Google OAuth |

### Observability
| Library | Modules | Description |
|---------|---------|-------------|
| @opentelemetry/* | 6 | OpenTelemetry |
| protobufjs | 2 | Protocol Buffers |

### Utilities
| Library | Modules | Description |
|---------|---------|-------------|
| lodash | 1 | Utility functions |
| commander | 1 | CLI framework |
| node-forge | 3 | Crypto/TLS |
| mime-db | 1 | MIME types |
| qrcode | 3 | QR generation |

## Key Architecture Patterns

1. **Lazy Loading**: L modules wrap initialization, only loading when first called
2. **Module Isolation**: U modules provide CommonJS isolation
3. **Streaming-First**: API responses are streamed for real-time output
4. **Permission-Gated**: All tool calls go through permission system
5. **Hook-Extensible**: Pre/post hooks allow user customization
6. **MCP-Compatible**: External tools via Model Context Protocol
