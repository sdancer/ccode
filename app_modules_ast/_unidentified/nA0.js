// Module: nA0
// Type: L
// Lines: 244439-244469
//
var nA0 = L(()=>{
    bA();
    SK();
    qI();
    i4();
    A4();
    KB();
    pushStartInstance();
    createRenderState();
    P5 = l(React runtime(), 1);
});
import { createHash as hPB } from "crypto";
function g23(A) {
    return hPB("sha256").update(A).digest("hex").slice(0, 16);
}
function u23(A) {
    return hPB("sha256").update(A).digest("hex");
}
function gv(A) {
    let Q = {
        operation: A.operation,
        tool: A.tool,
        filePathHash: g23(A.filePath)
    };
    if (A.content !== void 0 && A.content.length <= m23) Q.contentHash = u23(A.content);
    if (A.type !== void 0) Q.type = A.type;
    r("tengu_file_operation", Q);
}
var m23 = 102400;
