// Module: gmA
// Type: U
// Lines: 55241-55284
//
var gmA = U((m0Q)=>{
    Object.defineProperty(m0Q, "__esModule", {
        value: !0
    });
    m0Q._notifyVisibilityChanged = m0Q._subscribeToVisiblityChanged = m0Q._isUnloading = m0Q._isCurrentlyVisible = void 0;
    var bmA = createRenderState(), hmA = "foreground", Tq1 = "background", u0Q = [], jq1 = hmA, Pq1 = !1, pQ4 = ()=>{
        return jq1 === hmA;
    };
    m0Q._isCurrentlyVisible = pQ4;
    var lQ4 = ()=>Pq1;
    m0Q._isUnloading = lQ4;
    var iQ4 = (A)=>{
        u0Q.unshift(A);
    };
    m0Q._subscribeToVisiblityChanged = iQ4;
    var nQ4 = (A)=>{
        if (A === jq1) return;
        ((jq1 = A), u0Q.forEach((Q)=>Q(A)));
    };
    m0Q._notifyVisibilityChanged = nQ4;
    (0, bmA._addWindowEventListenerSafe)("focus", ()=>{
        ((Pq1 = !1), m0Q._notifyVisibilityChanged(hmA));
    });
    (0, bmA._addWindowEventListenerSafe)("blur", ()=>m0Q._notifyVisibilityChanged(Tq1));
    (0, bmA._addWindowEventListenerSafe)("beforeunload", ()=>{
        ((Pq1 = !0), m0Q._notifyVisibilityChanged(Tq1));
    });
    (0, bmA._addDocumentEventListenerSafe)("visibilitychange", ()=>{
        m0Q._notifyVisibilityChanged(document.visibilityState === "visible" ? hmA : Tq1);
    });
});
