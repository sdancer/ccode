// Module: zM2
// Type: L
// Lines: 398785-398829
//
var pushStartInstance = L(()=>{
    Jo();
    bA();
    A4();
    pushStartInstance();
    describeNativeComponentFrame();
    restoreViewTransitionName();
    Z6();
    ((FS = l(React runtime(), 1)), (_J1 = l(React runtime(), 1)));
});
import { basename as QI5, relative as BI5 } from "path";
function CM2(A) {
    let Q = (X)=>{
        return yV.inputSchema.parse(X);
    }, B = Q(A.toolUseConfirm.input), { file_path: G, content: Z } = B, Y = C9A.useMemo(()=>vA().existsSync(G), [
        G
    ]), J = Y ? "overwrite" : "create";
    return C9A.default.createElement(Pr, {
        toolUseConfirm: A.toolUseConfirm,
        toolUseContext: A.toolUseContext,
        onDone: A.onDone,
        onReject: A.onReject,
        title: Y ? "Overwrite file" : "Create file",
        subtitle: BI5(i1(), G),
        question: C9A.default.createElement(C, null, "Do you want to ", J, " ", C9A.default.createElement(C, {
            bold: !0
        }, QI5(G)), "?"),
        content: C9A.default.createElement(EM2, {
            file_path: G,
            content: Z
        }),
        path: G,
        completionType: "write_file_single",
        languageName: XHA(G),
        parseInput: Q,
        ideDiffSupport: GI5
    });
}
var C9A, GI5;
