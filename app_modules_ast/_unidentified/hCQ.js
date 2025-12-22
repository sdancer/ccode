// Module: hCQ
// Type: U
// Lines: 95571-95590
//
var hCQ = U((fCQ)=>{
    Object.defineProperty(fCQ, "__esModule", {
        value: !0
    });
    fCQ.fromInstanceMetadata = void 0;
    var Ms4 = UU(), Rs4 = describeComponentStackByType(), _s4 = (A)=>{
        return (A?.logger?.debug("@smithy/credential-provider-imds", "fromInstanceMetadata"), async ()=>(0, Rs4.fromInstanceMetadata)(A)().then((Q)=>(0, Ms4.setCredentialFeature)(Q, "CREDENTIALS_IMDS", "0")));
    };
    fCQ.fromInstanceMetadata = _s4;
});
