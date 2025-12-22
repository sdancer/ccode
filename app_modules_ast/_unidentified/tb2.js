// Module: tb2
// Type: U
// Lines: 435258-435276
//
var tb2 = U((sb2)=>{
    Object.defineProperty(sb2, "__esModule", {
        value: !0
    });
    var rb2 = cI1();
    function by5(A, Q, B = [
        Q
    ], G = "npm") {
        let Z = A._metadata || {};
        if (!Z.sdk) Z.sdk = {
            name: `sentry.javascript.${Q}`,
            packages: B.map((Y)=>({
                    name: `${G}:@sentry/${Y}`,
                    version: rb2.SDK_VERSION
                })),
            version: rb2.SDK_VERSION
        };
        A._metadata = Z;
    }
    sb2.applySdkMetadata = by5;
});
