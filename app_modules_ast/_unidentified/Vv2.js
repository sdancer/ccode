// Module: Vv2
// Type: U
// Lines: 429515-429559
//
var rpcCall = U((Kv2)=>{
    Object.defineProperty(Kv2, "__esModule", {
        value: !0
    });
    var a$5 = $f(), o$5 = rpcCall(), Zv2 = Tz0(), Yv2 = getEventPriority(), Jv2 = describeComponentStackByType(), Xv2 = rpcCall(), Iv2 = lz0(), Wv2 = nz0(), oz0 = renderElement();
    function r$5(A, Q) {
        switch(A){
            case "console":
                return Zv2.addConsoleInstrumentationHandler(Q);
            case "dom":
                return Yv2.addClickKeypressInstrumentationHandler(Q);
            case "xhr":
                return oz0.addXhrInstrumentationHandler(Q);
            case "fetch":
                return Jv2.addFetchInstrumentationHandler(Q);
            case "history":
                return Wv2.addHistoryInstrumentationHandler(Q);
            case "error":
                return Xv2.addGlobalErrorInstrumentationHandler(Q);
            case "unhandledrejection":
                return Iv2.addGlobalUnhandledRejectionInstrumentationHandler(Q);
            default:
                a$5.DEBUG_BUILD && o$5.logger.warn("unknown instrumentation type:", A);
        }
    }
    Kv2.addConsoleInstrumentationHandler = Zv2.addConsoleInstrumentationHandler;
    Kv2.addClickKeypressInstrumentationHandler = Yv2.addClickKeypressInstrumentationHandler;
    Kv2.addFetchInstrumentationHandler = Jv2.addFetchInstrumentationHandler;
    Kv2.addGlobalErrorInstrumentationHandler = Xv2.addGlobalErrorInstrumentationHandler;
    Kv2.addGlobalUnhandledRejectionInstrumentationHandler = Iv2.addGlobalUnhandledRejectionInstrumentationHandler;
    Kv2.addHistoryInstrumentationHandler = Wv2.addHistoryInstrumentationHandler;
    Kv2.SENTRY_XHR_DATA_KEY = oz0.SENTRY_XHR_DATA_KEY;
    Kv2.addXhrInstrumentationHandler = oz0.addXhrInstrumentationHandler;
    Kv2.addInstrumentationHandler = r$5;
});
