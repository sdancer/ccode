// Module: c82
// Type: U
// Lines: 339383-339403
//
var c82 = U((m82)=>{
    Object.defineProperty(m82, "__esModule", {
        value: !0
    });
    m82.hexToBinary = void 0;
    function u82(A) {
        if (A >= 48 && A <= 57) return A - 48;
        if (A >= 97 && A <= 102) return A - 87;
        return A - 55;
    }
    function tm3(A) {
        let Q = new Uint8Array(A.length / 2), B = 0;
        for(let G = 0; G < A.length; G += 2){
            let Z = u82(A.charCodeAt(G)), Y = u82(A.charCodeAt(G + 1));
            Q[B++] = (Z << 4) | Y;
        }
        return Q;
    }
    m82.hexToBinary = tm3;
});
