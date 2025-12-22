// Module: ZjB
// Type: U
// Lines: 237000-237034
//
var performWork = U((XfG, GjB)=>{
    var i03 = "[object Object]";
    function n03(A) {
        var Q = !1;
        if (A != null && typeof A.toString != "function") try {
            Q = !!(A + "");
        } catch (B) {}
        return Q;
    }
    function a03(A, Q) {
        return function(B) {
            return A(Q(B));
        };
    }
    var o03 = Function.prototype, QjB = Object.prototype, BjB = o03.toString, r03 = QjB.hasOwnProperty, s03 = BjB.call(Object), t03 = QjB.toString, e03 = a03(Object.getPrototypeOf, Object);
    function AQ3(A) {
        return !!A && typeof A == "object";
    }
    function QQ3(A) {
        if (!AQ3(A) || t03.call(A) != i03 || n03(A)) return !1;
        var Q = e03(A);
        if (Q === null) return !0;
        var B = r03.call(Q, "constructor") && Q.constructor;
        return typeof B == "function" && B instanceof B && BjB.call(B) == s03;
    }
    GjB.exports = QQ3;
});
