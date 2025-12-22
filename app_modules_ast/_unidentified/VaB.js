// Module: VaB
// Type: U
// Lines: 282663-282706
//
var pushStartInstance = U((T9Z, KaB)=>{
    var IaB = renderElement(), C30 = qA("path"), HL3 = Z81().copySync, WaB = XTA().removeSync, DL3 = $P().mkdirpSync, XaB = pushStartInstance();
    function FL3(A, Q, B) {
        B = B || {};
        let G = B.overwrite || B.clobber || !1, { srcStat: Z, isChangingCase: Y = !1 } = XaB.checkPathsSync(A, Q, "move", B);
        if ((XaB.checkParentPathsSync(A, Z, Q, "move"), !EL3(Q))) DL3(C30.dirname(Q));
        return zL3(A, Q, G, Y);
    }
    function EL3(A) {
        let Q = C30.dirname(A);
        return C30.parse(Q).root === Q;
    }
    function zL3(A, Q, B, G) {
        if (G) return z30(A, Q, B);
        if (B) return (WaB(Q), z30(A, Q, B));
        if (IaB.existsSync(Q)) throw Error("dest already exists.");
        return z30(A, Q, B);
    }
    function z30(A, Q, B) {
        try {
            IaB.renameSync(A, Q);
        } catch (G) {
            if (G.code !== "EXDEV") throw G;
            return CL3(A, Q, B);
        }
    }
    function CL3(A, Q, B) {
        return (HL3(A, Q, {
            overwrite: B,
            errorOnExist: !0
        }), WaB(A));
    }
    KaB.exports = FL3;
});
