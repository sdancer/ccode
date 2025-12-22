// Module: _uB
// Type: U
// Lines: 267751-267767
//
var _uB = U((RuB)=>{
    Object.defineProperty(RuB, "__esModule", {
        value: !0
    });
    function MuB(A) {
        let Q = A.length, B = 0, G = 0, Z;
        while(G < Q)if ((B++, (Z = A.charCodeAt(G++)), Z >= 55296 && Z <= 56319 && G < Q)) {
            if (((Z = A.charCodeAt(G)), (Z & 64512) === 56320)) G++;
        }
        return B;
    }
    RuB.default = MuB;
    MuB.code = 'require("ajv/dist/runtime/ucs2length").default';
});
