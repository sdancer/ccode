// Module: n6Q
// Type: U
// Lines: 66040-66067
//
var n6Q = U((i6Q)=>{
    Object.defineProperty(i6Q, "__esModule", {
        value: !0
    });
    i6Q.headStream = GG4;
    async function GG4(A, Q) {
        let B = 0, G = [], Z = A.getReader(), Y = !1;
        while(!Y){
            let { done: I, value: W } = await Z.read();
            if (W) (G.push(W), (B += W?.byteLength ?? 0));
            if (B >= Q) break;
            Y = I;
        }
        Z.releaseLock();
        let J = new Uint8Array(Math.min(Q, B)), X = 0;
        for (let I of G){
            if (I.byteLength > J.byteLength - X) {
                J.set(I.subarray(0, J.byteLength - X), X);
                break;
            } else J.set(I, X);
            X += I.length;
        }
        return J;
    }
});
