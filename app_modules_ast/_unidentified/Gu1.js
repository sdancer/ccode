// Module: Gu1
// Type: U
// Lines: 128364-128378
//
var Gu1 = U((HcQ)=>{
    Object.defineProperty(HcQ, "__esModule", {
        value: !0
    });
    HcQ.createConstMap = void 0;
    function n98(A) {
        let Q = {}, B = A.length;
        for(let G = 0; G < B; G++){
            let Z = A[G];
            if (Z) Q[String(Z).toUpperCase().replace(/[-.]/g, "_")] = Z;
        }
        return Q;
    }
    HcQ.createConstMap = n98;
});
