// Module: dC1
// Type: U
// Lines: 10036-10054
//
var dC1 = U((jg0)=>{
    Object.defineProperty(jg0, "__esModule", {
        value: !0
    });
    jg0.min = void 0;
    var cx9 = et(), px9 = renderElement();
    function lx9(A) {
        return cx9.reduce(px9.isFunction(A) ? function(Q, B) {
            return A(Q, B) < 0 ? Q : B;
        } : function(Q, B) {
            return Q < B ? Q : B;
        });
    }
    jg0.min = lx9;
});
