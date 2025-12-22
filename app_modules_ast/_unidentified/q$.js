// Module: q$
// Type: U
// Lines: 341191-341237
//
var q$ = U((F72)=>{
    Object.defineProperty(F72, "__esModule", {
        value: !0
    });
    F72.parseUri = $l3;
    F72.splitHostPort = Ul3;
    F72.combineHostPort = wl3;
    F72.uriToString = ql3;
    var Cl3 = /^(?:([A-Za-z0-9+.-]+):)?(?:\/\/([^/]*)\/)?(.+)$/;
    function $l3(A) {
        let Q = Cl3.exec(A);
        if (Q === null) return null;
        return {
            scheme: Q[1],
            authority: Q[2],
            path: Q[3]
        };
    }
    var D72 = /^\d+$/;
    function Ul3(A) {
        if (A.startsWith("[")) {
            let Q = A.indexOf("]");
            if (Q === -1) return null;
            let B = A.substring(1, Q);
            if (B.indexOf(":") === -1) return null;
            if (A.length > Q + 1) if (A[Q + 1] === ":") {
                let G = A.substring(Q + 2);
                if (D72.test(G)) return {
                    host: B,
                    port: +G
                };
                else return null;
            } else return null;
            else return {
                host: B
            };
        } else {
            let Q = A.split(":");
            if (Q.length === 2) if (D72.test(Q[1])) return {
                host: Q[0],
                port: +Q[1]
            };
            else return null;
            else return {
                host: A
            };
        }
    }
    function wl3(A) {
        if (A.port === void 0) return A.host;
        else if (A.host.includes(":")) return `[${A.host}]:${A.port}`;
        else return `${A.host}:${A.port}`;
    }
    function ql3(A) {
        let Q = "";
        if (A.scheme !== void 0) Q += A.scheme + ":";
        if (A.authority !== void 0) Q += "//" + A.authority + "/";
        return ((Q += A.path), Q);
    }
});
