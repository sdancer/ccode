// Module: lGA
// Type: U
// Lines: 132359-132437
//
var lGA = U((xM)=>{
    Object.defineProperty(xM, "__esModule", {
        value: !0
    });
    xM.defaultServiceName = xM.emptyResource = xM.defaultResource = xM.resourceFromAttributes = xM.serviceInstanceIdDetector = xM.processDetector = xM.osDetector = xM.hostDetector = xM.envDetector = xM.detectResources = void 0;
    var WV8 = dtQ();
    Object.defineProperty(xM, "detectResources", {
        enumerable: !0,
        get: function() {
            return WV8.detectResources;
        }
    });
    var lwA = peQ();
    Object.defineProperty(xM, "envDetector", {
        enumerable: !0,
        get: function() {
            return lwA.envDetector;
        }
    });
    Object.defineProperty(xM, "hostDetector", {
        enumerable: !0,
        get: function() {
            return lwA.hostDetector;
        }
    });
    Object.defineProperty(xM, "osDetector", {
        enumerable: !0,
        get: function() {
            return lwA.osDetector;
        }
    });
    Object.defineProperty(xM, "processDetector", {
        enumerable: !0,
        get: function() {
            return lwA.processDetector;
        }
    });
    Object.defineProperty(xM, "serviceInstanceIdDetector", {
        enumerable: !0,
        get: function() {
            return lwA.serviceInstanceIdDetector;
        }
    });
    var Mu1 = createRenderState();
    Object.defineProperty(xM, "resourceFromAttributes", {
        enumerable: !0,
        get: function() {
            return Mu1.resourceFromAttributes;
        }
    });
    Object.defineProperty(xM, "defaultResource", {
        enumerable: !0,
        get: function() {
            return Mu1.defaultResource;
        }
    });
    Object.defineProperty(xM, "emptyResource", {
        enumerable: !0,
        get: function() {
            return Mu1.emptyResource;
        }
    });
    var KV8 = Cu1();
    Object.defineProperty(xM, "defaultServiceName", {
        enumerable: !0,
        get: function() {
            return KV8.defaultServiceName;
        }
    });
});
