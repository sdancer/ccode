// Module: QDA
// Type: U
// Lines: 437045-437060
//
var QDA = U((pg2)=>{
    Object.defineProperty(pg2, "__esModule", {
        value: !0
    });
    var Cb5 = (A, Q, B)=>{
        let G, Z;
        return (Y)=>{
            if (Q.value >= 0) {
                if (Y || B) {
                    if (((Z = Q.value - (G || 0)), Z || G === void 0)) ((G = Q.value), (Q.delta = Z), A(Q));
                }
            }
        };
    };
    pg2.bindReporter = Cb5;
});
