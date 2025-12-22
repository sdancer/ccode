// Module: zP2
// Type: U
// Lines: 418712-418811
//
var zP2 = U((PnZ, EP2)=>{
    EP2.exports = function(Q, B, G) {
        var Z = " ", Y = Q.level, J = Q.dataLevel, X = Q.schema[B], I = Q.schemaPath + Q.util.getProperty(B), W = Q.errSchemaPath + "/" + B, K = !Q.opts.allErrors, V = "data" + (J || ""), H = "valid" + Y, D = Q.opts.$data && X && X.$data, F;
        if (D) ((Z += " var schema" + Y + " = " + Q.util.getData(X.$data, J, Q.dataPathArr) + "; "), (F = "schema" + Y));
        else F = X;
        var E = "i" + Y, z = "schema" + Y;
        if (!D) Z += " var " + z + " = validate.schema" + I + ";";
        if (((Z += "var " + H + ";"), D)) Z += " if (schema" + Y + " === undefined) " + H + " = true; else if (!Array.isArray(schema" + Y + ")) " + H + " = false; else {";
        if (((Z += "" + H + " = false;for (var " + E + "=0; " + E + "<" + z + ".length; " + E + "++) if (equal(" + V + ", " + z + "[" + E + "])) { " + H + " = true; break; }"), D)) Z += "  }  ";
        Z += " if (!" + H + ") {   ";
        var $ = $ || [];
        if (($.push(Z), (Z = ""), Q.createErrors !== !1)) {
            if (((Z += " { keyword: 'enum' , dataPath: (dataPath || '') + " + Q.errorPath + " , schemaPath: " + Q.util.toQuotedString(W) + " , params: { allowedValues: schema" + Y + " } "), Q.opts.messages !== !1)) Z += " , message: 'should be equal to one of the allowed values' ";
            if (Q.opts.verbose) Z += " , schema: validate.schema" + I + " , parentSchema: validate.schema" + Q.schemaPath + " , data: " + V + " ";
            Z += " } ";
        } else Z += " {} ";
        var O = Z;
        if (((Z = $.pop()), !Q.compositeRule && K)) if (Q.async) Z += " throw new ValidationError([" + O + "]); ";
        else Z += " validate.errors = [" + O + "]; return false; ";
        else Z += " var err = " + O + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (((Z += " }"), K)) Z += " else { ";
        return Z;
    };
});
