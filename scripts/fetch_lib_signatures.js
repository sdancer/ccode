#!/usr/bin/env node
/**
 * Fetch npm packages and generate signatures for matching
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const LIBS_DIR = path.join(__dirname, '..', 'lib_signatures');
const CACHE_DIR = path.join(LIBS_DIR, 'npm_cache');

// Libraries we've identified in the bundle
const LIBRARIES = [
  'undici',
  'zod',
  '@opentelemetry/sdk-node',
  '@opentelemetry/sdk-metrics',
  '@opentelemetry/sdk-trace-base',
  '@opentelemetry/sdk-logs',
  '@opentelemetry/semantic-conventions',
  '@modelcontextprotocol/sdk',
  '@azure/msal-common',
  '@aws-sdk/client-s3',
  '@aws-sdk/node-http-handler',
  '@smithy/smithy-client',
  '@grpc/grpc-js',
  'ws',
  'qrcode',
  'highlight.js',
  'react',
  'react-dom',
  'commander',
  'lodash',
  'node-forge',
  'protobufjs',
  'parse5',
  'marked',
  'localforage',
  'got',
  'follow-redirects',
  'mime-db',
  'tr46',
  'uri-js',
  'color-convert',
  'bignumber.js',
  'google-auth-library',
  'tslib',
  'web-tree-sitter',
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getNpmInfo(pkg) {
  try {
    const result = execSync(`npm view ${pkg} --json 2>/dev/null`, {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024
    });
    return JSON.parse(result);
  } catch (e) {
    console.error(`  Failed to get npm info for ${pkg}`);
    return null;
  }
}

function downloadPackage(pkg, version, targetDir) {
  const pkgDir = path.join(targetDir, pkg.replace('/', '__'), version);
  if (fs.existsSync(pkgDir)) {
    return pkgDir;
  }

  ensureDir(pkgDir);
  try {
    execSync(`npm pack ${pkg}@${version} --pack-destination="${pkgDir}" 2>/dev/null`, {
      encoding: 'utf8',
      cwd: pkgDir
    });

    // Extract the tarball
    const tarballs = fs.readdirSync(pkgDir).filter(f => f.endsWith('.tgz'));
    if (tarballs.length > 0) {
      execSync(`tar -xzf "${tarballs[0]}" -C "${pkgDir}"`, { cwd: pkgDir });
    }
    return pkgDir;
  } catch (e) {
    console.error(`  Failed to download ${pkg}@${version}`);
    return null;
  }
}

function extractStrings(content) {
  // Extract string literals
  const strings = new Set();
  const stringRegex = /(['"`])(?:(?!\1)[^\\]|\\.)*\1/g;
  let match;
  while ((match = stringRegex.exec(content)) !== null) {
    const str = match[0].slice(1, -1);
    if (str.length >= 4 && str.length <= 200) {
      strings.add(str);
    }
  }
  return [...strings];
}

function extractExports(content) {
  const exports = new Set();

  // module.exports = { ... }
  const moduleExports = content.match(/module\.exports\s*=\s*\{([^}]+)\}/g);
  if (moduleExports) {
    for (const exp of moduleExports) {
      const keys = exp.match(/(\w+)\s*[,:]/g);
      if (keys) {
        keys.forEach(k => exports.add(k.replace(/[,:\s]/g, '')));
      }
    }
  }

  // exports.X =
  const namedExports = content.match(/exports\.(\w+)\s*=/g);
  if (namedExports) {
    namedExports.forEach(e => {
      const name = e.match(/exports\.(\w+)/);
      if (name) exports.add(name[1]);
    });
  }

  // export { X, Y }
  const es6Exports = content.match(/export\s*\{([^}]+)\}/g);
  if (es6Exports) {
    for (const exp of es6Exports) {
      const names = exp.match(/\b(\w+)\b/g);
      if (names) {
        names.filter(n => n !== 'export').forEach(n => exports.add(n));
      }
    }
  }

  return [...exports];
}

function hashContent(content) {
  // Normalize: remove whitespace, comments
  const normalized = content
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return crypto.createHash('sha256').update(normalized).digest('hex').slice(0, 16);
}

function generateSignature(pkgDir, pkgName) {
  const packageDir = path.join(pkgDir, 'package');
  if (!fs.existsSync(packageDir)) return null;

  const signature = {
    name: pkgName,
    version: null,
    strings: new Set(),
    exports: new Set(),
    fileHashes: {},
    uniquePatterns: [],
  };

  // Read package.json
  const pkgJsonPath = path.join(packageDir, 'package.json');
  if (fs.existsSync(pkgJsonPath)) {
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
    signature.version = pkgJson.version;
  }

  // Process all JS files
  function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        processDir(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.mjs') || entry.name.endsWith('.cjs'))) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const relPath = path.relative(packageDir, fullPath);

          // Collect strings
          extractStrings(content).forEach(s => signature.strings.add(s));

          // Collect exports
          extractExports(content).forEach(e => signature.exports.add(e));

          // File hash
          signature.fileHashes[relPath] = hashContent(content);
        } catch (e) {}
      }
    }
  }

  processDir(packageDir);

  // Convert sets to arrays
  signature.strings = [...signature.strings];
  signature.exports = [...signature.exports];

  // Find unique patterns (strings that are likely unique to this library)
  signature.uniquePatterns = signature.strings.filter(s =>
    s.includes(pkgName.split('/').pop()) ||
    s.includes('Error') ||
    s.includes('Exception') ||
    /^[A-Z][A-Z_]+$/.test(s) ||
    s.startsWith('http') ||
    s.includes('@')
  ).slice(0, 50);

  return signature;
}

async function main() {
  ensureDir(LIBS_DIR);
  ensureDir(CACHE_DIR);

  const allSignatures = {};

  console.log('Fetching library signatures...\n');

  for (const lib of LIBRARIES) {
    console.log(`Processing ${lib}...`);

    const info = getNpmInfo(lib);
    if (!info) continue;

    const distTags = info['dist-tags'] || {};
    const latest = distTags.latest || info.version;

    // Get recent versions - npm view returns versions as array of strings for single pkg
    let allVersions = [];
    if (Array.isArray(info.versions)) {
      allVersions = info.versions;
    } else if (typeof info.versions === 'object') {
      allVersions = Object.keys(info.versions);
    } else {
      allVersions = [latest];
    }

    // Filter to semver-like versions and get last 3
    const semverVersions = allVersions.filter(v => /^\d+\.\d+\.\d+/.test(v));
    const recentVersions = semverVersions.slice(-3);

    console.log(`  Latest: ${latest}, checking ${recentVersions.length} versions`);

    const libSignatures = [];

    for (const version of recentVersions) {
      console.log(`  Downloading ${version}...`);
      const pkgDir = downloadPackage(lib, version, CACHE_DIR);
      if (pkgDir) {
        const sig = generateSignature(pkgDir, lib);
        if (sig) {
          libSignatures.push(sig);
          console.log(`    ${sig.strings.length} strings, ${sig.exports.length} exports`);
        }
      }
    }

    if (libSignatures.length > 0) {
      allSignatures[lib] = libSignatures;
    }
  }

  // Save signatures
  const outputPath = path.join(LIBS_DIR, 'signatures.json');
  fs.writeFileSync(outputPath, JSON.stringify(allSignatures, null, 2));
  console.log(`\nSaved signatures to ${outputPath}`);

  // Summary
  console.log('\nSummary:');
  for (const [lib, sigs] of Object.entries(allSignatures)) {
    console.log(`  ${lib}: ${sigs.length} versions`);
  }
}

main().catch(console.error);
