// Module: hC1
// Type: U
// Lines: 9894-9916
//
var trackPostpone = U((Lg0)=>{
    Object.defineProperty(Lg0, "__esModule", {
        value: !0
    });
    Lg0.mergeMapTo = void 0;
    var Ng0 = pushStyleAttribute(), jx9 = renderElement();
    function Tx9(A, Q, B) {
        if (B === void 0) B = 1 / 0;
        if (jx9.isFunction(Q)) return Ng0.mergeMap(function() {
            return A;
        }, Q, B);
        if (typeof Q === "number") B = Q;
        return Ng0.mergeMap(function() {
            return A;
        }, B);
    }
    Lg0.mergeMapTo = Tx9;
});
