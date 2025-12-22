// Module: mh2
// Type: U
// Lines: 435746-435765
//
var mh2 = U((uh2)=>{
    Object.defineProperty(uh2, "__esModule", {
        value: !0
    });
    var bh2 = $d(), ux5 = fh2(), hh2 = "MetricsAggregator", mx5 = ()=>{
        return {
            name: hh2,
            setupOnce () {},
            setup (A) {
                A.metricsAggregator = new ux5.BrowserMetricsAggregator(A);
            }
        };
    }, gh2 = bh2.defineIntegration(mx5), dx5 = bh2.convertIntegrationFnToClass(hh2, gh2);
    uh2.MetricsAggregator = dx5;
    uh2.metricsAggregatorIntegration = gh2;
});
