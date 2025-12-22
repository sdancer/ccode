// Module: AjB
// Type: U
// Lines: 236988-237000
//
var performWork = U((JfG, e_B)=>{
    var m03 = "[object Number]", d03 = Object.prototype, c03 = d03.toString;
    function p03(A) {
        return !!A && typeof A == "object";
    }
    function l03(A) {
        return typeof A == "number" || (p03(A) && c03.call(A) == m03);
    }
    e_B.exports = l03;
});
