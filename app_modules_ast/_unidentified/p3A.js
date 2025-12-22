// Module: p3A
// Type: U
// Lines: 54861-54896
//
var performWork = U((w0Q)=>{
    Object.defineProperty(w0Q, "__esModule", {
        value: !0
    });
    w0Q._getSortedObject = w0Q._DJB2Object = w0Q._DJB2 = void 0;
    var VQ4 = TmA(), HQ4 = (A)=>{
        let Q = 0;
        for(let B = 0; B < A.length; B++){
            let G = A.charCodeAt(B);
            ((Q = (Q << 5) - Q + G), (Q = Q & Q));
        }
        return String(Q >>> 0);
    };
    w0Q._DJB2 = HQ4;
    var DQ4 = (A, Q)=>{
        return w0Q._DJB2(JSON.stringify(w0Q._getSortedObject(A, Q)));
    };
    w0Q._DJB2Object = DQ4;
    var FQ4 = (A, Q)=>{
        if (A == null) return null;
        let B = Object.keys(A).sort(), G = {};
        return (B.forEach((Z)=>{
            let Y = A[Z];
            if (Q === 0 || (0, VQ4._typeOf)(Y) !== "object") {
                G[Z] = Y;
                return;
            }
            G[Z] = w0Q._getSortedObject(Y, Q != null ? Q - 1 : Q);
        }), G);
    };
    w0Q._getSortedObject = FQ4;
});
