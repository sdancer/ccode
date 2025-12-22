// Module: dAQ
// Type: L
// Lines: 51602-51646
//
var dAQ = L(()=>{
    DzA();
    uAQ = gAQ.prototype;
    uAQ.append = function(Q, B) {
        this._pairs.push([
            Q,
            B
        ]);
    };
    uAQ.toString = function(Q) {
        let B = Q ? function(G) {
            return Q.call(this, G, hAQ);
        } : hAQ;
        return this._pairs.map(function(Z) {
            return B(Z[0]) + "=" + B(Z[1]);
        }, "").join("&");
    };
    mAQ = gAQ;
});
function k14(A) {
    return encodeURIComponent(A).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Ke(A, Q, B) {
    if (!Q) return A;
    let G = (B && B.encode) || k14;
    if (n1.isFunction(B)) B = {
        serialize: B
    };
    let Z = B && B.serialize, Y;
    if (Z) Y = Z(Q, B);
    else Y = n1.isURLSearchParams(Q) ? Q.toString() : new mAQ(Q, B).toString(G);
    if (Y) {
        let J = A.indexOf("#");
        if (J !== -1) A = A.slice(0, J);
        A += (A.indexOf("?") === -1 ? "?" : "&") + Y;
    }
    return A;
}
