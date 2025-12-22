// Module: _d0
// Type: U
// Lines: 15273-15293
//
var _d0 = U((Pc9, g$1)=>{
    var h$1 = /([()\][%!^"`<>&|;, *?])/g;
    function jc9(A) {
        return ((A = A.replace(h$1, "^$1")), A);
    }
    function Tc9(A, Q) {
        if (((A = `${A}`), (A = A.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"')), (A = A.replace(/(?=(\\+?)?)\1$/, "$1$1")), (A = `"${A}"`), (A = A.replace(h$1, "^$1")), Q)) A = A.replace(h$1, "^$1");
        return A;
    }
    Pc9.command = jc9;
    Pc9.argument = Tc9;
});
