// Module: svA
// Type: U
// Lines: 437067-437100
//
var defaultOnDefaultTransitionIndicator = U((ng2)=>{
    Object.defineProperty(ng2, "__esModule", {
        value: !0
    });
    var rvA = lL(), qb5 = ()=>{
        let A = rvA.WINDOW.performance.timing, Q = rvA.WINDOW.performance.navigation.type, B = {
            entryType: "navigation",
            startTime: 0,
            type: Q == 2 ? "back_forward" : Q === 1 ? "reload" : "navigate"
        };
        for(let G in A)if (G !== "navigationStart" && G !== "toJSON") B[G] = Math.max(A[G] - A.navigationStart, 0);
        return B;
    }, Nb5 = ()=>{
        if (rvA.WINDOW.__WEB_VITALS_POLYFILL__) return (rvA.WINDOW.performance && ((performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || qb5()));
        else return (rvA.WINDOW.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0]);
    };
    ng2.getNavigationEntry = Nb5;
});
