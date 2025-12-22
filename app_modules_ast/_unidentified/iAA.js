// Module: iAA
// Type: U
// Lines: 126516-126566
//
var iAA = U((DgQ)=>{
    Object.defineProperty(DgQ, "__esModule", {
        value: !0
    });
    DgQ.unregisterGlobal = DgQ.getGlobal = DgQ.registerGlobal = void 0;
    var SQ8 = YgQ(), gGA = oh1(), yQ8 = HgQ(), xQ8 = gGA.VERSION.split(".")[0], SwA = Symbol.for(`opentelemetry.js.api.${xQ8}`), ywA = SQ8._globalThis;
    function vQ8(A, Q, B, G = !1) {
        var Z;
        let Y = (ywA[SwA] = (Z = ywA[SwA]) !== null && Z !== void 0 ? Z : {
            version: gGA.VERSION
        });
        if (!G && Y[A]) {
            let J = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${A}`);
            return (B.error(J.stack || J.message), !1);
        }
        if (Y.version !== gGA.VERSION) {
            let J = Error(`@opentelemetry/api: Registration of version v${Y.version} for ${A} does not match previously registered API v${gGA.VERSION}`);
            return (B.error(J.stack || J.message), !1);
        }
        return ((Y[A] = Q), B.debug(`@opentelemetry/api: Registered a global for ${A} v${gGA.VERSION}.`), !0);
    }
    DgQ.registerGlobal = vQ8;
    function kQ8(A) {
        var Q, B;
        let G = (Q = ywA[SwA]) === null || Q === void 0 ? void 0 : Q.version;
        if (!G || !(0, yQ8.isCompatible)(G)) return;
        return (B = ywA[SwA]) === null || B === void 0 ? void 0 : B[A];
    }
    DgQ.getGlobal = kQ8;
    function fQ8(A, Q) {
        Q.debug(`@opentelemetry/api: Unregistering a global for ${A} v${gGA.VERSION}.`);
        let B = ywA[SwA];
        if (B) delete B[A];
    }
    DgQ.unregisterGlobal = fQ8;
});
