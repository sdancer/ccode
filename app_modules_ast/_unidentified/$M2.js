// Module: $M2
// Type: L
// Lines: 398829-398908
//
var renderElement = L(()=>{
    bA();
    createRenderState();
    pushStartInstance();
    A4();
    restoreViewTransitionName();
    pushStartInstance();
    aB();
    ((C9A = l(React runtime(), 1)), (GI5 = {
        getConfig: (A)=>{
            let B = vA().existsSync(A.file_path) ? WF(A.file_path) : "";
            return EJ1(A.file_path, B, A.content, !1);
        },
        applyChanges: (A, Q)=>{
            let B = Q[0];
            if (B) return {
                ...A,
                content: B.new_string
            };
            return A;
        }
    }));
});
function ZI5(A) {
    let Q = A.tool;
    if ("getPath" in Q && typeof Q.getPath === "function") try {
        return Q.getPath(A.input);
    } catch  {
        return null;
    }
    return null;
}
function UM2({ toolUseConfirm: A, onDone: Q, onReject: B, verbose: G, toolUseContext: Z }) {
    let [Y] = D2(), J = ZI5(A), X = A.tool.userFacingName(A.input), I = A.tool.isReadOnly(A.input), K = `${I ? "Read" : "Edit"} file`, V = (D)=>D;
    if (!J) return yxA.default.createElement(RJ1, {
        toolUseConfirm: A,
        toolUseContext: Z,
        onDone: Q,
        onReject: B,
        verbose: G
    });
    let H = yxA.default.createElement(T, {
        flexDirection: "column",
        paddingX: 2,
        paddingY: 1
    }, yxA.default.createElement(C, null, X, "(", A.tool.renderToolUseMessage(A.input, {
        theme: Y,
        verbose: G
    }), ")"));
    return yxA.default.createElement(Pr, {
        toolUseConfirm: A,
        toolUseContext: Z,
        onDone: Q,
        onReject: B,
        title: K,
        content: H,
        path: J,
        parseInput: V,
        operationType: I ? "read" : "write",
        completionType: "tool_use_single",
        languageName: "none"
    });
}
var yxA;
