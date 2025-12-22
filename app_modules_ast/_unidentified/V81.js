// Module: V81
// Type: U
// Lines: 282550-282575
//
var renderElement = U((O9Z, onB)=>{
    var aN3 = renderElement().fromCallback, WTA = renderElement(), nnB = qA("path"), anB = $P(), oN3 = xa().pathExists;
    function rN3(A, Q, B, G) {
        if (typeof B === "function") ((G = B), (B = "utf8"));
        let Z = nnB.dirname(A);
        oN3(Z, (Y, J)=>{
            if (Y) return G(Y);
            if (J) return WTA.writeFile(A, Q, B, G);
            anB.mkdirs(Z, (X)=>{
                if (X) return G(X);
                WTA.writeFile(A, Q, B, G);
            });
        });
    }
    function sN3(A, ...Q) {
        let B = nnB.dirname(A);
        if (WTA.existsSync(B)) return WTA.writeFileSync(A, ...Q);
        (anB.mkdirsSync(B), WTA.writeFileSync(A, ...Q));
    }
    onB.exports = {
        outputFile: aN3(rN3),
        outputFileSync: sN3
    };
});
