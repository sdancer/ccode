// Module: nt0
// Type: U
// Lines: 50435-50448
//
var renderElement = U((ey7, it0)=>{
    it0.exports = ZA4;
    function ZA4(A) {
        var Q = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
        if (Q) Q(A);
        else setTimeout(A, 0);
    }
});
