// Module: NxA
// Type: L
// Lines: 391975-392028
//
var pushStartInstance = L(()=>{
    bA();
    K8();
    lw();
    Tr();
    VO2();
    pushStartInstance();
    createRenderState();
    updateProperties();
    Qq = l(React runtime(), 1);
});
function EJ1(A, Q, B, G) {
    return {
        filePath: A,
        edits: [
            {
                old_string: Q,
                new_string: B,
                replace_all: G
            }
        ],
        editMode: "single"
    };
}
import { basename as TJ5 } from "path";
import { relative as PJ5 } from "path";
function zO2(A) {
    let Q = (X)=>{
        return Fz.inputSchema.parse(X);
    }, B = Q(A.toolUseConfirm.input), { file_path: G, old_string: Z, new_string: Y, replace_all: J } = B;
    return LxA.default.createElement(Pr, {
        toolUseConfirm: A.toolUseConfirm,
        toolUseContext: A.toolUseContext,
        onDone: A.onDone,
        onReject: A.onReject,
        title: "Edit file",
        subtitle: PJ5(i1(), G),
        question: LxA.default.createElement(C, null, "Do you want to make this edit to", " ", LxA.default.createElement(C, {
            bold: !0
        }, TJ5(G)), "?"),
        content: LxA.default.createElement(VJ1, {
            file_path: G,
            edits: [
                {
                    old_string: Z,
                    new_string: Y,
                    replace_all: J || !1
                }
            ]
        }),
        path: G,
        completionType: "str_replace_single",
        languageName: XHA(G),
        parseInput: Q,
        ideDiffSupport: SJ5
    });
}
var LxA, SJ5;
