// Module: Je1
// Type: L
// Lines: 233978-234000
//
var Je1 = L(()=>{
    AMB(); /*! @azure/msal-node v3.8.1 2025-10-29 */ 
});
class Zw {
    static base64Encode(A, Q) {
        return Buffer.from(A, Q).toString(zF.BASE64);
    }
    static base64EncodeUrl(A, Q) {
        return Zw.base64Encode(A, Q).replace(/=/g, c0.EMPTY_STRING).replace(/\+/g, "-").replace(/\//g, "_");
    }
    static base64Decode(A) {
        return Buffer.from(A, zF.BASE64).toString("utf8");
    }
    static base64DecodeUrl(A) {
        let Q = A.replace(/-/g, "+").replace(/_/g, "/");
        while(Q.length % 4)Q += "=";
        return Zw.base64Decode(Q);
    }
}
