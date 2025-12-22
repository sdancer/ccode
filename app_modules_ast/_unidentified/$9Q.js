// Module: $9Q
// Type: U
// Lines: 61084-61103
//
var performWork = U((Em7, C9Q)=>{
    C9Q.exports = N64;
    var q64 = Object.getPrototypeOf || function(A) {
        return A.__proto__;
    };
    function N64(A) {
        if (A === null || typeof A !== "object") return A;
        if (A instanceof Object) var Q = {
            __proto__: q64(A)
        };
        else var Q = Object.create(null);
        return (Object.getOwnPropertyNames(A).forEach(function(B) {
            Object.defineProperty(Q, B, Object.getOwnPropertyDescriptor(A, B));
        }), Q);
    }
});
