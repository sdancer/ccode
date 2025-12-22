// Module: wkQ
// Type: U
// Lines: 121698-121769
//
var pushViewTransitionAttributes = U((Vr7, UkQ)=>{
    var { maxNameValuePairSize: ts6, maxAttributeValueSize: es6 } = DkQ(), { isCTLExcludingHtab: At6 } = Hh1(), { collectASequenceOfCodePointsFast: VaA } = minimizeSupportedMimeType(), Qt6 = qA("node:assert");
    function Bt6(A) {
        if (At6(A)) return null;
        let Q = "", B = "", G = "", Z = "";
        if (A.includes(";")) {
            let Y = {
                position: 0
            };
            ((Q = VaA(";", A, Y)), (B = A.slice(Y.position)));
        } else Q = A;
        if (!Q.includes("=")) Z = Q;
        else {
            let Y = {
                position: 0
            };
            ((G = VaA("=", Q, Y)), (Z = Q.slice(Y.position + 1)));
        }
        if (((G = G.trim()), (Z = Z.trim()), G.length + Z.length > ts6)) return null;
        return {
            name: G,
            value: Z,
            ...qGA(B)
        };
    }
    function qGA(A, Q = {}) {
        if (A.length === 0) return Q;
        (Qt6(A[0] === ";"), (A = A.slice(1)));
        let B = "";
        if (A.includes(";")) ((B = VaA(";", A, {
            position: 0
        })), (A = A.slice(B.length)));
        else ((B = A), (A = ""));
        let G = "", Z = "";
        if (B.includes("=")) {
            let J = {
                position: 0
            };
            ((G = VaA("=", B, J)), (Z = B.slice(J.position + 1)));
        } else G = B;
        if (((G = G.trim()), (Z = Z.trim()), Z.length > es6)) return qGA(A, Q);
        let Y = G.toLowerCase();
        if (Y === "expires") {
            let J = new Date(Z);
            Q.expires = J;
        } else if (Y === "max-age") {
            let J = Z.charCodeAt(0);
            if ((J < 48 || J > 57) && Z[0] !== "-") return qGA(A, Q);
            if (!/^\d+$/.test(Z)) return qGA(A, Q);
            let X = Number(Z);
            Q.maxAge = X;
        } else if (Y === "domain") {
            let J = Z;
            if (J[0] === ".") J = J.slice(1);
            ((J = J.toLowerCase()), (Q.domain = J));
        } else if (Y === "path") {
            let J = "";
            if (Z.length === 0 || Z[0] !== "/") J = "/";
            else J = Z;
            Q.path = J;
        } else if (Y === "secure") Q.secure = !0;
        else if (Y === "httponly") Q.httpOnly = !0;
        else if (Y === "samesite") {
            let J = "Default", X = Z.toLowerCase();
            if (X.includes("none")) J = "None";
            if (X.includes("strict")) J = "Strict";
            if (X.includes("lax")) J = "Lax";
            Q.sameSite = J;
        } else ((Q.unparsed ??= []), Q.unparsed.push(`${G}=${Z}`));
        return qGA(A, Q);
    }
    UkQ.exports = {
        parseSetCookie: Bt6,
        parseUnparsedAttributes: qGA
    };
});
