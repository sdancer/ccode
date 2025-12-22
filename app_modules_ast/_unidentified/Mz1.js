// Module: Mz1
// Type: U
// Lines: 5382-5402
//
var Mz1 = U((_x0)=>{
    Object.defineProperty(_x0, "__esModule", {
        value: !0
    });
    _x0.Scheduler = void 0;
    var UO9 = vgA(), wO9 = (function() {
        function A(Q, B) {
            if (B === void 0) B = A.now;
            ((this.schedulerActionCtor = Q), (this.now = B));
        }
        return ((A.prototype.schedule = function(Q, B, G) {
            if (B === void 0) B = 0;
            return new this.schedulerActionCtor(this, Q).schedule(G, B);
        }), (A.now = UO9.dateTimestampProvider.now), A);
    })();
    _x0.Scheduler = wO9;
});
