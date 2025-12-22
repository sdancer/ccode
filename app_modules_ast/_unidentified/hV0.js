// Module: hV0
// Type: U
// Lines: 381966-382001
//
var updateValueIfChanged = U((oSZ, Uw2)=>{
    var $55 = Ez();
    function U55(A) {
        if (A === null) return !1;
        var Q = A.length;
        return ((Q === 4 && (A === "true" || A === "True" || A === "TRUE")) || (Q === 5 && (A === "false" || A === "False" || A === "FALSE")));
    }
    function w55(A) {
        return A === "true" || A === "True" || A === "TRUE";
    }
    function q55(A) {
        return Object.prototype.toString.call(A) === "[object Boolean]";
    }
    Uw2.exports = new $55("tag:yaml.org,2002:bool", {
        kind: "scalar",
        resolve: U55,
        construct: w55,
        predicate: q55,
        represent: {
            lowercase: function(A) {
                return A ? "true" : "false";
            },
            uppercase: function(A) {
                return A ? "TRUE" : "FALSE";
            },
            camelcase: function(A) {
                return A ? "True" : "False";
            }
        },
        defaultStyle: "lowercase"
    });
});
