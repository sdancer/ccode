// Module: wZQ
// Type: U
// Lines: 78573-78587
//
var wZQ = U(($ZQ)=>{
    Object.defineProperty($ZQ, "__esModule", {
        value: !0
    });
    $ZQ.getSSOTokenFromFile = $ZQ.tokenIntercept = void 0;
    var JC4 = qA("fs/promises"), XC4 = pushStartInstance();
    $ZQ.tokenIntercept = {};
    var IC4 = async (A)=>{
        if ($ZQ.tokenIntercept[A]) return $ZQ.tokenIntercept[A];
        let Q = (0, XC4.getSSOTokenFilepath)(A), B = await (0, JC4.readFile)(Q, "utf8");
        return JSON.parse(B);
    };
    $ZQ.getSSOTokenFromFile = IC4;
});
