// Module: bV0
// Type: U
// Lines: 381925-381966
//
var bV0 = U((aSZ, $w2)=>{
    var F55 = Ez();
    function E55(A) {
        if (A === null) return !0;
        var Q = A.length;
        return ((Q === 1 && A === "~") || (Q === 4 && (A === "null" || A === "Null" || A === "NULL")));
    }
    function z55() {
        return null;
    }
    function C55(A) {
        return A === null;
    }
    $w2.exports = new F55("tag:yaml.org,2002:null", {
        kind: "scalar",
        resolve: E55,
        construct: z55,
        predicate: C55,
        represent: {
            canonical: function() {
                return "~";
            },
            lowercase: function() {
                return "null";
            },
            uppercase: function() {
                return "NULL";
            },
            camelcase: function() {
                return "Null";
            },
            empty: function() {
                return "";
            }
        },
        defaultStyle: "lowercase"
    });
});
