// Module: Mq0
// Type: L
// Lines: 468619-468631
//
var describeNativeComponentFrame = L(()=>{
    zB();
    ff();
});
function kV1(A, Q, B) {
    return iA9.useMemo(()=>{
        if (lY()) return A;
        let G = HfA(Q, B);
        return Zi([
            ...A,
            ...G
        ], "name");
    }, [
        A,
        Q,
        B
    ]);
}
var iA9;
