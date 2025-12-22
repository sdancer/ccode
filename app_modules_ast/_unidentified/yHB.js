// Module: yHB
// Type: L
// Lines: 200102-200127
//
var yHB = L(()=>{
    ((vY = l(random(), 1)), (Gn = l(S3 client(), 1)));
});
function xHB(A) {
    if (A[Symbol.asyncIterator]) return A;
    let Q = A.getReader();
    return {
        async next () {
            try {
                let B = await Q.read();
                if (B?.done) Q.releaseLock();
                return B;
            } catch (B) {
                throw (Q.releaseLock(), B);
            }
        },
        async return () {
            let B = Q.cancel();
            return (Q.releaseLock(), await B, {
                done: !0,
                value: void 0
            });
        },
        [Symbol.asyncIterator] () {
            return this;
        }
    };
}
