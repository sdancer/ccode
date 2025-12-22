// Module: $mA
// Type: L
// Lines: 53632-53685
//
var $mA = L(()=>{
    createRenderState();
    vy();
});
var UmA = (A)=>{
    let Q = Oj({}, A), { data: B, withXSRFToken: G, xsrfHeaderName: Z, xsrfCookieName: Y, headers: J, auth: X } = Q;
    if (((Q.headers = J = MX.from(J)), (Q.url = Ke(He(Q.baseURL, Q.url, Q.allowAbsoluteUrls), A.params, A.paramsSerializer)), X)) J.set("Authorization", "Basic " + btoa((X.username || "") + ":" + (X.password ? unescape(encodeURIComponent(X.password)) : "")));
    let I;
    if (n1.isFormData(B)) {
        if (v7.hasStandardBrowserEnv || v7.hasStandardBrowserWebWorkerEnv) J.setContentType(void 0);
        else if ((I = J.getContentType()) !== !1) {
            let [W, ...K] = I ? I.split(";").map((V)=>V.trim()).filter(Boolean) : [];
            J.setContentType([
                W || "multipart/form-data",
                ...K
            ].join("; "));
        }
    }
    if (v7.hasStandardBrowserEnv) {
        if ((G && n1.isFunction(G) && (G = G(Q)), G || (G !== !1 && h1Q(Q.url)))) {
            let W = Z && Y && u1Q.read(Y);
            if (W) J.set(Z, W);
        }
    }
    return Q;
};
