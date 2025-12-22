// Module: gr2
// Type: U
// Lines: 454080-454155
//
var getComponentNameFromType = U((kkA)=>{
    Object.defineProperty(kkA, "__esModule", {
        value: !0
    });
    kkA.FetchHTTPClient = kkA.Context = kkA.Analytics = void 0;
    var q17 = renderElement();
    Object.defineProperty(kkA, "Analytics", {
        enumerable: !0,
        get: function() {
            return q17.Analytics;
        }
    });
    var N17 = iK1();
    Object.defineProperty(kkA, "Context", {
        enumerable: !0,
        get: function() {
            return N17.Context;
        }
    });
    var L17 = jw0();
    Object.defineProperty(kkA, "FetchHTTPClient", {
        enumerable: !0,
        get: function() {
            return L17.FetchHTTPClient;
        }
    });
    var O17 = renderElement();
    kkA.default = O17.Analytics;
});
function j17() {
    let A = [
        "test",
        "dev"
    ].includes("production") ? "development" : "production";
    return _17[A];
}
async function T17() {
    if (wV()) return !1;
    return !0;
}
async function Pw0(A, Q) {
    let B = await mr2();
    if (!B) return;
    try {
        let G = yw0(), Z = W3(), Y = await Ii({
            model: Q.model
        }), J = kQB(Y, Q), X = {
            anonymousId: G,
            event: A,
            properties: J
        };
        if (Z) {
            let I = Es(!0);
            ((X.userId = I.userID), (X.properties.accountUuid = Z.accountUuid), (X.properties.organizationUuid = Z.organizationUuid));
        }
        B.track(X);
    } catch (G) {
        t(G instanceof Error ? G : Error(String(G)));
    }
}
async function dr2(A) {
    let Q = await mr2();
    if (!Q) return;
    try {
        let B = yw0(), G = W3(), Z = {
            anonymousId: B,
            traits: A
        };
        if (G) {
            let Y = Es(!0);
            Z.userId = Y.userID;
        }
        Q.identify(Z);
    } catch (B) {
        t(B instanceof Error ? B : Error(String(B)));
    }
}
var ur2, _17, nK1 = null, mr2;
