// Module: nhB
// Type: U
// Lines: 265253-265289
//
var renderChildrenArray = U((lhB)=>{
    Object.defineProperty(lhB, "__esModule", {
        value: !0
    });
    lhB.boolOrEmptySchema = lhB.topBoolOrEmptySchema = void 0;
    var nW3 = renderElement(), aW3 = a8(), oW3 = du(), rW3 = {
        message: "boolean schema is false"
    };
    function sW3(A) {
        let { gen: Q, schema: B, validateName: G } = A;
        if (B === !1) phB(A, !1);
        else if (typeof B == "object" && B.$async === !0) Q.return(oW3.default.data);
        else (Q.assign(aW3._`${G}.errors`, null), Q.return(!0));
    }
    lhB.topBoolOrEmptySchema = sW3;
    function tW3(A, Q) {
        let { gen: B, schema: G } = A;
        if (G === !1) (B.var(Q, !1), phB(A));
        else B.var(Q, !0);
    }
    lhB.boolOrEmptySchema = tW3;
    function phB(A, Q) {
        let { gen: B, data: G } = A, Z = {
            gen: B,
            keyword: "false schema",
            data: G,
            schema: !1,
            schemaCode: !1,
            schemaValue: !1,
            params: {},
            it: A
        };
        (0, nW3.reportError)(Z, rW3, void 0, Q);
    }
});
