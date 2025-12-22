// Module: lV0
// Type: U
// Lines: 382339-382373
//
var retryNode = U((ByZ, Tw2)=>{
    var a55 = Ez(), o55 = Object.prototype.hasOwnProperty, r55 = Object.prototype.toString;
    function s55(A) {
        if (A === null) return !0;
        var Q = [], B, G, Z, Y, J, X = A;
        for(B = 0, G = X.length; B < G; B += 1){
            if (((Z = X[B]), (J = !1), r55.call(Z) !== "[object Object]")) return !1;
            for(Y in Z)if (o55.call(Z, Y)) if (!J) J = !0;
            else return !1;
            if (!J) return !1;
            if (Q.indexOf(Y) === -1) Q.push(Y);
            else return !1;
        }
        return !0;
    }
    function t55(A) {
        return A !== null ? A : [];
    }
    Tw2.exports = new a55("tag:yaml.org,2002:omap", {
        kind: "sequence",
        resolve: s55,
        construct: t55
    });
});
