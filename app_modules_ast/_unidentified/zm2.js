// Module: zm2
// Type: U
// Lines: 439124-439146
//
var zm2 = U((Em2)=>{
    Object.defineProperty(Em2, "__esModule", {
        value: !0
    });
    var Jm5 = b$0(), Xm5 = FQ();
    function Im5() {
        let A = Jm5.lazyLoadedNodePerformanceMonitoringIntegrations.map((Q)=>{
            try {
                return Q();
            } catch (B) {
                return;
            }
        }).filter((Q)=>!!Q);
        if (A.length === 0) Xm5.logger.warn("Performance monitoring integrations could not be automatically loaded.");
        return A.filter((Q)=>!!Q.loadDependency());
    }
    Em2.autoDiscoverNodePerformanceMonitoringIntegrations = Im5;
});
