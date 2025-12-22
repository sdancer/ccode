// Module: fHQ
// Type: U
// Lines: 90210-90249
//
var fHQ = U((vHQ)=>{
    Object.defineProperty(vHQ, "__esModule", {
        value: !0
    });
    vHQ.resolveHttpAuthRuntimeConfig = vHQ.getHttpAuthExtensionConfiguration = void 0;
    var tf4 = (A)=>{
        let { httpAuthSchemes: Q, httpAuthSchemeProvider: B, credentials: G } = A;
        return {
            setHttpAuthScheme (Z) {
                let Y = Q.findIndex((J)=>J.schemeId === Z.schemeId);
                if (Y === -1) Q.push(Z);
                else Q.splice(Y, 1, Z);
            },
            httpAuthSchemes () {
                return Q;
            },
            setHttpAuthSchemeProvider (Z) {
                B = Z;
            },
            httpAuthSchemeProvider () {
                return B;
            },
            setCredentials (Z) {
                G = Z;
            },
            credentials () {
                return G;
            }
        };
    };
    vHQ.getHttpAuthExtensionConfiguration = tf4;
    var ef4 = (A)=>{
        return {
            httpAuthSchemes: A.httpAuthSchemes(),
            httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
            credentials: A.credentials()
        };
    };
    vHQ.resolveHttpAuthRuntimeConfig = ef4;
});
