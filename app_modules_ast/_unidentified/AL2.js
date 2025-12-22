// Module: AL2
// Type: L
// Lines: 388668-388771
//
var renderElement = L(()=>{
    bA();
    K8();
    bA();
    Mr = l(React runtime(), 1);
});
function nY1(A, Q, B, G, Z, Y, J) {
    let X = J?.id || `function-hook-${Date.now()}-${Math.random()}`, I = {
        type: "function",
        id: X,
        timeout: J?.timeout || 5000,
        callback: Z,
        errorMessage: Y
    };
    return (LY5(A, Q, B, G, I), X);
}
function LY5(A, Q, B, G, Z, Y) {
    (A((J)=>{
        let X = J.sessionHooks[Q] || {
            hooks: {}
        }, I = X.hooks[B] || [], W = I.findIndex((H)=>H.matcher === G), K;
        if (W >= 0) {
            K = [
                ...I
            ];
            let H = K[W];
            K[W] = {
                matcher: H.matcher,
                hooks: [
                    ...H.hooks,
                    {
                        hook: Z,
                        onHookSuccess: Y
                    }
                ]
            };
        } else K = [
            ...I,
            {
                matcher: G,
                hooks: [
                    {
                        hook: Z,
                        onHookSuccess: Y
                    }
                ]
            }
        ];
        let V = {
            ...X.hooks,
            [B]: K
        };
        return {
            ...J,
            sessionHooks: {
                ...J.sessionHooks,
                [Q]: {
                    hooks: V
                }
            }
        };
    }), k(`Added session hook for event ${B} in session ${Q}`));
}
function QL2(A) {
    return A.map((Q)=>({
            matcher: Q.matcher,
            hooks: Q.hooks.map((B)=>B.hook).filter((B)=>B.type !== "function")
        }));
}
function aY1(A, Q, B) {
    let G = A.sessionHooks[Q];
    if (!G) return new Map();
    let Z = new Map();
    if (B) {
        let Y = G.hooks[B];
        if (Y) Z.set(B, QL2(Y));
        return Z;
    }
    for (let Y of gIA){
        let J = G.hooks[Y];
        if (J) Z.set(Y, QL2(J));
    }
    return Z;
}
function BL2(A, Q, B) {
    let G = A.sessionHooks[Q];
    if (!G) return new Map();
    let Z = new Map(), Y = (J)=>{
        return J.map((X)=>({
                matcher: X.matcher,
                hooks: X.hooks.map((I)=>I.hook).filter((I)=>I.type === "function")
            })).filter((X)=>X.hooks.length > 0);
    };
    if (B) {
        let J = G.hooks[B];
        if (J) {
            let X = Y(J);
            if (X.length > 0) Z.set(B, X);
        }
        return Z;
    }
    for (let J of gIA){
        let X = G.hooks[J];
        if (X) {
            let I = Y(X);
            if (I.length > 0) Z.set(J, I);
        }
    }
    return Z;
}
function GL2(A, Q, B, G, Z) {
    let Y = A.sessionHooks[Q];
    if (!Y) return;
    let J = Y.hooks[B];
    if (!J) return;
    for (let X of J)if (X.matcher === G || G === "") {
        let I = X.hooks.find((W)=>IxA(W.hook, Z));
        if (I) return I;
    }
    return;
}
function XxA(A, Q) {
    (A((B)=>{
        let G = {
            ...B.sessionHooks
        };
        return (delete G[Q], {
            ...B,
            sessionHooks: G
        });
    }), k(`Cleared all session hooks for session ${Q}`));
}
