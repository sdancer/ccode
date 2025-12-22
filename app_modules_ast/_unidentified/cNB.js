// Module: cNB
// Type: L
// Lines: 226276-226296
//
var cNB = L(()=>{
    renderNode();
    J01();
    R01();
});
function pNB(A = {}) {
    let Q = Fs1(A !== null && A !== void 0 ? A : {});
    if (A.credentialOptions) Q.addPolicy(LOA({
        credential: A.credentialOptions.credential,
        scopes: A.credentialOptions.credentialScopes
    }));
    return (Q.addPolicy(dNB(A.serializationOptions), {
        phase: "Serialize"
    }), Q.addPolicy(gNB(A.deserializationOptions), {
        phase: "Deserialize"
    }), Q);
}
