// Module: Zw2
// Type: U
// Lines: 381560-381581
//
var createRenderState = U((gSZ, Gw2)=>{
    var { ParserError: l35 } = describeNativeComponentFrame();
    Gw2.exports = {
        order: 100,
        allowEmpty: !0,
        canParse: ".json",
        async parse (A) {
            let Q = A.data;
            if (Buffer.isBuffer(Q)) Q = Q.toString();
            if (typeof Q === "string") if (Q.trim().length === 0) return;
            else try {
                return JSON.parse(Q);
            } catch (B) {
                throw new l35(B.message, A.url);
            }
            else return Q;
        }
    };
});
