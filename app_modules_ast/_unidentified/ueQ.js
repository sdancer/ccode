// Module: ueQ
// Type: U
// Lines: 132266-132299
//
var ueQ = U((pGA)=>{
    Object.defineProperty(pGA, "__esModule", {
        value: !0
    });
    pGA.serviceInstanceIdDetector = pGA.processDetector = pGA.osDetector = pGA.hostDetector = void 0;
    var HoA = geQ();
    Object.defineProperty(pGA, "hostDetector", {
        enumerable: !0,
        get: function() {
            return HoA.hostDetector;
        }
    });
    Object.defineProperty(pGA, "osDetector", {
        enumerable: !0,
        get: function() {
            return HoA.osDetector;
        }
    });
    Object.defineProperty(pGA, "processDetector", {
        enumerable: !0,
        get: function() {
            return HoA.processDetector;
        }
    });
    Object.defineProperty(pGA, "serviceInstanceIdDetector", {
        enumerable: !0,
        get: function() {
            return HoA.serviceInstanceIdDetector;
        }
    });
});
