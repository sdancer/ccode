// Module: KU0
// Type: U
// Lines: 445194-445341
//
var KU0 = U((El2)=>{
    Object.defineProperty(El2, "__esModule", {
        value: !0
    });
    var p2 = z6(), Va5 = zm2(), Ha5 = h$0(), Da5 = m$0(), DkA = AU0(), WU0 = FQ(), Fa5 = pushStartInstance(), Vl2 = pushStartInstance(), Ea5 = Dc2(), za5 = Nc2(), Ca5 = Sc2(), $a5 = xc2(), Xs = ep2(), Ua5 = mW1(), wa5 = tW1(), qa5 = AK1(), Na5 = pushStartInstance(), La5 = pW1(), Oa5 = dW1(), Ma5 = aW1(), Ra5 = waitForOAuthCallback(), _a5 = JK1(), Hl2 = YU0(), Dl2 = prepareToHydrateHostInstance(), Fl2 = prepareToHydrateHostInstance(), ja5 = ZU0(), Ta5 = createRenderState(), Pa5 = Il2(), Sa5 = createRenderState(), ya5 = Vl2.createGetModuleFromFilename(), xa5 = {
        ...p2.Integrations,
        ...Ca5,
        ...$a5
    }, va5 = {
        instrumentCron: Ta5.instrumentCron,
        instrumentNodeCron: Pa5.instrumentNodeCron,
        instrumentNodeSchedule: Sa5.instrumentNodeSchedule
    };
    El2.Hub = p2.Hub;
    El2.SDK_VERSION = p2.SDK_VERSION;
    El2.SEMANTIC_ATTRIBUTE_SENTRY_OP = p2.SEMANTIC_ATTRIBUTE_SENTRY_OP;
    El2.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = p2.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN;
    El2.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = p2.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE;
    El2.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = p2.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE;
    El2.Scope = p2.Scope;
    El2.addBreadcrumb = p2.addBreadcrumb;
    El2.addEventProcessor = p2.addEventProcessor;
    El2.addGlobalEventProcessor = p2.addGlobalEventProcessor;
    El2.addIntegration = p2.addIntegration;
    El2.captureCheckIn = p2.captureCheckIn;
    El2.captureEvent = p2.captureEvent;
    El2.captureException = p2.captureException;
    El2.captureMessage = p2.captureMessage;
    El2.captureSession = p2.captureSession;
    El2.close = p2.close;
    El2.configureScope = p2.configureScope;
    El2.continueTrace = p2.continueTrace;
    El2.createTransport = p2.createTransport;
    El2.endSession = p2.endSession;
    El2.extractTraceparentData = p2.extractTraceparentData;
    El2.flush = p2.flush;
    El2.functionToStringIntegration = p2.functionToStringIntegration;
    El2.getActiveSpan = p2.getActiveSpan;
    El2.getActiveTransaction = p2.getActiveTransaction;
    El2.getClient = p2.getClient;
    El2.getCurrentHub = p2.getCurrentHub;
    El2.getCurrentScope = p2.getCurrentScope;
    El2.getGlobalScope = p2.getGlobalScope;
    El2.getHubFromCarrier = p2.getHubFromCarrier;
    El2.getIsolationScope = p2.getIsolationScope;
    El2.getSpanStatusFromHttpCode = p2.getSpanStatusFromHttpCode;
    El2.inboundFiltersIntegration = p2.inboundFiltersIntegration;
    El2.isInitialized = p2.isInitialized;
    El2.lastEventId = p2.lastEventId;
    El2.linkedErrorsIntegration = p2.linkedErrorsIntegration;
    El2.makeMain = p2.makeMain;
    El2.metrics = p2.metrics;
    El2.parameterize = p2.parameterize;
    El2.requestDataIntegration = p2.requestDataIntegration;
    El2.runWithAsyncContext = p2.runWithAsyncContext;
    El2.setContext = p2.setContext;
    El2.setCurrentClient = p2.setCurrentClient;
    El2.setExtra = p2.setExtra;
    El2.setExtras = p2.setExtras;
    El2.setHttpStatus = p2.setHttpStatus;
    El2.setMeasurement = p2.setMeasurement;
    El2.setTag = p2.setTag;
    El2.setTags = p2.setTags;
    El2.setUser = p2.setUser;
    El2.spanStatusfromHttpCode = p2.spanStatusfromHttpCode;
    El2.startActiveSpan = p2.startActiveSpan;
    El2.startInactiveSpan = p2.startInactiveSpan;
    El2.startSession = p2.startSession;
    El2.startSpan = p2.startSpan;
    El2.startSpanManual = p2.startSpanManual;
    El2.startTransaction = p2.startTransaction;
    El2.trace = p2.trace;
    El2.withActiveSpan = p2.withActiveSpan;
    El2.withIsolationScope = p2.withIsolationScope;
    El2.withMonitor = p2.withMonitor;
    El2.withScope = p2.withScope;
    El2.autoDiscoverNodePerformanceMonitoringIntegrations = Va5.autoDiscoverNodePerformanceMonitoringIntegrations;
    El2.NodeClient = Ha5.NodeClient;
    El2.makeNodeTransport = Da5.makeNodeTransport;
    El2.defaultIntegrations = DkA.defaultIntegrations;
    El2.defaultStackParser = DkA.defaultStackParser;
    El2.getDefaultIntegrations = DkA.getDefaultIntegrations;
    El2.getSentryRelease = DkA.getSentryRelease;
    El2.init = DkA.init;
    El2.DEFAULT_USER_INCLUDES = WU0.DEFAULT_USER_INCLUDES;
    El2.addRequestDataToEvent = WU0.addRequestDataToEvent;
    El2.extractRequestData = WU0.extractRequestData;
    El2.deepReadDirSync = Fa5.deepReadDirSync;
    El2.createGetModuleFromFilename = Vl2.createGetModuleFromFilename;
    El2.enableAnrDetection = Ea5.enableAnrDetection;
    El2.Handlers = za5;
    El2.captureConsoleIntegration = Xs.captureConsoleIntegration;
    El2.debugIntegration = Xs.debugIntegration;
    El2.dedupeIntegration = Xs.dedupeIntegration;
    El2.extraErrorDataIntegration = Xs.extraErrorDataIntegration;
    El2.httpClientIntegration = Xs.httpClientIntegration;
    El2.reportingObserverIntegration = Xs.reportingObserverIntegration;
    El2.rewriteFramesIntegration = Xs.rewriteFramesIntegration;
    El2.sessionTimingIntegration = Xs.sessionTimingIntegration;
    El2.consoleIntegration = Ua5.consoleIntegration;
    El2.onUncaughtExceptionIntegration = wa5.onUncaughtExceptionIntegration;
    El2.onUnhandledRejectionIntegration = qa5.onUnhandledRejectionIntegration;
    El2.modulesIntegration = Na5.modulesIntegration;
    El2.contextLinesIntegration = La5.contextLinesIntegration;
    El2.nodeContextIntegration = Oa5.nodeContextIntegration;
    El2.localVariablesIntegration = Ma5.localVariablesIntegration;
    El2.spotlightIntegration = Ra5.spotlightIntegration;
    El2.anrIntegration = _a5.anrIntegration;
    El2.hapiErrorPlugin = Hl2.hapiErrorPlugin;
    El2.hapiIntegration = Hl2.hapiIntegration;
    El2.Undici = Dl2.Undici;
    El2.nativeNodeFetchintegration = Dl2.nativeNodeFetchintegration;
    El2.Http = Fl2.Http;
    El2.httpIntegration = Fl2.httpIntegration;
    El2.trpcMiddleware = ja5.trpcMiddleware;
    El2.Integrations = xa5;
    El2.cron = va5;
    El2.getModuleFromFilename = ya5;
});
var zl2, Cl2, J4A;
