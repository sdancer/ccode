// Module: oq2
// Type: U
// Lines: 384523-384535
//
var performWork = U((zyZ, aq2)=>{
    function JZ5() {
        if (typeof process === "object" && typeof process.nextTick === "function") return process.nextTick;
        else if (typeof setImmediate === "function") return setImmediate;
        else return function(Q) {
            setTimeout(Q, 0);
        };
    }
    aq2.exports = JZ5();
});
