// Module: gBQ
// Type: U
// Lines: 57708-57769
//
var gBQ = U((bBQ)=>{
    Object.defineProperty(bBQ, "__esModule", {
        value: !0
    });
    bBQ._makeParamStoreGetter = void 0;
    var fBQ = kp(), emA = {
        disableExposureLog: !0
    };
    function AdA(A) {
        return A == null || A.disableExposureLog === !1;
    }
    function oq1(A, Q) {
        return Q != null && !(0, fBQ._isTypeMatch)(A, Q);
    }
    function a24(A, Q) {
        return A.value;
    }
    function o24(A, Q, B) {
        if (A.getFeatureGate(Q.gate_name, AdA(B) ? void 0 : emA).value) return Q.pass_value;
        return Q.fail_value;
    }
    function r24(A, Q, B, G) {
        let Y = A.getDynamicConfig(Q.config_name, emA).get(Q.param_name);
        if (oq1(Y, B)) return B;
        if (AdA(G)) A.getDynamicConfig(Q.config_name);
        return Y;
    }
    function s24(A, Q, B, G) {
        let Y = A.getExperiment(Q.experiment_name, emA).get(Q.param_name);
        if (oq1(Y, B)) return B;
        if (AdA(G)) A.getExperiment(Q.experiment_name);
        return Y;
    }
    function t24(A, Q, B, G) {
        let Y = A.getLayer(Q.layer_name, emA).get(Q.param_name);
        if (oq1(Y, B)) return B;
        if (AdA(G)) A.getLayer(Q.layer_name).get(Q.param_name);
        return Y;
    }
    function e24(A, Q, B) {
        return (G, Z)=>{
            if (Q == null) return Z;
            let Y = Q[G];
            if (Y == null || (Z != null && (0, fBQ._typeOf)(Z) !== Y.param_type)) return Z;
            switch(Y.ref_type){
                case "static":
                    return a24(Y, B);
                case "gate":
                    return o24(A, Y, B);
                case "dynamic_config":
                    return r24(A, Y, Z, B);
                case "experiment":
                    return s24(A, Y, Z, B);
                case "layer":
                    return t24(A, Y, Z, B);
                default:
                    return Z;
            }
        };
    }
    bBQ._makeParamStoreGetter = e24;
});
