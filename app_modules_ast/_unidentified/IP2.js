// Module: IP2
// Type: U
// Lines: 418307-418325
//
var useActionState = U((RnZ, XP2)=>{
    XP2.exports = function(Q, B, G) {
        var Z = " ", Y = Q.schema[B], J = Q.errSchemaPath + "/" + B, X = !Q.opts.allErrors, I = Q.util.toQuotedString(Y);
        if (Q.opts.$comment === !0) Z += " console.log(" + I + ");";
        else if (typeof Q.opts.$comment == "function") Z += " self._opts.$comment(" + I + ", " + Q.util.toQuotedString(J) + ", validate.root.schema);";
        return Z;
    };
});
