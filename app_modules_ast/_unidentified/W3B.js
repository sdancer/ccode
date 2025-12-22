// Module: W3B
// Type: U
// Lines: 174023-174036
//
var W3B = U((CXG, I3B)=>{
    var X3B = createRenderState(), zw8 = (A, Q, B = !1)=>{
        if (A instanceof X3B) return A;
        try {
            return new X3B(A, Q);
        } catch (G) {
            if (!B) return null;
            throw G;
        }
    };
    I3B.exports = zw8;
});
