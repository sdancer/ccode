// Module: Ho1
// Type: U
// Lines: 219406-219435
//
var Ho1 = U((Gl8)=>{
    var V$B = rpcCall(), u11 = K$B(), Bl8 = [
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
    Gl8.ALGORITHMS = Bl8;
    Gl8.sign = V$B.sign;
    Gl8.verify = u11.verify;
    Gl8.decode = u11.decode;
    Gl8.isValid = u11.isValid;
    Gl8.createSign = function(Q) {
        return new V$B(Q);
    };
    Gl8.createVerify = function(Q) {
        return new u11(Q);
    };
});
