// Module: t$2
// Type: L
// Lines: 380281-380352
//
var createRenderState = L(()=>{
    bA();
    aB();
    i4();
    pushStartInstance();
    cF = l(React runtime(), 1);
});
function e$2(A) {
    if (!A?.notebook_path) return null;
    return S5(A.notebook_path);
}
function AU2({ notebook_path: A, cell_id: Q, new_source: B, cell_type: G, edit_mode: Z }, { verbose: Y }) {
    if (!A || !B || !G) return null;
    if (Y) return `${A}@${Q}, content: ${B.slice(0, 30)}…, cell_type: ${G}, edit_mode: ${Z ?? "replace"}`;
    return `${S5(A)}@${Q}`;
}
function QU2(A, { verbose: Q }) {
    return LJ.createElement(s$2, {
        notebook_path: A.notebook_path,
        cell_id: A.cell_id,
        new_source: A.new_source,
        cell_type: A.cell_type,
        edit_mode: A.edit_mode,
        verbose: Q
    });
}
function BU2(A, { verbose: Q }) {
    if (!Q && typeof A === "string" && Z9(A, "tool_use_error")) return LJ.createElement(b0, null, LJ.createElement(C, {
        color: "error"
    }, "Error editing notebook"));
    return LJ.createElement(n8, {
        result: A,
        verbose: Q
    });
}
function GU2() {
    return null;
}
function ZU2({ cell_id: A, new_source: Q, error: B }) {
    if (B) return LJ.createElement(b0, null, LJ.createElement(C, {
        color: "error"
    }, B));
    return LJ.createElement(b0, null, LJ.createElement(T, {
        flexDirection: "column"
    }, LJ.createElement(C, null, "Updated cell ", LJ.createElement(C, {
        bold: !0
    }, A), ":"), LJ.createElement(T, {
        marginLeft: 2
    }, LJ.createElement(fw, {
        code: Q,
        filePath: "notebook.py"
    }))));
}
var LJ;
