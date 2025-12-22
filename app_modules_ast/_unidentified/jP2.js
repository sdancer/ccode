// Module: jP2
// Type: U
// Lines: 419761-419840
//
var trackPostpone = U((hnZ, _P2)=>{
    _P2.exports = function(Q, B, G) {
        var Z = " ", Y = Q.level, J = Q.dataLevel, X = Q.schema[B], I = Q.schemaPath + Q.util.getProperty(B), W = Q.errSchemaPath + "/" + B, K = !Q.opts.allErrors, V = "data" + (J || ""), H = Q.opts.$data && X && X.$data, D;
        if (H) ((Z += " var schema" + Y + " = " + Q.util.getData(X.$data, J, Q.dataPathArr) + "; "), (D = "schema" + Y));
        else D = X;
        if (!(H || typeof X == "number")) throw Error(B + " must be number");
        if (((Z += "var division" + Y + ";if ("), H)) Z += " " + D + " !== undefined && ( typeof " + D + " != 'number' || ";
        if (((Z += " (division" + Y + " = " + V + " / " + D + ", "), Q.opts.multipleOfPrecision)) Z += " Math.abs(Math.round(division" + Y + ") - division" + Y + ") > 1e-" + Q.opts.multipleOfPrecision + " ";
        else Z += " division" + Y + " !== parseInt(division" + Y + ") ";
        if (((Z += " ) "), H)) Z += "  )  ";
        Z += " ) {   ";
        var F = F || [];
        if ((F.push(Z), (Z = ""), Q.createErrors !== !1)) {
            if (((Z += " { keyword: 'multipleOf' , dataPath: (dataPath || '') + " + Q.errorPath + " , schemaPath: " + Q.util.toQuotedString(W) + " , params: { multipleOf: " + D + " } "), Q.opts.messages !== !1)) if (((Z += " , message: 'should be multiple of "), H)) Z += "' + " + D;
            else Z += "" + D + "'";
            if (Q.opts.verbose) {
                if (((Z += " , schema:  "), H)) Z += "validate.schema" + I;
                else Z += "" + X;
                Z += "         , parentSchema: validate.schema" + Q.schemaPath + " , data: " + V + " ";
            }
            Z += " } ";
        } else Z += " {} ";
        var E = Z;
        if (((Z = F.pop()), !Q.compositeRule && K)) if (Q.async) Z += " throw new ValidationError([" + E + "]); ";
        else Z += " validate.errors = [" + E + "]; return false; ";
        else Z += " var err = " + E + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (((Z += "} "), K)) Z += " else { ";
        return Z;
    };
});
