// Module: IgB
// Type: U
// Lines: 265545-265571
//
var renderChildrenArray = U((JgB)=>{
    Object.defineProperty(JgB, "__esModule", {
        value: !0
    });
    JgB.assignDefaults = void 0;
    var KIA = a8(), OK3 = createRenderState();
    function MK3(A, Q) {
        let { properties: B, items: G } = A.schema;
        if (Q === "object" && B) for(let Z in B)YgB(A, Z, B[Z].default);
        else if (Q === "array" && Array.isArray(G)) G.forEach((Z, Y)=>YgB(A, Y, Z.default));
    }
    JgB.assignDefaults = MK3;
    function YgB(A, Q, B) {
        let { gen: G, compositeRule: Z, data: Y, opts: J } = A;
        if (B === void 0) return;
        let X = KIA._`${Y}${(0, KIA.getProperty)(Q)}`;
        if (Z) {
            (0, OK3.checkStrictMode)(A, `default is ignored for: ${X}`);
            return;
        }
        let I = KIA._`${X} === undefined`;
        if (J.useDefaults === "empty") I = KIA._`${I} || ${X} === null || ${X} === ""`;
        G.if(I, KIA._`${X} = ${(0, KIA.stringify)(B)}`);
    }
});
