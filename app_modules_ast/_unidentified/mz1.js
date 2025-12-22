// Module: mz1
// Type: U
// Lines: 7042-7052
//
var mz1 = U((Mk0)=>{
    Object.defineProperty(Mk0, "__esModule", {
        value: !0
    });
    Mk0.NotFoundError = void 0;
    var aR9 = Zp();
    Mk0.NotFoundError = aR9.createErrorClass(function(A) {
        return function(B) {
            (A(this), (this.name = "NotFoundError"), (this.message = B));
        };
    });
});
