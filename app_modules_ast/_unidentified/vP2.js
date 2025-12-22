// Module: vP2
// Type: U
// Lines: 420076-420145
//
var vP2 = U((mnZ, xP2)=>{
    xP2.exports = function(Q, B, G) {
        var Z = " ", Y = Q.level, J = Q.dataLevel, X = Q.schema[B], I = Q.schemaPath + Q.util.getProperty(B), W = Q.errSchemaPath + "/" + B, K = !Q.opts.allErrors, V = "data" + (J || ""), H = Q.opts.$data && X && X.$data, D;
        if (H) ((Z += " var schema" + Y + " = " + Q.util.getData(X.$data, J, Q.dataPathArr) + "; "), (D = "schema" + Y));
        else D = X;
        var F = H ? "(new RegExp(" + D + "))" : Q.usePattern(X);
        if (((Z += "if ( "), H)) Z += " (" + D + " !== undefined && typeof " + D + " != 'string') || ";
        Z += " !" + F + ".test(" + V + ") ) {   ";
        var E = E || [];
        if ((E.push(Z), (Z = ""), Q.createErrors !== !1)) {
            if (((Z += " { keyword: 'pattern' , dataPath: (dataPath || '') + " + Q.errorPath + " , schemaPath: " + Q.util.toQuotedString(W) + " , params: { pattern:  "), H)) Z += "" + D;
            else Z += "" + Q.util.toQuotedString(X);
            if (((Z += "  } "), Q.opts.messages !== !1)) {
                if (((Z += ` , message: 'should match pattern "`), H)) Z += "' + " + D + " + '";
                else Z += "" + Q.util.escapeQuotes(X);
                Z += `"' `;
            }
            if (Q.opts.verbose) {
                if (((Z += " , schema:  "), H)) Z += "validate.schema" + I;
                else Z += "" + Q.util.toQuotedString(X);
                Z += "         , parentSchema: validate.schema" + Q.schemaPath + " , data: " + V + " ";
            }
            Z += " } ";
        } else Z += " {} ";
        var z = Z;
        if (((Z = E.pop()), !Q.compositeRule && K)) if (Q.async) Z += " throw new ValidationError([" + z + "]); ";
        else Z += " validate.errors = [" + z + "]; return false; ";
        else Z += " var err = " + z + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (((Z += "} "), K)) Z += " else { ";
        return Z;
    };
});
