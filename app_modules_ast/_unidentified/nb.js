// Module: nb
// Type: U
// Lines: 6586-6600
//
var nb = U((Tv0)=>{
    Object.defineProperty(Tv0, "__esModule", {
        value: !0
    });
    Tv0.executeSchedule = void 0;
    function hM9(A, Q, B, G, Z) {
        if (G === void 0) G = 0;
        if (Z === void 0) Z = !1;
        var Y = Q.schedule(function() {
            if ((B(), Z)) A.add(this.schedule(null, G));
            else this.unsubscribe();
        }, G);
        if ((A.add(Y), !Z)) return Y;
    }
    Tv0.executeSchedule = hM9;
});
