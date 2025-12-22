// Module: n_B
// Type: U
// Lines: 236920-236932
//
var describeObjectForErrorMessage = U((ZfG, i_B)=>{
    var q03 = "[object Boolean]", N03 = Object.prototype, L03 = N03.toString;
    function O03(A) {
        return A === !0 || A === !1 || (M03(A) && L03.call(A) == q03);
    }
    function M03(A) {
        return !!A && typeof A == "object";
    }
    i_B.exports = O03;
});
