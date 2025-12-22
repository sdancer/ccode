// Module: FC0
// Type: U
// Lines: 430874-430896
//
var FC0 = U((Sk2)=>{
    Object.defineProperty(Sk2, "__esModule", {
        value: !0
    });
    async function FN5(A) {
        let Q = void 0, B = A[0], G = 1;
        while(G < A.length){
            let Z = A[G], Y = A[G + 1];
            if (((G += 2), (Z === "optionalAccess" || Z === "optionalCall") && B == null)) return;
            if (Z === "access" || Z === "optionalAccess") ((Q = B), (B = await Y(B)));
            else if (Z === "call" || Z === "optionalCall") ((B = await Y((...J)=>B.call(Q, ...J))), (Q = void 0));
        }
        return B;
    }
    Sk2._asyncOptionalChain = FN5;
});
