// Module: GC0
// Type: U
// Lines: 430034-430074
//
var GC0 = U((xv2)=>{
    Object.defineProperty(xv2, "__esModule", {
        value: !0
    });
    function Gw5(A) {
        if (!A) return {};
        let Q = A.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
        if (!Q) return {};
        let B = Q[6] || "", G = Q[8] || "";
        return {
            host: Q[4],
            path: Q[5],
            protocol: Q[2],
            search: B,
            hash: G,
            relative: Q[5] + B + G
        };
    }
    function Zw5(A) {
        return A.split(/[\?#]/, 1)[0];
    }
    function Yw5(A) {
        return A.split(/\\?\//).filter((Q)=>Q.length > 0 && Q !== ",").length;
    }
    function Jw5(A) {
        let { protocol: Q, host: B, path: G } = A, Z = (B && B.replace(/^.*@/, "[filtered]:[filtered]@").replace(/(:80)$/, "").replace(/(:443)$/, "")) || "";
        return `${Q ? `${Q}://` : ""}${Z}${G}`;
    }
    xv2.getNumberOfUrlSegments = Yw5;
    xv2.getSanitizedUrlString = Jw5;
    xv2.parseUrl = Gw5;
    xv2.stripUrlQueryAndFragment = Zw5;
});
