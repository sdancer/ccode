// Module: Nx0
// Type: U
// Lines: 5217-5248
//
var Nx0 = U((wx0)=>{
    Object.defineProperty(wx0, "__esModule", {
        value: !0
    });
    wx0.TestTools = wx0.Immediate = void 0;
    var KO9 = 1, Oz1, bgA = {};
    function Ux0(A) {
        if (A in bgA) return (delete bgA[A], !0);
        return !1;
    }
    wx0.Immediate = {
        setImmediate: function(A) {
            var Q = KO9++;
            if (((bgA[Q] = !0), !Oz1)) Oz1 = Promise.resolve();
            return (Oz1.then(function() {
                return Ux0(Q) && A();
            }), Q);
        },
        clearImmediate: function(A) {
            Ux0(A);
        }
    };
    wx0.TestTools = {
        pending: function() {
            return Object.keys(bgA).length;
        }
    };
});
