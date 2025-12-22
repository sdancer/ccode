// Module: t_B
// Type: U
// Lines: 236932-236988
//
var renderElement = U((YfG, s_B)=>{
    var a_B = 1 / 0, R03 = 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, o_B = NaN, _03 = "[object Symbol]", j03 = /^\s+|\s+$/g, T03 = /^[-+]0x[0-9a-f]+$/i, P03 = /^0b[01]+$/i, S03 = /^0o[0-7]+$/i, y03 = parseInt, x03 = Object.prototype, v03 = x03.toString;
    function k03(A) {
        return typeof A == "number" && A == g03(A);
    }
    function r_B(A) {
        var Q = typeof A;
        return !!A && (Q == "object" || Q == "function");
    }
    function f03(A) {
        return !!A && typeof A == "object";
    }
    function b03(A) {
        return typeof A == "symbol" || (f03(A) && v03.call(A) == _03);
    }
    function h03(A) {
        if (!A) return A === 0 ? A : 0;
        if (((A = u03(A)), A === a_B || A === -a_B)) {
            var Q = A < 0 ? -1 : 1;
            return Q * R03;
        }
        return A === A ? A : 0;
    }
    function g03(A) {
        var Q = h03(A), B = Q % 1;
        return Q === Q ? (B ? Q - B : Q) : 0;
    }
    function u03(A) {
        if (typeof A == "number") return A;
        if (b03(A)) return o_B;
        if (r_B(A)) {
            var Q = typeof A.valueOf == "function" ? A.valueOf() : A;
            A = r_B(Q) ? Q + "" : Q;
        }
        if (typeof A != "string") return A === 0 ? A : +A;
        A = A.replace(j03, "");
        var B = P03.test(A);
        return B || S03.test(A) ? y03(A.slice(2), B ? 2 : 8) : T03.test(A) ? o_B : +A;
    }
    s_B.exports = k03;
});
