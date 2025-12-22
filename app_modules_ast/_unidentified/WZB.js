// Module: WZB
// Type: L
// Lines: 184149-184222
//
var renderElement = L(()=>{
    DGB();
    pushStartInstance();
    rGA();
    pushViewTransitionAttributes();
    iGB();
    CYA();
    dp1();
    performWork();
    GeA = new TNA();
    eJ = {
        initialize: GR8,
        isSupportedPlatform: tGB,
        isSandboxingEnabled: ZR8,
        checkDependencies: eGB,
        getFsReadConfig: YR8,
        getFsWriteConfig: JR8,
        getNetworkRestrictionConfig: XR8,
        getAllowUnixSockets: AZB,
        getAllowLocalBinding: QZB,
        getIgnoreViolations: BZB,
        getEnableWeakerNestedSandbox: GZB,
        getProxyPort: ZZB,
        getSocksProxyPort: YZB,
        getLinuxHttpSocketPath: JZB,
        getLinuxSocksSocketPath: XZB,
        waitForNetworkInitialization: IZB,
        wrapWithSandbox: KR8,
        reset: Ql1,
        getSandboxViolationStore: DR8,
        annotateStderrWithSandboxFailures: FR8,
        getLinuxGlobPatternWarnings: ER8,
        getConfig: VR8,
        updateConfig: HR8
    };
});
var i3, Bl1, yB, Xv = (A)=>{
    switch(typeof A){
        case "undefined":
            return yB.undefined;
        case "string":
            return yB.string;
        case "number":
            return Number.isNaN(A) ? yB.nan : yB.number;
        case "boolean":
            return yB.boolean;
        case "function":
            return yB.function;
        case "bigint":
            return yB.bigint;
        case "symbol":
            return yB.symbol;
        case "object":
            if (Array.isArray(A)) return yB.array;
            if (A === null) return yB.null;
            if (A.then && typeof A.then === "function" && A.catch && typeof A.catch === "function") return yB.promise;
            if (typeof Map < "u" && A instanceof Map) return yB.map;
            if (typeof Set < "u" && A instanceof Set) return yB.set;
            if (typeof Date < "u" && A instanceof Date) return yB.date;
            return yB.object;
        default:
            return yB.unknown;
    }
};
