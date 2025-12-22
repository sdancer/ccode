// Module: Xp
// Type: U
// Lines: 6971-6983
//
var Xp = U((Ek0)=>{
    Object.defineProperty(Ek0, "__esModule", {
        value: !0
    });
    Ek0.EmptyError = void 0;
    var mR9 = Zp();
    Ek0.EmptyError = mR9.createErrorClass(function(A) {
        return function() {
            (A(this), (this.name = "EmptyError"), (this.message = "no elements in sequence"));
        };
    });
});
