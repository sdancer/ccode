#!/bin/bash
# Apply fetch logging patch to formatted.js (or any Claude Code bundle)
#
# Usage: ./apply_fetch_patch.sh [input.js] [output.js]

INPUT="${1:-../formatted.js}"
OUTPUT="${2:-../formatted_logged.js}"
PATCH_FILE="$(dirname "$0")/fetch_logger_patch.js"

if [ ! -f "$INPUT" ]; then
  echo "Error: Input file not found: $INPUT"
  exit 1
fi

if [ ! -f "$PATCH_FILE" ]; then
  echo "Error: Patch file not found: $PATCH_FILE"
  exit 1
fi

echo "Applying fetch logging patch..."
echo "  Input:  $INPUT"
echo "  Output: $OUTPUT"

# Get first line (shebang) and rest of file
head -1 "$INPUT" > "$OUTPUT"
cat "$PATCH_FILE" >> "$OUTPUT"
tail -n +2 "$INPUT" >> "$OUTPUT"

echo "Done! Patched file: $OUTPUT"
echo ""
echo "Run with: node $OUTPUT"
echo "Logs go to: ~/.claude_requests.log"
