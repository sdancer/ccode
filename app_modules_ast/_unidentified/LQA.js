// Module: LQA
// Type: L
// Lines: 239090-239125
//
var LQA = L(()=>{
    _G();
    DJ();
    KXA();
    PjB();
    createRenderState();
    zQA();
    /*! @azure/msal-node v3.8.1 2025-10-29 */ NQA = {
        MANAGED_IDENTITY_CLIENT_ID_2017: "clientid",
        MANAGED_IDENTITY_CLIENT_ID: "client_id",
        MANAGED_IDENTITY_OBJECT_ID: "object_id",
        MANAGED_IDENTITY_RESOURCE_ID_IMDS: "msi_res_id",
        MANAGED_IDENTITY_RESOURCE_ID_NON_IMDS: "mi_res_id"
    };
    Jw.getValidatedEnvVariableUrlString = (A, Q, B, G)=>{
        try {
            return new X8(Q).urlString;
        } catch (Z) {
            throw (G.info(`[Managed Identity] ${B} managed identity is unavailable because the '${A}' environment variable is malformed.`), zW(EQA[A]));
        }
    };
});
class ae1 {
    calculateDelay(A, Q) {
        if (!A) return Q;
        let B = Math.round(parseFloat(A) * 1000);
        if (isNaN(B)) B = new Date(A).valueOf() - new Date().valueOf();
        return Math.max(Q, B);
    }
}
