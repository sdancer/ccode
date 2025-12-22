// Module: A9Q
// Type: U
// Lines: 60329-60344
//
var performWork = U((nu7, e2Q)=>{
    e2Q.exports = function(Q) {
        return Q.map(function(B) {
            if (B === "") return "''";
            if (B && typeof B === "object") return B.op.replace(/(.)/g, "\\$1");
            if (/["\s\\]/.test(B) && !/'/.test(B)) return "'" + B.replace(/(['])/g, "\\$1") + "'";
            if (/["'\s]/.test(B)) return '"' + B.replace(/(["\\$`!])/g, "\\$1") + '"';
            return String(B).replace(/([A-Za-z]:)?([#!"$&'()*,:;<=>?@[\\\]^`{|}])/g, "$1\\$2");
        }).join(" ");
    };
});
