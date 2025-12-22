// Module: lH2
// Type: U
// Lines: 363578-363606
//
var lH2 = U((hI0)=>{
    Object.defineProperty(hI0, "__esModule", {
        value: !0
    });
    hI0.OTLPTraceExporter = void 0;
    var tB5 = pH2();
    Object.defineProperty(hI0, "OTLPTraceExporter", {
        enumerable: !0,
        get: function() {
            return tB5.OTLPTraceExporter;
        }
    });
});
class gI0 {
    error(A, ...Q) {
        t(Error(A));
    }
    warn(A, ...Q) {
        t(Error(A));
    }
    info(A, ...Q) {
        return;
    }
    debug(A, ...Q) {
        return;
    }
    verbose(A, ...Q) {
        return;
    }
}
