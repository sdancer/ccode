// Module: km0
// Type: U
// Lines: 13108-13120
//
var km0 = U((xm0)=>{
    Object.defineProperty(xm0, "__esModule", {
        value: !0
    });
    xm0.partition = void 0;
    var Hu9 = sz1(), ym0 = rb();
    function Du9(A, Q) {
        return function(B) {
            return [
                ym0.filter(A, Q)(B),
                ym0.filter(Hu9.not(A, Q))(B)
            ];
        };
    }
    xm0.partition = Du9;
});
