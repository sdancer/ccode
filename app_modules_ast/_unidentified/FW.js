// Module: FW
// Type: L
// Lines: 223055-223081
//
var createRenderState = L(()=>{
    createRenderState();
    WR = Cn("identity");
});
function On8(A) {
    return (A && typeof A.error === "string" && typeof A.error_description === "string");
}
function MwB(A) {
    return {
        error: A.error,
        errorDescription: A.error_description,
        correlationId: A.correlation_id,
        errorCodes: A.error_codes,
        timestamp: A.timestamp,
        traceId: A.trace_id
    };
}
var Mn8 = "CredentialUnavailableError", $4, Ur1 = "AuthenticationError", IOA, Rn8 = "AggregateAuthenticationError", wr1, rg;
