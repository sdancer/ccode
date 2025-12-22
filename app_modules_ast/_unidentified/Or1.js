// Module: Or1
// Type: L
// Lines: 223347-223389
//
var renderElement = L(()=>{
    yn8 = typeof ((Lr1 = globalThis === null || globalThis === void 0 ? void 0 : globalThis.crypto) === null || Lr1 === void 0 ? void 0 : Lr1.randomUUID) === "function" ? globalThis.crypto.randomUUID.bind(globalThis.crypto) : Sn8;
});
class ywB {
    constructor(A){
        var Q, B, G, Z, Y, J, X;
        ((this.url = A.url), (this.body = A.body), (this.headers = (Q = A.headers) !== null && Q !== void 0 ? Q : Lv()), (this.method = (B = A.method) !== null && B !== void 0 ? B : "GET"), (this.timeout = (G = A.timeout) !== null && G !== void 0 ? G : 0), (this.multipartBody = A.multipartBody), (this.formData = A.formData), (this.disableKeepAlive = (Z = A.disableKeepAlive) !== null && Z !== void 0 ? Z : !1), (this.proxySettings = A.proxySettings), (this.streamResponseStatusCodes = A.streamResponseStatusCodes), (this.withCredentials = (Y = A.withCredentials) !== null && Y !== void 0 ? Y : !1), (this.abortSignal = A.abortSignal), (this.onUploadProgress = A.onUploadProgress), (this.onDownloadProgress = A.onDownloadProgress), (this.requestId = A.requestId || KOA()), (this.allowInsecureConnection = (J = A.allowInsecureConnection) !== null && J !== void 0 ? J : !1), (this.enableBrowserStreams = (X = A.enableBrowserStreams) !== null && X !== void 0 ? X : !1), (this.requestOverrides = A.requestOverrides), (this.authSchemes = A.authSchemes));
    }
}
function Mr1(A) {
    return new ywB(A);
}
