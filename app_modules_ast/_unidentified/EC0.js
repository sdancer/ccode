// Module: EC0
// Type: U
// Lines: 430905-430927
//
var EC0 = U((vk2)=>{
    Object.defineProperty(vk2, "__esModule", {
        value: !0
    });
    function UN5(A) {
        let Q = void 0, B = A[0], G = 1;
        while(G < A.length){
            let Z = A[G], Y = A[G + 1];
            if (((G += 2), (Z === "optionalAccess" || Z === "optionalCall") && B == null)) return;
            if (Z === "access" || Z === "optionalAccess") ((Q = B), (B = Y(B)));
            else if (Z === "call" || Z === "optionalCall") ((B = Y((...J)=>B.call(Q, ...J))), (Q = void 0));
        }
        return B;
    }
    vk2._optionalChain = UN5;
});
