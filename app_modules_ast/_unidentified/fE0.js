// Module: fE0
// Type: U
// Lines: 419609-419686
//
var trackPostpone = U((fnZ, MP2)=>{
    MP2.exports = function(Q, B, G) {
        var Z = " ", Y = Q.level, J = Q.dataLevel, X = Q.schema[B], I = Q.schemaPath + Q.util.getProperty(B), W = Q.errSchemaPath + "/" + B, K = !Q.opts.allErrors, E, V = "data" + (J || ""), H = Q.opts.$data && X && X.$data, D;
        if (H) ((Z += " var schema" + Y + " = " + Q.util.getData(X.$data, J, Q.dataPathArr) + "; "), (D = "schema" + Y));
        else D = X;
        if (!(H || typeof X == "number")) throw Error(B + " must be number");
        var F = B == "maxLength" ? ">" : "<";
        if (((Z += "if ( "), H)) Z += " (" + D + " !== undefined && typeof " + D + " != 'number') || ";
        if (Q.opts.unicode === !1) Z += " " + V + ".length ";
        else Z += " ucs2length(" + V + ") ";
        Z += " " + F + " " + D + ") { ";
        var E = B, z = z || [];
        if ((z.push(Z), (Z = ""), Q.createErrors !== !1)) {
            if (((Z += " { keyword: '" + (E || "_limitLength") + "' , dataPath: (dataPath || '') + " + Q.errorPath + " , schemaPath: " + Q.util.toQuotedString(W) + " , params: { limit: " + D + " } "), Q.opts.messages !== !1)) {
                if (((Z += " , message: 'should NOT be "), B == "maxLength")) Z += "longer";
                else Z += "shorter";
                if (((Z += " than "), H)) Z += "' + " + D + " + '";
                else Z += "" + X;
                Z += " characters' ";
            }
            if (Q.opts.verbose) {
                if (((Z += " , schema:  "), H)) Z += "validate.schema" + I;
                else Z += "" + X;
                Z += "         , parentSchema: validate.schema" + Q.schemaPath + " , data: " + V + " ";
            }
            Z += " } ";
        } else Z += " {} ";
        var $ = Z;
        if (((Z = z.pop()), !Q.compositeRule && K)) if (Q.async) Z += " throw new ValidationError([" + $ + "]); ";
        else Z += " validate.errors = [" + $ + "]; return false; ";
        else Z += " var err = " + $ + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (((Z += "} "), K)) Z += " else { ";
        return Z;
    };
});
