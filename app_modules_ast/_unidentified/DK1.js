// Module: DK1
// Type: L
// Lines: 445437-445464
//
var pushStartInstance = L(()=>{
    Nl2 = l(React runtime(), 1);
});
import { basename as xr5 } from "path";
function Ll2({ ideSelection: A, mcpClients: Q }) {
    let B = HDA(Q), G = B === "connected" && (A?.filePath || (A?.text && A.lineCount > 0));
    if (B === null || !G || !A) return null;
    if (A.text && A.lineCount > 0) return FkA.createElement(C, {
        color: "ide",
        key: "selection-indicator"
    }, "⧉ ", A.lineCount, " ", A.lineCount === 1 ? "line" : "lines", " selected");
    if (A.filePath) return FkA.createElement(C, {
        color: "ide",
        key: "selection-indicator"
    }, "⧉ In ", xr5(A.filePath));
}
var FkA;
