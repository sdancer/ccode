// Module: iC1
// Type: U
// Lines: 10159-10176
//
var iC1 = U((hg0)=>{
    Object.defineProperty(hg0, "__esModule", {
        value: !0
    });
    hg0.publish = void 0;
    var Zv9 = renderElement(), Yv9 = pEA(), Jv9 = cEA();
    function Xv9(A) {
        return A ? function(Q) {
            return Jv9.connect(A)(Q);
        } : function(Q) {
            return Yv9.multicast(new Zv9.Subject())(Q);
        };
    }
    hg0.publish = Xv9;
});
