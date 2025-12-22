// Module: jp2
// Type: U
// Lines: 444699-444732
//
var jp2 = U((_p2)=>{
    Object.defineProperty(_p2, "__esModule", {
        value: !0
    });
    var Gn5 = z6(), Rp2 = "Transaction", Zn5 = ()=>{
        return {
            name: Rp2,
            setupOnce () {},
            processEvent (A) {
                let Q = Jn5(A);
                for(let B = Q.length - 1; B >= 0; B--){
                    let G = Q[B];
                    if (G.in_app === !0) {
                        A.transaction = Xn5(G);
                        break;
                    }
                }
                return A;
            }
        };
    }, Yn5 = Gn5.convertIntegrationFnToClass(Rp2, Zn5);
    function Jn5(A) {
        let Q = A.exception && A.exception.values && A.exception.values[0];
        return (Q && Q.stacktrace && Q.stacktrace.frames) || [];
    }
    function Xn5(A) {
        return A.module || A.function ? `${A.module || "?"}/${A.function || "?"}` : "<unknown>";
    }
    _p2.Transaction = Yn5;
});
