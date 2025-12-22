// Module: yv2
// Type: U
// Lines: 430004-430034
//
var yv2 = U((Sv2)=>{
    Object.defineProperty(Sv2, "__esModule", {
        value: !0
    });
    function Qw5(A) {
        let Q = {}, B = 0;
        while(B < A.length){
            let G = A.indexOf("=", B);
            if (G === -1) break;
            let Z = A.indexOf(";", B);
            if (Z === -1) Z = A.length;
            else if (Z < G) {
                B = A.lastIndexOf(";", G - 1) + 1;
                continue;
            }
            let Y = A.slice(B, G).trim();
            if (Q[Y] === void 0) {
                let J = A.slice(G + 1, Z).trim();
                if (J.charCodeAt(0) === 34) J = J.slice(1, -1);
                try {
                    Q[Y] = J.indexOf("%") !== -1 ? decodeURIComponent(J) : J;
                } catch (X) {
                    Q[Y] = J;
                }
            }
            B = Z + 1;
        }
        return Q;
    }
    Sv2.parseCookie = Qw5;
});
