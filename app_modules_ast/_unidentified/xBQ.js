// Module: xBQ
// Type: U
// Lines: 57535-57599
//
var xBQ = U((SBQ)=>{
    Object.defineProperty(SBQ, "__esModule", {
        value: !0
    });
    SBQ._resolveDeltasResponse = void 0;
    var PBQ = kp(), c24 = 2;
    function p24(A, Q) {
        let B = (0, PBQ._typedJsonParse)(Q, "checksum", "DeltasEvaluationResponse");
        if (!B) return {
            hadBadDeltaChecksum: !0
        };
        let G = l24(A, B), Z = i24(G), Y = (0, PBQ._DJB2Object)({
            feature_gates: Z.feature_gates,
            dynamic_configs: Z.dynamic_configs,
            layer_configs: Z.layer_configs
        }, c24);
        if (Y !== B.checksumV2) return {
            hadBadDeltaChecksum: !0,
            badChecksum: Y,
            badMergedConfigs: Z,
            badFullResponse: B.deltas_full_response
        };
        return JSON.stringify(Z);
    }
    SBQ._resolveDeltasResponse = p24;
    function l24(A, Q) {
        return Object.assign(Object.assign(Object.assign({}, A), Q), {
            feature_gates: Object.assign(Object.assign({}, A.feature_gates), Q.feature_gates),
            layer_configs: Object.assign(Object.assign({}, A.layer_configs), Q.layer_configs),
            dynamic_configs: Object.assign(Object.assign({}, A.dynamic_configs), Q.dynamic_configs)
        });
    }
    function i24(A) {
        let Q = A;
        return (nq1(A.deleted_gates, Q.feature_gates), delete Q.deleted_gates, nq1(A.deleted_configs, Q.dynamic_configs), delete Q.deleted_configs, nq1(A.deleted_layers, Q.layer_configs), delete Q.deleted_layers, Q);
    }
    function nq1(A, Q) {
        A === null || A === void 0 || A.forEach((B)=>{
            delete Q[B];
        });
    }
});
