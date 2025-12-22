// Module: $22
// Type: U
// Lines: 324238-324259
//
var $22 = U((z22)=>{
    Object.defineProperty(z22, "__esModule", {
        value: !0
    });
    z22.getMapping = void 0;
    var oh3 = X22(), rh3 = D22(), sh3 = y51(), F22 = -10, E22 = 20, th3 = Array.from({
        length: 31
    }, (A, Q)=>{
        if (Q > 10) return new rh3.LogarithmMapping(Q - 10);
        return new oh3.ExponentMapping(Q - 10);
    });
    function eh3(A) {
        if (A > E22 || A < F22) throw new sh3.MappingError(`expected scale >= ${F22} && <= ${E22}, got: ${A}`);
        return th3[A + 10];
    }
    z22.getMapping = eh3;
});
