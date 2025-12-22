// Module: qvA
// Type: U
// Lines: 428966-429063
//
var qvA = U((mx2)=>{
    Object.defineProperty(mx2, "__esModule", {
        value: !0
    });
    var PC5 = L_(), Pz0 = createRenderState(), SC5 = renderChildrenArray();
    function yC5() {
        let A = SC5.GLOBAL_OBJ, Q = A.crypto || A.msCrypto, B = ()=>Math.random() * 16;
        try {
            if (Q && Q.randomUUID) return Q.randomUUID().replace(/-/g, "");
            if (Q && Q.getRandomValues) B = ()=>{
                let G = new Uint8Array(1);
                return (Q.getRandomValues(G), G[0]);
            };
        } catch (G) {}
        return ([
            1e7
        ] + 1000 + 4000 + 8000 + 100000000000).replace(/[018]/g, (G)=>(G ^ ((B() & 15) >> (G / 4))).toString(16));
    }
    function ux2(A) {
        return A.exception && A.exception.values ? A.exception.values[0] : void 0;
    }
    function xC5(A) {
        let { message: Q, event_id: B } = A;
        if (Q) return Q;
        let G = ux2(A);
        if (G) {
            if (G.type && G.value) return `${G.type}: ${G.value}`;
            return G.type || G.value || B || "<unknown>";
        }
        return B || "<unknown>";
    }
    function vC5(A, Q, B) {
        let G = (A.exception = A.exception || {}), Z = (G.values = G.values || []), Y = (Z[0] = Z[0] || {});
        if (!Y.value) Y.value = Q || "";
        if (!Y.type) Y.type = B || "Error";
    }
    function kC5(A, Q) {
        let B = ux2(A);
        if (!B) return;
        let G = {
            type: "generic",
            handled: !0
        }, Z = B.mechanism;
        if (((B.mechanism = {
            ...G,
            ...Z,
            ...Q
        }), Q && "data" in Q)) {
            let Y = {
                ...(Z && Z.data),
                ...Q.data
            };
            B.mechanism.data = Y;
        }
    }
    var fC5 = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    function bC5(A) {
        let Q = A.match(fC5) || [], B = parseInt(Q[1], 10), G = parseInt(Q[2], 10), Z = parseInt(Q[3], 10);
        return {
            buildmetadata: Q[5],
            major: isNaN(B) ? void 0 : B,
            minor: isNaN(G) ? void 0 : G,
            patch: isNaN(Z) ? void 0 : Z,
            prerelease: Q[4]
        };
    }
    function hC5(A, Q, B = 5) {
        if (Q.lineno === void 0) return;
        let G = A.length, Z = Math.max(Math.min(G - 1, Q.lineno - 1), 0);
        ((Q.pre_context = A.slice(Math.max(0, Z - B), Z).map((Y)=>Pz0.snipLine(Y, 0))), (Q.context_line = Pz0.snipLine(A[Math.min(G - 1, Z)], Q.colno || 0)), (Q.post_context = A.slice(Math.min(Z + 1, G), Z + 1 + B).map((Y)=>Pz0.snipLine(Y, 0))));
    }
    function gC5(A) {
        if (A && A.__sentry_captured__) return !0;
        try {
            PC5.addNonEnumerableProperty(A, "__sentry_captured__", !0);
        } catch (Q) {}
        return !1;
    }
    function uC5(A) {
        return Array.isArray(A) ? A : [
            A
        ];
    }
    mx2.addContextToFrame = hC5;
    mx2.addExceptionMechanism = kC5;
    mx2.addExceptionTypeValue = vC5;
    mx2.arrayify = uC5;
    mx2.checkOrSetAlreadyCaught = gC5;
    mx2.getEventDescription = xC5;
    mx2.parseSemver = bC5;
    mx2.uuid4 = yC5;
});
