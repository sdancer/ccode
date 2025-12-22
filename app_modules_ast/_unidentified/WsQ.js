// Module: WsQ
// Type: U
// Lines: 130530-130595
//
var WsQ = U((bx)=>{
    Object.defineProperty(bx, "__esModule", {
        value: !0
    });
    bx.unrefTimer = bx.SDK_INFO = bx.otperformance = bx._globalThis = bx.getStringListFromEnv = bx.getNumberFromEnv = bx.getBooleanFromEnv = bx.getStringFromEnv = void 0;
    var QoA = BcQ();
    Object.defineProperty(bx, "getStringFromEnv", {
        enumerable: !0,
        get: function() {
            return QoA.getStringFromEnv;
        }
    });
    Object.defineProperty(bx, "getBooleanFromEnv", {
        enumerable: !0,
        get: function() {
            return QoA.getBooleanFromEnv;
        }
    });
    Object.defineProperty(bx, "getNumberFromEnv", {
        enumerable: !0,
        get: function() {
            return QoA.getNumberFromEnv;
        }
    });
    Object.defineProperty(bx, "getStringListFromEnv", {
        enumerable: !0,
        get: function() {
            return QoA.getStringListFromEnv;
        }
    });
    var aX8 = describeObjectForErrorMessage();
    Object.defineProperty(bx, "_globalThis", {
        enumerable: !0,
        get: function() {
            return aX8._globalThis;
        }
    });
    var oX8 = IcQ();
    Object.defineProperty(bx, "otperformance", {
        enumerable: !0,
        get: function() {
            return oX8.otperformance;
        }
    });
    var rX8 = YsQ();
    Object.defineProperty(bx, "SDK_INFO", {
        enumerable: !0,
        get: function() {
            return rX8.SDK_INFO;
        }
    });
    var sX8 = IsQ();
    Object.defineProperty(bx, "unrefTimer", {
        enumerable: !0,
        get: function() {
            return sX8.unrefTimer;
        }
    });
});
