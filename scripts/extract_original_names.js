#!/usr/bin/env node
/**
 * Extract original function/class/variable names from library source
 * Generate structure signatures for matching against minified code
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CACHE_DIR = path.join(__dirname, '..', 'lib_signatures', 'npm_cache');
const OUTPUT_DIR = path.join(__dirname, '..', 'lib_signatures', 'names');

// Detected versions from signature matching
const DETECTED_VERSIONS = {
  'react-dom': '19.3.0-canary-fd524fe0-20251121',
  'lodash': '4.17.21',
  'highlight.js': '11.10.0',
  'undici': '7.16.0',
  'zod': '4.3.0-canary.20251222T061611',
  '@grpc/grpc-js': '1.14.1',
  '@modelcontextprotocol/sdk': '1.24.3',
  '@azure/msal-common': '15.13.3',
  'node-forge': '1.3.2',
  '@aws-sdk/client-s3': '3.956.0',
  'google-auth-library': '10.5.0',
  'ws': '8.18.3',
  'tslib': '2.8.0',
  'commander': '14.0.1',
  'marked': '17.0.0',
  'parse5': '7.3.0',
  'protobufjs': '8.1.6-experimental',
  'localforage': '1.10.0',
  'got': '14.6.4',
  '@opentelemetry/semantic-conventions': '1.38.0',
  '@opentelemetry/sdk-metrics': '2.1.0',
  '@opentelemetry/sdk-trace-base': '2.1.0',
  '@smithy/smithy-client': '4.10.2',
  'follow-redirects': '1.15.10',
  'uri-js': '4.4.0',
  'qrcode': '1.5.4',
  'web-tree-sitter': '0.25.10',
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Simple JS parser to extract declarations
function extractDeclarations(content, filePath) {
  const declarations = [];

  // Function declarations: function name(params) { ... }
  const funcDeclRegex = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(([^)]*)\)\s*\{/g;
  let match;
  while ((match = funcDeclRegex.exec(content)) !== null) {
    const name = match[1];
    const params = match[2].split(',').map(p => p.trim()).filter(p => p);
    const bodyStart = match.index + match[0].length;
    const bodyEnd = findMatchingBrace(content, bodyStart - 1);
    const body = content.slice(bodyStart, bodyEnd);

    declarations.push({
      type: 'function',
      name,
      params: params.length,
      paramNames: params,
      bodyLength: body.length,
      signature: generateSignature(name, params, body),
      strings: extractStringsFromBody(body),
      file: filePath,
    });
  }

  // Arrow functions assigned to const/let/var: const name = (params) => { ... }
  const arrowRegex = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s*)?\(([^)]*)\)\s*=>/g;
  while ((match = arrowRegex.exec(content)) !== null) {
    const name = match[1];
    const params = match[2].split(',').map(p => p.trim()).filter(p => p);

    declarations.push({
      type: 'arrow',
      name,
      params: params.length,
      paramNames: params,
      file: filePath,
    });
  }

  // Class declarations: class Name { ... }
  const classRegex = /class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?:extends\s+[a-zA-Z_$][a-zA-Z0-9_$.]*)?\s*\{/g;
  while ((match = classRegex.exec(content)) !== null) {
    const name = match[1];
    const bodyStart = match.index + match[0].length;
    const bodyEnd = findMatchingBrace(content, bodyStart - 1);
    const body = content.slice(bodyStart, bodyEnd);

    // Extract methods from class body
    const methods = extractClassMethods(body);

    declarations.push({
      type: 'class',
      name,
      methods: methods.map(m => m.name),
      methodCount: methods.length,
      file: filePath,
    });

    // Add methods as separate declarations
    for (const method of methods) {
      declarations.push({
        type: 'method',
        name: `${name}.${method.name}`,
        className: name,
        methodName: method.name,
        params: method.params,
        file: filePath,
      });
    }
  }

  // Exports: module.exports.name = or exports.name =
  const exportRegex = /(?:module\.)?exports\.([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/g;
  while ((match = exportRegex.exec(content)) !== null) {
    declarations.push({
      type: 'export',
      name: match[1],
      file: filePath,
    });
  }

  // Named exports: export { name1, name2 }
  const namedExportRegex = /export\s*\{([^}]+)\}/g;
  while ((match = namedExportRegex.exec(content)) !== null) {
    const names = match[1].split(',').map(n => n.trim().split(/\s+as\s+/)[0].trim());
    for (const name of names) {
      if (name && /^[a-zA-Z_$]/.test(name)) {
        declarations.push({
          type: 'export',
          name,
          file: filePath,
        });
      }
    }
  }

  return declarations;
}

function findMatchingBrace(content, start) {
  let depth = 1;
  let i = start + 1;
  while (i < content.length && depth > 0) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') depth--;
    i++;
  }
  return i - 1;
}

function extractClassMethods(classBody) {
  const methods = [];
  // Match method definitions: methodName(params) { or async methodName(params) {
  const methodRegex = /(?:async\s+)?([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(([^)]*)\)\s*\{/g;
  let match;
  while ((match = methodRegex.exec(classBody)) !== null) {
    const name = match[1];
    if (name !== 'constructor' && name !== 'if' && name !== 'for' && name !== 'while') {
      const params = match[2].split(',').map(p => p.trim()).filter(p => p);
      methods.push({ name, params: params.length });
    }
  }
  return methods;
}

function generateSignature(name, params, body) {
  // Create a structural signature for matching
  const normalized = body
    .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove block comments
    .replace(/\/\/.*/g, '')             // Remove line comments
    .replace(/\s+/g, ' ')               // Normalize whitespace
    .trim();

  const hash = crypto.createHash('md5').update(normalized).digest('hex').slice(0, 8);
  return `${params.length}p_${normalized.length}c_${hash}`;
}

