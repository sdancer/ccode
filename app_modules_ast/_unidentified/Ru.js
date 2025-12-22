// Module: Ru
// Type: L
// Lines: 245729-245775
//
var describeNativeComponentFrame = L(()=>{
    createRenderState();
    vM();
    A4();
    pushStartInstance();
    i0();
});
function $0(A, Q, B) {
    function G(X, I) {
        var W;
        (Object.defineProperty(X, "_zod", {
            value: X._zod ?? {},
            enumerable: !1
        }), (W = X._zod).traits ?? (W.traits = new Set()), X._zod.traits.add(A), Q(X, I));
        for(let K in J.prototype)if (!(K in X)) Object.defineProperty(X, K, {
            value: J.prototype[K].bind(X)
        });
        ((X._zod.constr = J), (X._zod.def = I));
    }
    let Z = B?.Parent ?? Object;
    class Y extends Z {
    }
    Object.defineProperty(Y, "name", {
        value: A
    });
    function J(X) {
        var I;
        let W = B?.Parent ? new Y() : this;
        (G(W, X), (I = W._zod).deferred ?? (I.deferred = []));
        for (let K of W._zod.deferred)K();
        return W;
    }
    return (Object.defineProperty(J, "init", {
        value: G
    }), Object.defineProperty(J, Symbol.hasInstance, {
        value: (X)=>{
            if (B?.Parent && X instanceof B.Parent) return !0;
            return X?._zod?.traits?.has(A);
        }
    }), Object.defineProperty(J, "name", {
        value: A
    }), J);
}
function xK(A) {
    if (A) Object.assign(NRA, A);
    return NRA;
}
var LRA, Y10, _u, NRA;
