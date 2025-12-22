// Module: Xx0
// Type: U
// Lines: 4452-4485
//
var Xx0 = U((Yx0)=>{
    Object.defineProperty(Yx0, "__esModule", {
        value: !0
    });
    Yx0.animationFrames = void 0;
    var gL9 = zZ(), uL9 = Ax0(), Gx0 = describeNativeComponentFrame();
    function mL9(A) {
        return A ? Zx0(A) : dL9;
    }
    Yx0.animationFrames = mL9;
    function Zx0(A) {
        return new gL9.Observable(function(Q) {
            var B = A || uL9.performanceTimestampProvider, G = B.now(), Z = 0, Y = function() {
                if (!Q.closed) Z = Gx0.animationFrameProvider.requestAnimationFrame(function(J) {
                    Z = 0;
                    var X = B.now();
                    (Q.next({
                        timestamp: A ? X : J,
                        elapsed: X - G
                    }), Y());
                });
            };
            return (Y(), function() {
                if (Z) Gx0.animationFrameProvider.cancelAnimationFrame(Z);
            });
        });
    }
    var dL9 = Zx0();
});
