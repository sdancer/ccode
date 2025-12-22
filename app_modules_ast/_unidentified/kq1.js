// Module: kq1
// Type: U
// Lines: 55686-55699
//
var describeObjectForErrorMessage = U((YQQ)=>{
    Object.defineProperty(YQQ, "__esModule", {
        value: !0
    });
    YQQ._typedJsonParse = void 0;
    var zB4 = OE();
    function CB4(A, Q, B) {
        try {
            let G = JSON.parse(A);
            if (G && typeof G === "object" && Q in G) return G;
        } catch (G) {}
        return (zB4.Log.error(`Failed to parse ${B}`), null);
    }
    YQQ._typedJsonParse = CB4;
});
