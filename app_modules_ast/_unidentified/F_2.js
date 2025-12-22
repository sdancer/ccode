// Module: F_2
// Type: U
// Lines: 403169-403221
//
var F_2 = U((H_2)=>{
    Object.defineProperty(H_2, "__esModule", {
        value: !0
    });
    H_2.hyphenate = H_2.parse = void 0;
    function wK5(A) {
        let Q = [], B = 0, G = 0, Z = 0, Y = 0, J = 0, X = null;
        while(B < A.length)switch(A.charCodeAt(B++)){
            case 40:
                G++;
                break;
            case 41:
                G--;
                break;
            case 39:
                if (Z === 0) Z = 39;
                else if (Z === 39 && A.charCodeAt(B - 1) !== 92) Z = 0;
                break;
            case 34:
                if (Z === 0) Z = 34;
                else if (Z === 34 && A.charCodeAt(B - 1) !== 92) Z = 0;
                break;
            case 58:
                if (!X && G === 0 && Z === 0) ((X = V_2(A.substring(J, B - 1).trim())), (Y = B));
                break;
            case 59:
                if (X && Y > 0 && G === 0 && Z === 0) {
                    let W = A.substring(Y, B - 1).trim();
                    (Q.push(X, W), (J = B), (Y = 0), (X = null));
                }
                break;
        }
        if (X && Y) {
            let I = A.slice(Y).trim();
            Q.push(X, I);
        }
        return Q;
    }
    H_2.parse = wK5;
    function V_2(A) {
        return A.replace(/[a-z][A-Z]/g, (Q)=>{
            return Q.charAt(0) + "-" + Q.charAt(1);
        }).toLowerCase();
    }
    H_2.hyphenate = V_2;
});
