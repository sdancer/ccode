// Module: Uc2
// Type: U
// Lines: 441742-441754
//
var Uc2 = U(($c2)=>{
    Object.defineProperty($c2, "__esModule", {
        value: !0
    });
    var Cc2 = FQ();
    function Il5(A, Q) {
        return Cc2.extractRequestData(A, {
            include: Q
        });
    }
    function Wl5(A, Q, B = {}) {
        return Cc2.addRequestDataToEvent(A, Q, {
            include: B
        });
    }
    $c2.extractRequestData = Il5;
    $c2.parseRequest = Wl5;
});
