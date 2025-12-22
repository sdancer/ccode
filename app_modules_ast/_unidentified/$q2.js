// Module: $q2
// Type: U
// Lines: 384049-384070
//
var createRenderState = U((JyZ, Cq2)=>{
    var { ParserError: yG5 } = describeNativeComponentFrame(), xG5 = ZH0(), { JSON_SCHEMA: vG5 } = ZH0();
    Cq2.exports = {
        order: 200,
        allowEmpty: !0,
        canParse: [
            ".yaml",
            ".yml",
            ".json"
        ],
        async parse (A) {
            let Q = A.data;
            if (Buffer.isBuffer(Q)) Q = Q.toString();
            if (typeof Q === "string") try {
                return xG5.load(Q, {
                    schema: vG5
                });
            } catch (B) {
                throw new yG5(B.message, A.url);
            }
            else return Q;
        }
    };
});
