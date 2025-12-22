// Module: O0A
// Type: L
// Lines: 223007-223055
//
var createRenderState = L(()=>{
    LwB();
    (($r1 = A01({
        logLevelEnvVarName: "AZURE_LOG_LEVEL",
        namespace: "azure"
    })), (ING = $r1.logger));
});
function Z01(A) {
    return A.reduce((Q, B)=>{
        if (process.env[B]) Q.assigned.push(B);
        else Q.missing.push(B);
        return Q;
    }, {
        missing: [],
        assigned: []
    });
}
function uH(A) {
    return `SUCCESS. Scopes: ${Array.isArray(A) ? A.join(", ") : A}.`;
}
function MG(A, Q) {
    let B = "ERROR.";
    if (A === null || A === void 0 ? void 0 : A.length) B += ` Scopes: ${Array.isArray(A) ? A.join(", ") : A}.`;
    return `${B} Error message: ${typeof Q === "string" ? Q : Q.message}.`;
}
function OwB(A, Q, B = WR) {
    let G = Q ? `${Q.fullTitle} ${A}` : A;
    function Z(I) {
        B.info(`${G} =>`, I);
    }
    function Y(I) {
        B.warning(`${G} =>`, I);
    }
    function J(I) {
        B.verbose(`${G} =>`, I);
    }
    function X(I) {
        B.error(`${G} =>`, I);
    }
    return {
        title: A,
        fullTitle: G,
        info: Z,
        warning: Y,
        verbose: J,
        error: X
    };
}
function g7(A, Q = WR) {
    let B = OwB(A, void 0, Q);
    return Object.assign(Object.assign({}, B), {
        parent: Q,
        getToken: OwB("=> getToken()", B, Q)
    });
}
var WR;
