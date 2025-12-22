// Module: _q1
// Type: U
// Lines: 55208-55241
//
var _q1 = U((h0Q)=>{
    Object.defineProperty(h0Q, "__esModule", {
        value: !0
    });
    h0Q.UrlConfiguration = void 0;
    var fmA = TzA(), cQ4 = {
        [fmA.Endpoint._initialize]: "i",
        [fmA.Endpoint._rgstr]: "e",
        [fmA.Endpoint._download_config_specs]: "d"
    };
    class b0Q {
        constructor(A, Q, B, G){
            if (((this.customUrl = null), (this.fallbackUrls = null), (this.endpoint = A), (this.endpointDnsKey = cQ4[A]), Q)) this.customUrl = Q;
            if (!Q && B) this.customUrl = B.endsWith("/") ? `${B}${A}` : `${B}/${A}`;
            if (G) this.fallbackUrls = G;
            let Z = fmA.NetworkDefault[A];
            this.defaultUrl = `${Z}/${A}`;
        }
        getUrl() {
            var A;
            return (A = this.customUrl) !== null && A !== void 0 ? A : this.defaultUrl;
        }
    }
    h0Q.UrlConfiguration = b0Q;
});
