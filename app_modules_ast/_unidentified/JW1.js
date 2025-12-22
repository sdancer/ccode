// Module: JW1
// Type: U
// Lines: 433895-433939
//
var createRenderState = U((Gb2)=>{
    Object.defineProperty(Gb2, "__esModule", {
        value: !0
    });
    var nC0 = FQ(), UP5 = "7";
    function Bb2(A) {
        let Q = A.protocol ? `${A.protocol}:` : "", B = A.port ? `:${A.port}` : "";
        return `${Q}//${A.host}${B}${A.path ? `/${A.path}` : ""}/api/`;
    }
    function wP5(A) {
        return `${Bb2(A)}${A.projectId}/envelope/`;
    }
    function qP5(A, Q) {
        return nC0.urlEncode({
            sentry_key: A.publicKey,
            sentry_version: UP5,
            ...(Q && {
                sentry_client: `${Q.name}/${Q.version}`
            })
        });
    }
    function NP5(A, Q = {}) {
        let B = typeof Q === "string" ? Q : Q.tunnel, G = typeof Q === "string" || !Q._metadata ? void 0 : Q._metadata.sdk;
        return B ? B : `${wP5(A)}?${qP5(A, G)}`;
    }
    function LP5(A, Q) {
        let B = nC0.makeDsn(A);
        if (!B) return "";
        let G = `${Bb2(B)}embed/error-page/`, Z = `dsn=${nC0.dsnToString(B)}`;
        for(let Y in Q){
            if (Y === "dsn") continue;
            if (Y === "onClose") continue;
            if (Y === "user") {
                let J = Q.user;
                if (!J) continue;
                if (J.name) Z += `&name=${encodeURIComponent(J.name)}`;
                if (J.email) Z += `&email=${encodeURIComponent(J.email)}`;
            } else Z += `&${encodeURIComponent(Y)}=${encodeURIComponent(Q[Y])}`;
        }
        return `${G}?${Z}`;
    }
    Gb2.getEnvelopeEndpointWithUrlEncodedAuth = NP5;
    Gb2.getReportDialogEndpoint = LP5;
});
