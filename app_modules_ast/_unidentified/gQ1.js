// Module: gQ1
// Type: U
// Lines: 234915-234944
//
var gQ1 = U((Ct8)=>{
    var yMB = rpcCall(), hQ1 = SMB(), zt8 = [
        "HS256",
        "HS384",
        "HS512",
        "RS256",
        "RS384",
        "RS512",
        "PS256",
        "PS384",
        "PS512",
        "ES256",
        "ES384",
        "ES512"
    ];
    Ct8.ALGORITHMS = zt8;
    Ct8.sign = yMB.sign;
    Ct8.verify = hQ1.verify;
    Ct8.decode = hQ1.decode;
    Ct8.isValid = hQ1.isValid;
    Ct8.createSign = function(Q) {
        return new yMB(Q);
    };
    Ct8.createVerify = function(Q) {
        return new hQ1(Q);
    };
});
