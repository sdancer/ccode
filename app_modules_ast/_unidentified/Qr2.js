// Module: Qr2
// Type: U
// Lines: 453585-453623
//
var main = U((eo2)=>{
    Object.defineProperty(eo2, "__esModule", {
        value: !0
    });
    eo2.createConfiguredNodePlugin = eo2.createNodePlugin = void 0;
    var dA7 = oo2(), cA7 = Lw0(), pA7 = renderElement();
    function lA7(A) {
        (A.updateEvent("context.library.name", "@segment/analytics-node"), A.updateEvent("context.library.version", cA7.version));
        let Q = (0, pA7.detectRuntime)();
        if (Q === "node") A.updateEvent("_metadata.nodeVersion", process.version);
        A.updateEvent("_metadata.jsRuntime", Q);
    }
    function to2(A) {
        function Q(B) {
            return (lA7(B), A.enqueue(B));
        }
        return {
            name: "Segment.io",
            type: "destination",
            version: "1.0.0",
            isLoaded: ()=>!0,
            load: ()=>Promise.resolve(),
            alias: Q,
            group: Q,
            identify: Q,
            page: Q,
            screen: Q,
            track: Q
        };
    }
    eo2.createNodePlugin = to2;
    var iA7 = (A, Q)=>{
        let B = new dA7.Publisher(A, Q);
        return {
            publisher: B,
            plugin: to2(B)
        };
    };
    eo2.createConfiguredNodePlugin = iA7;
});
