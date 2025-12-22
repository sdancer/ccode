// Module: TZB
// Type: L
// Lines: 187766-187832
//
var TZB = L(()=>{
    renderElement();
    performWork();
    jZB();
    CYA();
});
function SZB(A, Q, B) {
    return `
Web page content:
---
${A}
---

${Q}

${B ? "Provide a concise response based on the content above. Include relevant details, code examples, and documentation excerpts as needed." : `Provide a concise response based only on the content above. In your response:
 - Enforce a strict 125-character maximum for quotes from any source document. Open Source Software is ok as long as we respect the license.
 - Use quotation marks for exact language from articles; any language outside of the quotation should never be word-for-word the same.
 - You are not a lawyer and never comment on the legality of your own prompts and responses.
 - Never produce or reproduce exact song lyrics.`}
`;
}
var DI = "WebFetch", PZB = `
- Fetches content from a specified URL and processes it using an AI model
- Takes a URL and a prompt as input
- Fetches the URL content, converts HTML to markdown
- Processes the content with the prompt using a small, fast model
- Returns the model's response about the content
- Use this tool when you need to retrieve and analyze web content

Usage notes:
  - IMPORTANT: If an MCP-provided web fetch tool is available, prefer using that tool instead of this one, as it may have fewer restrictions.
  - The URL must be a fully-formed valid URL
  - HTTP URLs will be automatically upgraded to HTTPS
  - The prompt should describe what information you want to extract from the page
  - This tool is read-only and does not modify any files
  - Results may be summarized if the content is very large
  - Includes a self-cleaning 15-minute cache for faster responses when repeatedly accessing the same URL
  - When a URL redirects to a different host, the tool will inform you and provide the redirect URL in a special format. You should then make a new WebFetch request with the redirect URL to fetch the content.
`;
var S8 = "Edit";
function vYA() {
    return l4() === "firstParty";
}
function KeA(A) {
    let Q = A.startsWith(".") ? A.slice(1) : A;
    return w_8.has(Q.toLowerCase());
}
async function xZB(A) {
    let Q = vA(), G = Q.statSync(A).size;
    if (G === 0) throw Error(`PDF file is empty: ${A}`);
    if (G > yZB) throw Error(`PDF file size (${FI(G)}) exceeds maximum allowed size (${FI(yZB)}). PDF files must be less than 32MB.`);
    let Y = Q.readFileBytesSync(A).toString("base64");
    return {
        type: "pdf",
        file: {
            filePath: A,
            base64: Y,
            originalSize: G
        }
    };
}
var w_8, yZB = 33554432;
