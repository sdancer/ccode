// Module: K30
// Type: U
// Lines: 281524-281542
//
var K30 = U((X9Z, _iB)=>{
    var eIA = renderElement();
    function Mq3(A, Q, B, G) {
        eIA.open(A, "r+", (Z, Y)=>{
            if (Z) return G(Z);
            eIA.futimes(Y, Q, B, (J)=>{
                eIA.close(Y, (X)=>{
                    if (G) G(J || X);
                });
            });
        });
    }
    function Rq3(A, Q, B) {
        let G = eIA.openSync(A, "r+");
        return (eIA.futimesSync(G, Q, B), eIA.closeSync(G));
    }
    _iB.exports = {
        utimesMillis: Mq3,
        utimesMillisSync: Rq3
    };
});
