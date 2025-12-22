// Module: pV0
// Type: U
// Lines: 382259-382339
//
var pV0 = U((QyZ, jw2)=>{
    var c55 = Ez(), cV0 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
    function p55(A) {
        if (A === null) return !1;
        var Q, B, G = 0, Z = A.length, Y = cV0;
        for(B = 0; B < Z; B++){
            if (((Q = Y.indexOf(A.charAt(B))), Q > 64)) continue;
            if (Q < 0) return !1;
            G += 6;
        }
        return G % 8 === 0;
    }
    function l55(A) {
        var Q, B, G = A.replace(/[\r\n=]/g, ""), Z = G.length, Y = cV0, J = 0, X = [];
        for(Q = 0; Q < Z; Q++){
            if (Q % 4 === 0 && Q) (X.push((J >> 16) & 255), X.push((J >> 8) & 255), X.push(J & 255));
            J = (J << 6) | Y.indexOf(G.charAt(Q));
        }
        if (((B = (Z % 4) * 6), B === 0)) (X.push((J >> 16) & 255), X.push((J >> 8) & 255), X.push(J & 255));
        else if (B === 18) (X.push((J >> 10) & 255), X.push((J >> 2) & 255));
        else if (B === 12) X.push((J >> 4) & 255);
        return new Uint8Array(X);
    }
    function i55(A) {
        var Q = "", B = 0, G, Z, Y = A.length, J = cV0;
        for(G = 0; G < Y; G++){
            if (G % 3 === 0 && G) ((Q += J[(B >> 18) & 63]), (Q += J[(B >> 12) & 63]), (Q += J[(B >> 6) & 63]), (Q += J[B & 63]));
            B = (B << 8) + A[G];
        }
        if (((Z = Y % 3), Z === 0)) ((Q += J[(B >> 18) & 63]), (Q += J[(B >> 12) & 63]), (Q += J[(B >> 6) & 63]), (Q += J[B & 63]));
        else if (Z === 2) ((Q += J[(B >> 10) & 63]), (Q += J[(B >> 4) & 63]), (Q += J[(B << 2) & 63]), (Q += J[64]));
        else if (Z === 1) ((Q += J[(B >> 2) & 63]), (Q += J[(B << 4) & 63]), (Q += J[64]), (Q += J[64]));
        return Q;
    }
    function n55(A) {
        return Object.prototype.toString.call(A) === "[object Uint8Array]";
    }
    jw2.exports = new c55("tag:yaml.org,2002:binary", {
        kind: "scalar",
        resolve: p55,
        construct: l55,
        predicate: n55,
        represent: i55
    });
});
