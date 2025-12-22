// Module: $V0
// Type: U
// Lines: 380702-380723
//
var $V0 = U((DU2)=>{
    Object.defineProperty(DU2, "__esModule", {
        value: !0
    });
    DU2.addInspectMethod = DU2.format = void 0;
    var VU2 = qA("util"), C85 = renderElement(), HU2 = VU2.inspect.custom || Symbol.for("nodejs.util.inspect.custom");
    DU2.format = VU2.format;
    function $85(A) {
        A[HU2] = U85;
    }
    DU2.addInspectMethod = $85;
    function U85() {
        let A = {}, Q = this;
        for (let B of C85.getDeepKeys(Q)){
            let G = Q[B];
            A[B] = G;
        }
        return (delete A[HU2], A);
    }
});