function extractStringsFromBody(body) {
  const strings = [];
  const stringRegex = /(['"`])(?:(?!\1)[^\\]|\\.)*\1/g;
  let match;
  while ((match = stringRegex.exec(body)) !== null) {
    const str = match[0].slice(1, -1);
    if (str.length >= 4 && str.length <= 100) {
      strings.push(str);
    }
  }
  return strings.slice(0, 20);  // Keep first 20 unique strings
}

function processLibrary(libName, version) {
  const pkgDir = path.join(CACHE_DIR, libName.replace('/', '__'), version, 'package');
  if (!fs.existsSync(pkgDir)) {
    console.log(`  Package not found: ${pkgDir}`);
    return null;
  }

  const allDeclarations = [];

  function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== 'test' && entry.name !== 'tests') {
        processDir(fullPath);
      } else if (entry.isFile() && /\.(js|mjs|cjs)$/.test(entry.name) && !entry.name.includes('.min.')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const relPath = path.relative(pkgDir, fullPath);
          const declarations = extractDeclarations(content, relPath);
          allDeclarations.push(...declarations);
        } catch (e) {
          // Skip files that can't be read
        }
      }
    }
  }

  processDir(pkgDir);

  return {
    library: libName,
    version,
    declarations: allDeclarations,
    stats: {
      functions: allDeclarations.filter(d => d.type === 'function').length,
      classes: allDeclarations.filter(d => d.type === 'class').length,
      methods: allDeclarations.filter(d => d.type === 'method').length,
      exports: allDeclarations.filter(d => d.type === 'export').length,
    }
  };
}

function main() {
  ensureDir(OUTPUT_DIR);

  console.log('Extracting original names from library sources...\n');

  const allLibraries = {};

  for (const [libName, version] of Object.entries(DETECTED_VERSIONS)) {
    console.log(`Processing ${libName}@${version}...`);

    const result = processLibrary(libName, version);
    if (result) {
      allLibraries[libName] = result;
      console.log(`  Found ${result.declarations.length} declarations`);
      console.log(`    Functions: ${result.stats.functions}, Classes: ${result.stats.classes}, Methods: ${result.stats.methods}`);
    }
  }

  // Save all declarations
  const outputPath = path.join(OUTPUT_DIR, 'all_declarations.json');
  fs.writeFileSync(outputPath, JSON.stringify(allLibraries, null, 2));
  console.log(`\nSaved declarations to ${outputPath}`);

  // Create a quick lookup index by signature/strings
  const signatureIndex = {};
  const stringIndex = {};

  for (const [libName, libData] of Object.entries(allLibraries)) {
    for (const decl of libData.declarations) {
      if (decl.signature) {
        signatureIndex[decl.signature] = signatureIndex[decl.signature] || [];
        signatureIndex[decl.signature].push({
          library: libName,
          name: decl.name,
          type: decl.type,
          file: decl.file,
        });
      }
      if (decl.strings) {
        for (const str of decl.strings) {
          stringIndex[str] = stringIndex[str] || [];
          stringIndex[str].push({
            library: libName,
            name: decl.name,
            type: decl.type,
          });
        }
      }
    }
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'signature_index.json'), JSON.stringify(signatureIndex, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'string_index.json'), JSON.stringify(stringIndex, null, 2));

  // Summary
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('Summary');
  console.log('═══════════════════════════════════════════════════════════════\n');

  let totalDeclarations = 0;
  for (const [libName, libData] of Object.entries(allLibraries)) {
    console.log(`${libName}: ${libData.declarations.length} declarations`);
    totalDeclarations += libData.declarations.length;
  }
  console.log(`\nTotal: ${totalDeclarations} original names extracted`);
  console.log(`Signature index: ${Object.keys(signatureIndex).length} unique signatures`);
  console.log(`String index: ${Object.keys(stringIndex).length} unique strings`);
}

main();
