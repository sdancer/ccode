// Module: EfB
// Type: U
// Lines: 262104-262120
//
var EfB = U((FfB)=>{
    Object.defineProperty(FfB, "__esModule", {
        value: !0
    });
    function DfB(A) {
        let Q = A.length, B = 0, G = 0, Z;
        while(G < Q)if ((B++, (Z = A.charCodeAt(G++)), Z >= 55296 && Z <= 56319 && G < Q)) {
            if (((Z = A.charCodeAt(G)), (Z & 64512) === 56320)) G++;
        }
        return B;
    }
    FfB.default = DfB;
    DfB.code = 'require("ajv/dist/runtime/ucs2length").default';
});
