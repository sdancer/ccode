// Module: peQ
// Type: U
// Lines: 132310-132359
//
var peQ = U((el)=>{
    Object.defineProperty(el, "__esModule", {
        value: !0
    });
    el.noopDetector = el.serviceInstanceIdDetector = el.processDetector = el.osDetector = el.hostDetector = el.envDetector = void 0;
    var JV8 = ntQ();
    Object.defineProperty(el, "envDetector", {
        enumerable: !0,
        get: function() {
            return JV8.envDetector;
        }
    });
    var DoA = ueQ();
    Object.defineProperty(el, "hostDetector", {
        enumerable: !0,
        get: function() {
            return DoA.hostDetector;
        }
    });
    Object.defineProperty(el, "osDetector", {
        enumerable: !0,
        get: function() {
            return DoA.osDetector;
        }
    });
    Object.defineProperty(el, "processDetector", {
        enumerable: !0,
        get: function() {
            return DoA.processDetector;
        }
    });
    Object.defineProperty(el, "serviceInstanceIdDetector", {
        enumerable: !0,
        get: function() {
            return DoA.serviceInstanceIdDetector;
        }
    });
    var XV8 = ceQ();
    Object.defineProperty(el, "noopDetector", {
        enumerable: !0,
        get: function() {
            return XV8.noopDetector;
        }
    });
});
