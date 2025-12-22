// Module: JjB
// Type: U
// Lines: 237034-237047
//
var createRenderState = U((IfG, YjB)=>{
    var BQ3 = "[object String]", GQ3 = Object.prototype, ZQ3 = GQ3.toString, YQ3 = Array.isArray;
    function JQ3(A) {
        return !!A && typeof A == "object";
    }
    function XQ3(A) {
        return typeof A == "string" || (!YQ3(A) && JQ3(A) && ZQ3.call(A) == BQ3);
    }
    YjB.exports = XQ3;
});
