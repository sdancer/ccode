# Library Sections Map

Position mapping of identified libraries in the webpack bundle (by line number).

## Section Overview

| Line Range | Libraries Found |
|------------|----------------|
| 0k - 50k | highlight.js, react, mime-db |
| 50k - 100k | follow-redirects, got, @smithy/*, undici |
| 100k - 150k | @aws-sdk/client-s3, undici, @opentelemetry/*, react-dom, ws, react-devtools |
| 150k - 200k | ws, color-convert, tslib |
| 200k - 250k | tr46, bignumber.js, google-auth-library |
| 250k - 300k | node-forge |
| 300k - 350k | @opentelemetry/otlp-transformer, @opentelemetry/sdk-metrics, parse5, protobufjs, @grpc/grpc-js |
| 350k - 400k | @grpc/grpc-js, @opentelemetry/sdk-trace-base, @xmldom/xmldom |
| 400k - 450k | domino, uri-js, localforage, lodash |
| 450k - 500k | qrcode |
| 500k - 530k | commander |

## Detailed Library Positions

### Early Section (0k - 100k lines)

| Library | Avg Line | Modules | Line Range | Description |
|---------|----------|---------|------------|-------------|
| highlight.js | 23k | 2 | 17k-29k | Syntax highlighting |
| react | 44k | 1 | 44k | React runtime |
| mime-db | 46k | 1 | 46k | MIME types database |
| follow-redirects | 52k | 1 | 52k | HTTP redirect handler |
| got | 66k | 1 | 66k | HTTP/2 handler |
| @smithy/middleware-endpoint | 70k | 1 | 70k | AWS endpoint middleware |
| @smithy/middleware-stack | 79k | 1 | 79k | AWS middleware stack |
| @smithy/smithy-client | 83k | 1 | 83k | Smithy HTTP client |
| undici | 76k-119k | 10 | 76k-119k | Node.js HTTP client |

### Middle Section (100k - 200k lines)

| Library | Avg Line | Modules | Line Range | Description |
|---------|----------|---------|------------|-------------|
| @aws-sdk/client-s3 | 102k | 2 | 97k-106k | AWS S3 client |
| @opentelemetry/semantic-conventions | 128k | 2 | 128k-129k | OTel attributes |
| @opentelemetry/sdk-logs | 133k | 1 | 133k | OTel logger |
| react-dom | 139k | 1 | 139k | React DOM runtime |
| ws | 152k | 4 | 151k-153k | WebSocket library |
| react-devtools | 153k | 1 | 153k | React DevTools backend |
| color-convert | 175k | 1 | 175k | Color conversion |
| tslib | 189k | 4 | 11k-357k | TypeScript helpers (scattered) |

### Middle-Late Section (200k - 350k lines)

| Library | Avg Line | Modules | Line Range | Description |
|---------|----------|---------|------------|-------------|
| tr46 | 201k | 1 | 201k | IDNA mapping (9189 lines!) |
| bignumber.js | 215k | 1 | 215k | BigNumber arithmetic |
| google-auth-library | 218k | 1 | 218k | Google OAuth2 client |
| node-forge | 289k | 3 | 283k-293k | Crypto/TLS/PKI |
| @opentelemetry/otlp-transformer | 328k | 1 | 328k | OTel protobuf (10990 lines!) |
| @opentelemetry/sdk-metrics | 333k | 2 | 326k-340k | OTel metrics |
| parse5 | 334k | 4 | 308k-406k | HTML5 parser |
| protobufjs | 348k | 2 | 348k-349k | Protocol Buffers |
| @grpc/grpc-js | 350k | 5 | 343k-354k | gRPC client |

### Late Section (350k - 450k lines)

| Library | Avg Line | Modules | Line Range | Description |
|---------|----------|---------|------------|-------------|
| @opentelemetry/sdk-trace-base | 363k | 1 | 363k | OTel tracing |
| @xmldom/xmldom | 367k | 1 | 367k | XML/HTML entities |
| domino | 403k | 1 | 403k | DOM elements |
| uri-js | 415k | 1 | 415k | URI parser |
| localforage | 442k | 1 | 442k | IndexedDB wrapper |
| lodash | 454k | 1 | 454k | Lodash utilities (5253 lines) |

### Final Section (450k - 530k lines)

| Library | Avg Line | Modules | Line Range | Description |
|---------|----------|---------|------------|-------------|
| qrcode | 500k | 3 | 499k-500k | QR code generator |
| commander | 526k | 1 | 526k | CLI framework (1128 lines) |

## Largest Modules (by line count)

These are almost certainly third-party libraries:

| Module | Lines | Library | Description |
|--------|-------|---------|-------------|
| j9B | 12,414 | react-devtools | React DevTools backend |
| s51 | 10,990 | @opentelemetry/otlp-transformer | OTel protobuf encoding |
| yDB | 9,189 | tr46 | IDNA/punycode mapping tables |
| TBB | 8,018 | react-dom | React DOM runtime |
| YX1 | 7,209 | parse5 | HTML5 parser |
| ha0 | 6,715 | highlight.js | Mathematica symbols |
| bNQ | 5,996 | @aws-sdk/client-s3 | S3 commands |
| Ys2 | 5,253 | lodash | Lodash utilities |
| ht0 | 4,297 | mime-db | MIME types database |
| K50 | 2,195 | node-forge | TLS implementation |

## Key Observations

1. **No clear SDK vs app-code separation** - Libraries are scattered throughout the entire file (1-5% identification rate across all positions)

2. **Module SIZE is the best heuristic** - Large modules (>1000 lines) are almost always third-party libraries

3. **Some libraries are clustered**:
   - OpenTelemetry: 128k-363k (6 modules)
   - AWS SDK/Smithy: 70k-106k (5 modules)
   - undici: 76k-119k (10 modules)
   - @grpc/grpc-js: 343k-354k (5 modules)

4. **Some libraries are scattered**:
   - tslib: 11k-357k (TypeScript helpers everywhere)
   - parse5: 308k-406k (wide range)

5. **Unidentified modules** - ~95% of modules remain unidentified, likely application-specific code or less common libraries

## Statistics

- **Total U modules**: 2,551
- **Identified**: 65 modules (2.5%)
- **Unidentified**: 2,486 modules (97.5%)
- **Libraries found**: 34 unique libraries
