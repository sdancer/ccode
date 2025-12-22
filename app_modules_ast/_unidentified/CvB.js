// Module: CvB
// Type: U
// Lines: 259074-259110
//
var performWork = U((EvB)=>{
    Object.defineProperty(EvB, "__esModule", {
        value: !0
    });
    EvB.boolOrEmptySchema = EvB.topBoolOrEmptySchema = void 0;
    var i53 = renderElement(), n53 = S3(), a53 = bu(), o53 = {
        message: "boolean schema is false"
    };
    function r53(A) {
        let { gen: Q, schema: B, validateName: G } = A;
        if (B === !1) FvB(A, !1);
        else if (typeof B == "object" && B.$async === !0) Q.return(a53.default.data);
        else (Q.assign(n53._`${G}.errors`, null), Q.return(!0));
    }
    EvB.topBoolOrEmptySchema = r53;
    function s53(A, Q) {
        let { gen: B, schema: G } = A;
        if (G === !1) (B.var(Q, !1), FvB(A));
        else B.var(Q, !0);
    }
    EvB.boolOrEmptySchema = s53;
    function FvB(A, Q) {
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
        (0, i53.reportError)(Z, o53, void 0, Q);
    }
});
