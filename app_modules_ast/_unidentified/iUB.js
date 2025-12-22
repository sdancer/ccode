// Module: iUB
// Type: U
// Lines: 222371-222390
//
var iUB = U((pUB)=>{
    Object.defineProperty(pUB, "__esModule", {
        value: !0
    });
    pUB.PassThroughClient = void 0;
    var ci8 = Nv();
    class Gr1 extends ci8.AuthClient {
        async request(A) {
            return this.transporter.request(A);
        }
        async getAccessToken() {
            return {};
        }
        async getRequestHeaders() {
            return {};
        }
    }
    pUB.PassThroughClient = Gr1;
    var pi8 = new Gr1();
    pi8.getAccessToken();
});
