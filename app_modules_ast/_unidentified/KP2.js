// Module: KP2
// Type: U
// Lines: 418325-418388
//
var KP2 = U((_nZ, WP2)=>{
    WP2.exports = function(Q, B, G) {
        var Z = " ", Y = Q.level, J = Q.dataLevel, X = Q.schema[B], I = Q.schemaPath + Q.util.getProperty(B), W = Q.errSchemaPath + "/" + B, K = !Q.opts.allErrors, V = "data" + (J || ""), H = "valid" + Y, D = Q.opts.$data && X && X.$data, F;
        if (D) ((Z += " var schema" + Y + " = " + Q.util.getData(X.$data, J, Q.dataPathArr) + "; "), (F = "schema" + Y));
        else F = X;
        if (!D) Z += " var schema" + Y + " = validate.schema" + I + ";";
        Z += "var " + H + " = equal(" + V + ", schema" + Y + "); if (!" + H + ") {   ";
        var E = E || [];
        if ((E.push(Z), (Z = ""), Q.createErrors !== !1)) {
            if (((Z += " { keyword: 'const' , dataPath: (dataPath || '') + " + Q.errorPath + " , schemaPath: " + Q.util.toQuotedString(W) + " , params: { allowedValue: schema" + Y + " } "), Q.opts.messages !== !1)) Z += " , message: 'should be equal to constant' ";
            if (Q.opts.verbose) Z += " , schema: validate.schema" + I + " , parentSchema: validate.schema" + Q.schemaPath + " , data: " + V + " ";
            Z += " } ";
        } else Z += " {} ";
        var z = Z;
        if (((Z = E.pop()), !Q.compositeRule && K)) if (Q.async) Z += " throw new ValidationError([" + z + "]); ";
        else Z += " validate.errors = [" + z + "]; return false; ";
        else Z += " var err = " + z + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (((Z += " }"), K)) Z += " else { ";
        return Z;
    };
});
