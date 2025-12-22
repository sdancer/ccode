// Module: TmA
// Type: U
// Lines: 54848-54861
//
var TmA = U(($0Q)=>{
    Object.defineProperty($0Q, "__esModule", {
        value: !0
    });
    $0Q._isTypeMatch = $0Q._typeOf = void 0;
    function IQ4(A) {
        return Array.isArray(A) ? "array" : typeof A;
    }
    $0Q._typeOf = IQ4;
    function WQ4(A, Q) {
        let B = (G)=>(Array.isArray(G) ? "array" : typeof G);
        return B(A) === B(Q);
    }
    $0Q._isTypeMatch = WQ4;
});
