// Module: yV0
// Type: U
// Lines: 381813-381894
//
var yV0 = U((cSZ, Dw2)=>{
    var yyA = cVA(), PV0 = Ez();
    function Hw2(A, Q) {
        var B = [];
        return (A[Q].forEach(function(G) {
            var Z = B.length;
            (B.forEach(function(Y, J) {
                if (Y.tag === G.tag && Y.kind === G.kind && Y.multi === G.multi) Z = J;
            }), (B[Z] = G));
        }), B);
    }
    function W55() {
        var A = {
            scalar: {},
            sequence: {},
            mapping: {},
            fallback: {},
            multi: {
                scalar: [],
                sequence: [],
                mapping: [],
                fallback: []
            }
        }, Q, B;
        function G(Z) {
            if (Z.multi) (A.multi[Z.kind].push(Z), A.multi.fallback.push(Z));
            else A[Z.kind][Z.tag] = A.fallback[Z.tag] = Z;
        }
        for(Q = 0, B = arguments.length; Q < B; Q += 1)arguments[Q].forEach(G);
        return A;
    }
    function SV0(A) {
        return this.extend(A);
    }
    SV0.prototype.extend = function(Q) {
        var B = [], G = [];
        if (Q instanceof PV0) G.push(Q);
        else if (Array.isArray(Q)) G = G.concat(Q);
        else if (Q && (Array.isArray(Q.implicit) || Array.isArray(Q.explicit))) {
            if (Q.implicit) B = B.concat(Q.implicit);
            if (Q.explicit) G = G.concat(Q.explicit);
        } else throw new yyA("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
        (B.forEach(function(Y) {
            if (!(Y instanceof PV0)) throw new yyA("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            if (Y.loadKind && Y.loadKind !== "scalar") throw new yyA("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
            if (Y.multi) throw new yyA("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
        }), G.forEach(function(Y) {
            if (!(Y instanceof PV0)) throw new yyA("Specified list of YAML types (or a single Type object) contains a non-Type object.");
        }));
        var Z = Object.create(SV0.prototype);
        return ((Z.implicit = (this.implicit || []).concat(B)), (Z.explicit = (this.explicit || []).concat(G)), (Z.compiledImplicit = Hw2(Z, "implicit")), (Z.compiledExplicit = Hw2(Z, "explicit")), (Z.compiledTypeMap = W55(Z.compiledImplicit, Z.compiledExplicit)), Z);
    };
    Dw2.exports = SV0;
});
