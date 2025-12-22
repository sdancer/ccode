// Module: j69
// Type: L
// Lines: 480259-480563
//
var createRenderState = L(()=>{
    v2();
    ((a27 = u.strictObject({
        operation: u.literal("goToDefinition"),
        filePath: u.string().describe("The absolute or relative path to the file"),
        line: u.number().int().positive().describe("The line number (1-based, as shown in editors)"),
        character: u.number().int().positive().describe("The character offset (1-based, as shown in editors)")
    })), (o27 = u.strictObject({
        operation: u.literal("findReferences"),
        filePath: u.string().describe("The absolute or relative path to the file"),
        line: u.number().int().positive().describe("The line number (1-based, as shown in editors)"),
        character: u.number().int().positive().describe("The character offset (1-based, as shown in editors)")
    })), (r27 = u.strictObject({
        operation: u.literal("hover"),
        filePath: u.string().describe("The absolute or relative path to the file"),
        line: u.number().int().positive().describe("The line number (1-based, as shown in editors)"),
        character: u.number().int().positive().describe("The character offset (1-based, as shown in editors)")
    })), (s27 = u.strictObject({
        operation: u.literal("documentSymbol"),
        filePath: u.string().describe("The absolute or relative path to the file"),
        line: u.number().int().positive().describe("The line number (1-based, as shown in editors)"),
        character: u.number().int().positive().describe("The character offset (1-based, as shown in editors)")
    })), (t27 = u.strictObject({
        operation: u.literal("workspaceSymbol"),
        filePath: u.string().describe("The absolute or relative path to the file"),
        line: u.number().int().positive().describe("The line number (1-based, as shown in editors)"),
        character: u.number().int().positive().describe("The character offset (1-based, as shown in editors)")
    })), (e27 = u.strictObject({
        operation: u.literal("goToImplementation"),
        filePath: u.string().describe("The absolute or relative path to the file"),
        line: u.number().int().nonnegative().describe("The line number (0-indexed) in the file"),
        character: u.number().int().nonnegative().describe("The character offset (0-indexed) on the line")
    })), (_69 = u.discriminatedUnion("operation", [
        a27,
        o27,
        r27,
        s27,
        t27,
        e27
    ])));
});
import { relative as A97 } from "path";
function S69(A, Q) {
    if (!A) return (k("formatUri called with undefined URI - indicates malformed LSP server response", {
        level: "warn"
    }), "<unknown location>");
    let B = A.replace(/^file:\/\//, "");
    try {
        B = decodeURIComponent(B);
    } catch (G) {
        let Z = G instanceof Error ? G.message : String(G);
        k(`Failed to decode LSP URI '${A}': ${Z}. Using un-decoded path: ${B}`, {
            level: "warn"
        });
    }
    if (Q) {
        let G = A97(Q, B);
        if (G.length < B.length && !G.startsWith("../../")) return G;
    }
    return B;
}
function y69(A, Q) {
    let B = new Map();
    for (let G of A){
        let Z = "uri" in G ? G.uri : G.location.uri, Y = S69(Z, Q), J = B.get(Y);
        if (J) J.push(G);
        else B.set(Y, [
            G
        ]);
    }
    return B;
}
function LH1(A, Q) {
    let B = S69(A.uri, Q), G = A.range.start.line + 1, Z = A.range.start.character + 1;
    return `${B}:${G}:${Z}`;
}
function T69(A) {
    return {
        uri: A.targetUri,
        range: A.targetSelectionRange || A.targetRange
    };
}
function P69(A) {
    return "targetUri" in A;
}
function bN0(A, Q) {
    if (!A) return "No definition found. This may occur if the cursor is not on a symbol, or if the definition is in an external library not indexed by the LSP server.";
    if (Array.isArray(A)) {
        let G = A.map((X)=>(P69(X) ? T69(X) : X)), Z = G.filter((X)=>!X || !X.uri);
        if (Z.length > 0) k(`formatGoToDefinitionResult: Filtering out ${Z.length} invalid location(s) - this should have been caught earlier`, {
            level: "warn"
        });
        let Y = G.filter((X)=>X && X.uri);
        if (Y.length === 0) return "No definition found. This may occur if the cursor is not on a symbol, or if the definition is in an external library not indexed by the LSP server.";
        if (Y.length === 1) return `Defined in ${LH1(Y[0], Q)}`;
        let J = Y.map((X)=>`  ${LH1(X, Q)}`).join(`
`);
        return `Found ${Y.length} definitions:
${J}`;
    }
    let B = P69(A) ? T69(A) : A;
    return `Defined in ${LH1(B, Q)}`;
}
function x69(A, Q) {
    if (!A || A.length === 0) return "No references found. This may occur if the symbol has no usages, or if the LSP server has not fully indexed the workspace.";
    let B = A.filter((J)=>!J || !J.uri);
    if (B.length > 0) k(`formatFindReferencesResult: Filtering out ${B.length} invalid location(s) - this should have been caught earlier`, {
        level: "warn"
    });
    let G = A.filter((J)=>J && J.uri);
    if (G.length === 0) return "No references found. This may occur if the symbol has no usages, or if the LSP server has not fully indexed the workspace.";
    if (G.length === 1) return `Found 1 reference:
  ${LH1(G[0], Q)}`;
    let Z = y69(G, Q), Y = [
        `Found ${G.length} references across ${Z.size} files:`
    ];
    for (let [J, X] of Z){
        Y.push(`
${J}:`);
        for (let I of X){
            let W = I.range.start.line + 1, K = I.range.start.character + 1;
            Y.push(`  Line ${W}:${K}`);
        }
    }
    return Y.join(`
`);
}
function Q97(A) {
    if (Array.isArray(A)) return A.map((Q)=>{
        if (typeof Q === "string") return Q;
        return Q.value;
    }).join(`

`);
    if (typeof A === "string") return A;
    if ("kind" in A) return A.value;
    return A.value;
}
function v69(A, Q) {
    if (!A) return "No hover information available. This may occur if the cursor is not on a symbol, or if the LSP server has not fully indexed the file.";
    let B = Q97(A.contents);
    if (A.range) {
        let G = A.range.start.line + 1, Z = A.range.start.character + 1;
        return `Hover info at ${G}:${Z}:

${B}`;
    }
    return B;
}
function k69(A) {
    return ({
        [1]: "File",
        [2]: "Module",
        [3]: "Namespace",
        [4]: "Package",
        [5]: "Class",
        [6]: "Method",
        [7]: "Property",
        [8]: "Field",
        [9]: "Constructor",
        [10]: "Enum",
        [11]: "Interface",
        [12]: "Function",
        [13]: "Variable",
        [14]: "Constant",
        [15]: "String",
        [16]: "Number",
        [17]: "Boolean",
        [18]: "Array",
        [19]: "Object",
        [20]: "Key",
        [21]: "Null",
        [22]: "EnumMember",
        [23]: "Struct",
        [24]: "Event",
        [25]: "Operator",
        [26]: "TypeParameter"
    }[A] || "Unknown");
}
function f69(A, Q = 0) {
    let B = [], G = "  ".repeat(Q), Z = k69(A.kind), Y = `${G}${A.name} (${Z})`;
    if (A.detail) Y += ` ${A.detail}`;
    let J = A.range.start.line + 1;
    if (((Y += ` - Line ${J}`), B.push(Y), A.children && A.children.length > 0)) for (let X of A.children)B.push(...f69(X, Q + 1));
    return B;
}
function b69(A, Q) {
    if (!A || A.length === 0) return "No symbols found in document. This may occur if the file is empty, not supported by the LSP server, or if the server has not fully indexed the file.";
    let B = [
        "Document symbols:"
    ];
    for (let G of A)B.push(...f69(G));
    return B.join(`
`);
}
function h69(A, Q) {
    if (!A || A.length === 0) return "No symbols found in workspace. This may occur if the workspace is empty, or if the LSP server has not finished indexing the project.";
    let B = A.filter((J)=>!J || !J.location || !J.location.uri);
    if (B.length > 0) k(`formatWorkspaceSymbolResult: Filtering out ${B.length} invalid symbol(s) - this should have been caught earlier`, {
        level: "warn"
    });
    let G = A.filter((J)=>J && J.location && J.location.uri);
    if (G.length === 0) return "No symbols found in workspace. This may occur if the workspace is empty, or if the LSP server has not finished indexing the project.";
    let Z = [
        `Found ${G.length} symbol${G.length === 1 ? "" : "s"} in workspace:`
    ], Y = y69(G, Q);
    for (let [J, X] of Y){
        Z.push(`
${J}:`);
        for (let I of X){
            let W = k69(I.kind), K = I.location.range.start.line + 1, V = `  ${I.name} (${W}) - Line ${K}`;
            if (I.containerName) V += ` in ${I.containerName}`;
            Z.push(V);
        }
    }
    return Z.join(`
`);
}
