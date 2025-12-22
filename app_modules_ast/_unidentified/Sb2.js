// Module: Sb2
// Type: U
// Lines: 434958-434988
//
var Sb2 = U((Pb2)=>{
    Object.defineProperty(Pb2, "__esModule", {
        value: !0
    });
    var jb2 = FQ(), Yy5 = sK(), Jy5 = createRenderState(), Xy5 = qf();
    function Iy5(A, Q) {
        if (Q.debug === !0) if (Yy5.DEBUG_BUILD) jb2.logger.enable();
        else jb2.consoleSandbox(()=>{
            console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
        });
        Jy5.getCurrentScope().update(Q.initialScope);
        let G = new A(Q);
        (Tb2(G), Wy5(G));
    }
    function Tb2(A) {
        let B = Xy5.getCurrentHub().getStackTop();
        ((B.client = A), B.scope.setClient(A));
    }
    function Wy5(A) {
        if (A.init) A.init();
        else if (A.setupIntegrations) A.setupIntegrations();
    }
    Pb2.initAndBind = Iy5;
    Pb2.setCurrentClient = Tb2;
});
