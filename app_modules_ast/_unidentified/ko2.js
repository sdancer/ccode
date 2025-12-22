// Module: ko2
// Type: U
// Lines: 453344-453353
//
var ko2 = U((xo2)=>{
    Object.defineProperty(xo2, "__esModule", {
        value: !0
    });
    xo2.tryCreateFormattedUrl = void 0;
    var jA7 = (A)=>A.replace(/\/$/, ""), TA7 = (A, Q)=>{
        return jA7(new URL(Q || "", A).href);
    };
    xo2.tryCreateFormattedUrl = TA7;
});
