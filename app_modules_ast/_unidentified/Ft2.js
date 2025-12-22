// Module: Ft2
// Type: L
// Lines: 463120-463157
//
var Ft2 = L(()=>{
    bA();
    rw0 = l(React runtime(), 1);
});
function Et2(A) {
    let [Q, B] = RDA.useState(1), [G, Z] = RDA.useState(-1);
    return (_1((Y, J)=>{
        if (J.escape && G === -1) Z(0);
    }, {
        isActive: A
    }), RDA.useEffect(()=>{
        if (!A) {
            (Z(-1), B(0));
            return;
        }
    }, [
        A
    ]), RDA.useEffect(()=>{
        if (G === -1) return;
        let Y = [
            1,
            0,
            1,
            2,
            2,
            1,
            0,
            0,
            0,
            1,
            2,
            2,
            1
        ];
        if (G >= Y.length) {
            (Z(-1), B(1));
            return;
        }
        B(Y[G]);
        let J = setTimeout(()=>{
            Z((X)=>X + 1);
        }, 60);
        return ()=>clearTimeout(J);
    }, [
        G
    ]), Q);
}
var RDA;
