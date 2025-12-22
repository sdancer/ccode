// Module: Oq1
// Type: U
// Lines: 55006-55136
//
var createRenderState = U((x0Q)=>{
    Object.defineProperty(x0Q, "__esModule", {
        value: !0
    });
    x0Q._createLayerParameterExposure = x0Q._createConfigExposure = x0Q._mapExposures = x0Q._createGateExposure = x0Q._isExposureEvent = void 0;
    var P0Q = "statsig::config_exposure", S0Q = "statsig::gate_exposure", y0Q = "statsig::layer_exposure", Lq1 = (A, Q, B, G, Z)=>{
        if (B.bootstrapMetadata) G.bootstrapMetadata = B.bootstrapMetadata;
        return {
            eventName: A,
            user: Q,
            value: null,
            metadata: yQ4(B, G),
            secondaryExposures: Z,
            time: Date.now()
        };
    }, jQ4 = ({ eventName: A })=>{
        return A === S0Q || A === P0Q || A === y0Q;
    };
    x0Q._isExposureEvent = jQ4;
    var TQ4 = (A, Q, B)=>{
        var G, Z, Y;
        let J = {
            gate: Q.name,
            gateValue: String(Q.value),
            ruleID: Q.ruleID
        };
        if (((G = Q.__evaluation) === null || G === void 0 ? void 0 : G.version) != null) J.configVersion = Q.__evaluation.version;
        return Lq1(S0Q, A, Q.details, J, xmA((Y = (Z = Q.__evaluation) === null || Z === void 0 ? void 0 : Z.secondary_exposures) !== null && Y !== void 0 ? Y : [], B));
    };
    x0Q._createGateExposure = TQ4;
    function xmA(A, Q) {
        return A.map((B)=>{
            if (typeof B === "string") return (Q !== null && Q !== void 0 ? Q : {})[B];
            return B;
        }).filter((B)=>B != null);
    }
    x0Q._mapExposures = xmA;
    var PQ4 = (A, Q, B)=>{
        var G, Z, Y, J;
        let X = {
            config: Q.name,
            ruleID: Q.ruleID
        };
        if (((G = Q.__evaluation) === null || G === void 0 ? void 0 : G.version) != null) X.configVersion = Q.__evaluation.version;
        if (((Z = Q.__evaluation) === null || Z === void 0 ? void 0 : Z.passed) != null) X.rulePassed = String(Q.__evaluation.passed);
        return Lq1(P0Q, A, Q.details, X, xmA((J = (Y = Q.__evaluation) === null || Y === void 0 ? void 0 : Y.secondary_exposures) !== null && J !== void 0 ? J : [], B));
    };
    x0Q._createConfigExposure = PQ4;
    var SQ4 = (A, Q, B, G)=>{
        var Z, Y, J, X;
        let I = Q.__evaluation, W = ((Z = I === null || I === void 0 ? void 0 : I.explicit_parameters) === null || Z === void 0 ? void 0 : Z.includes(B)) === !0, K = "", V = (Y = I === null || I === void 0 ? void 0 : I.undelegated_secondary_exposures) !== null && Y !== void 0 ? Y : [];
        if (W) ((K = (J = I.allocated_experiment_name) !== null && J !== void 0 ? J : ""), (V = I.secondary_exposures));
        let H = {
            config: Q.name,
            parameterName: B,
            ruleID: Q.ruleID,
            allocatedExperiment: K,
            isExplicitParameter: String(W)
        };
        if (((X = Q.__evaluation) === null || X === void 0 ? void 0 : X.version) != null) H.configVersion = Q.__evaluation.version;
        return Lq1(y0Q, A, Q.details, H, xmA(V, G));
    };
    x0Q._createLayerParameterExposure = SQ4;
    var yQ4 = (A, Q)=>{
        if (((Q.reason = A.reason), A.lcut)) Q.lcut = String(A.lcut);
        if (A.receivedAt) Q.receivedAt = String(A.receivedAt);
        return Q;
    };
});
