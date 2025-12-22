// Module: Y5B
// Type: U
// Lines: 175415-175428
//
var createRenderState = U((hXG, Z5B)=>{
    Z5B.exports = function(Q) {
        if (!Q || typeof Q === "string") return !1;
        return (Q instanceof Array || Array.isArray(Q) || (Q.length >= 0 && (Q.splice instanceof Function || (Object.getOwnPropertyDescriptor(Q, Q.length - 1) && Q.constructor.name !== "String"))));
    };
});
