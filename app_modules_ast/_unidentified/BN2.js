// Module: BN2
// Type: U
// Lines: 384555-384693
//
var renderChildrenArray = U(($yZ, Bf)=>{
    var QN2 = rU2(), XZ5 = createRenderState(), RY1 = renderElement(), IZ5 = performWork(), WZ5 = renderChildrenArray(), KZ5 = performWork(), aVA = V_(), { JSONParserError: VZ5, InvalidPointerError: HZ5, MissingPointerError: DZ5, ResolverError: FZ5, ParserError: EZ5, UnmatchedParserError: zZ5, UnmatchedResolverError: CZ5, isHandledError: $Z5, JSONParserErrorGroup: eq2 } = describeNativeComponentFrame(), XS = tq2(), { ono: AN2 } = renderChildrenArray();
    Bf.exports = Qf;
    Bf.exports.default = Qf;
    Bf.exports.JSONParserError = VZ5;
    Bf.exports.InvalidPointerError = HZ5;
    Bf.exports.MissingPointerError = DZ5;
    Bf.exports.ResolverError = FZ5;
    Bf.exports.ParserError = EZ5;
    Bf.exports.UnmatchedParserError = zZ5;
    Bf.exports.UnmatchedResolverError = CZ5;
    function Qf() {
        ((this.schema = null), (this.$refs = new QN2()));
    }
    Qf.parse = function(Q, B, G, Z) {
        let J = new this();
        return J.parse.apply(J, arguments);
    };
    Qf.prototype.parse = async function(Q, B, G, Z) {
        let Y = RY1(arguments), J;
        if (!Y.path && !Y.schema) {
            let W = AN2(`Expected a file path, URL, or object. Got ${Y.path || Y.schema}`);
            return XS(Y.callback, Promise.reject(W));
        }
        ((this.schema = null), (this.$refs = new QN2()));
        let X = "http";
        if (aVA.isFileSystemPath(Y.path)) ((Y.path = aVA.fromFileSystemPath(Y.path)), (X = "file"));
        if (((Y.path = aVA.resolve(aVA.cwd(), Y.path)), Y.schema && typeof Y.schema === "object")) {
            let W = this.$refs._add(Y.path);
            ((W.value = Y.schema), (W.pathType = X), (J = Promise.resolve(Y.schema)));
        } else J = XZ5(Y.path, this.$refs, Y.options);
        let I = this;
        try {
            let W = await J;
            if (W !== null && typeof W === "object" && !Buffer.isBuffer(W)) return ((I.schema = W), XS(Y.callback, Promise.resolve(I.schema)));
            else if (Y.options.continueOnError) return ((I.schema = null), XS(Y.callback, Promise.resolve(I.schema)));
            else throw AN2.syntax(`"${I.$refs._root$Ref.path || W}" is not a valid JSON Schema`);
        } catch (W) {
            if (!Y.options.continueOnError || !$Z5(W)) return XS(Y.callback, Promise.reject(W));
            if (this.$refs._$refs[aVA.stripHash(Y.path)]) this.$refs._$refs[aVA.stripHash(Y.path)].addError(W);
            return XS(Y.callback, Promise.resolve(null));
        }
    };
    Qf.resolve = function(Q, B, G, Z) {
        let J = new this();
        return J.resolve.apply(J, arguments);
    };
    Qf.prototype.resolve = async function(Q, B, G, Z) {
        let Y = this, J = RY1(arguments);
        try {
            return (await this.parse(J.path, J.schema, J.options), await IZ5(Y, J.options), FH0(Y), XS(J.callback, Promise.resolve(Y.$refs)));
        } catch (X) {
            return XS(J.callback, Promise.reject(X));
        }
    };
    Qf.bundle = function(Q, B, G, Z) {
        let J = new this();
        return J.bundle.apply(J, arguments);
    };
    Qf.prototype.bundle = async function(Q, B, G, Z) {
        let Y = this, J = RY1(arguments);
        try {
            return (await this.resolve(J.path, J.schema, J.options), WZ5(Y, J.options), FH0(Y), XS(J.callback, Promise.resolve(Y.schema)));
        } catch (X) {
            return XS(J.callback, Promise.reject(X));
        }
    };
    Qf.dereference = function(Q, B, G, Z) {
        let J = new this();
        return J.dereference.apply(J, arguments);
    };
    Qf.prototype.dereference = async function(Q, B, G, Z) {
        let Y = this, J = RY1(arguments);
        try {
            return (await this.resolve(J.path, J.schema, J.options), KZ5(Y, J.options), FH0(Y), XS(J.callback, Promise.resolve(Y.schema)));
        } catch (X) {
            return XS(J.callback, Promise.reject(X));
        }
    };
    function FH0(A) {
        if (eq2.getParserErrors(A).length > 0) throw new eq2(A);
    }
});
var GN2 = 40000, EH0, KD, bV;
