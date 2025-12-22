// Module: yvB
// Type: U
// Lines: 259366-259392
//
var renderChildrenArray = U((PvB)=>{
    Object.defineProperty(PvB, "__esModule", {
        value: !0
    });
    PvB.assignDefaults = void 0;
    var AIA = S3(), L73 = createRenderState();
    function O73(A, Q) {
        let { properties: B, items: G } = A.schema;
        if (Q === "object" && B) for(let Z in B)TvB(A, Z, B[Z].default);
        else if (Q === "array" && Array.isArray(G)) G.forEach((Z, Y)=>TvB(A, Y, Z.default));
    }
    PvB.assignDefaults = O73;
    function TvB(A, Q, B) {
        let { gen: G, compositeRule: Z, data: Y, opts: J } = A;
        if (B === void 0) return;
        let X = AIA._`${Y}${(0, AIA.getProperty)(Q)}`;
        if (Z) {
            (0, L73.checkStrictMode)(A, `default is ignored for: ${X}`);
            return;
        }
        let I = AIA._`${X} === undefined`;
        if (J.useDefaults === "empty") I = AIA._`${I} || ${X} === null || ${X} === ""`;
        G.if(I, AIA._`${X} = ${(0, AIA.stringify)(B)}`);
    }
});
