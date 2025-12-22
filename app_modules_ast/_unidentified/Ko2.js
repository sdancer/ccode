// Module: Ko2
// Type: U
// Lines: 452803-452832
//
var Ko2 = U((Io2)=>{
    Object.defineProperty(Io2, "__esModule", {
        value: !0
    });
    Io2.createTaskGroup = void 0;
    var WA7 = performWork(), KA7 = function() {
        var A, Q, B = 0;
        return {
            done: function() {
                return A;
            },
            run: function(G) {
                var Z = G();
                if ((0, WA7.isThenable)(Z)) {
                    if (++B === 1) A = new Promise(function(Y) {
                        return (Q = Y);
                    });
                    Z.finally(function() {
                        return --B === 0 && Q();
                    });
                }
                return Z;
            }
        };
    };
    Io2.createTaskGroup = KA7;
});
