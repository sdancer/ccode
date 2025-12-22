// Module: Yc2
// Type: U
// Lines: 441490-441513
//
var pushStartInstance = U((Zc2)=>{
    Object.defineProperty(Zc2, "__esModule", {
        value: !0
    });
    var ZK1 = qA("fs"), QU0 = qA("path");
    function hp5(A) {
        let Q = QU0.resolve(A);
        if (!ZK1.existsSync(Q)) throw Error(`Cannot read contents of ${Q}. Directory does not exist.`);
        if (!ZK1.statSync(Q).isDirectory()) throw Error(`Cannot read contents of ${Q}, because it is not a directory.`);
        let B = (G)=>{
            return ZK1.readdirSync(G).reduce((Z, Y)=>{
                let J = QU0.join(G, Y);
                if (ZK1.statSync(J).isDirectory()) return Z.concat(B(J));
                return (Z.push(J), Z);
            }, []);
        };
        return B(Q).map((G)=>QU0.relative(Q, G));
    }
    Zc2.deepReadDirSync = hp5;
});
