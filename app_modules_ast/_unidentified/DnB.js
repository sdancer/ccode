// Module: DnB
// Type: U
// Lines: 282209-282258
//
var pushStartInstance = U((E9Z, HnB)=>{
    var CN3 = renderElement().fromCallback, KnB = qA("path"), va = renderElement(), VnB = $P();
    function $N3(A, Q) {
        function B() {
            va.writeFile(A, "", (G)=>{
                if (G) return Q(G);
                Q();
            });
        }
        va.stat(A, (G, Z)=>{
            if (!G && Z.isFile()) return Q();
            let Y = KnB.dirname(A);
            va.stat(Y, (J, X)=>{
                if (J) {
                    if (J.code === "ENOENT") return VnB.mkdirs(Y, (I)=>{
                        if (I) return Q(I);
                        B();
                    });
                    return Q(J);
                }
                if (X.isDirectory()) B();
                else va.readdir(Y, (I)=>{
                    if (I) return Q(I);
                });
            });
        });
    }
    function UN3(A) {
        let Q;
        try {
            Q = va.statSync(A);
        } catch  {}
        if (Q && Q.isFile()) return;
        let B = KnB.dirname(A);
        try {
            if (!va.statSync(B).isDirectory()) va.readdirSync(B);
        } catch (G) {
            if (G && G.code === "ENOENT") VnB.mkdirsSync(B);
            else throw G;
        }
        va.writeFileSync(A, "");
    }
    HnB.exports = {
        createFile: CN3($N3),
        createFileSync: UN3
    };
});
