// Module: e$0
// Type: U
// Lines: 441319-441350
//
var pushStartInstance = U((td2)=>{
    Object.defineProperty(td2, "__esModule", {
        value: !0
    });
    var rd2 = qA("path"), Kp5 = FQ();
    function sd2(A) {
        return A.replace(/^[A-Z]:/, "").replace(/\\/g, "/");
    }
    function Vp5(A = process.argv[1] ? Kp5.dirname(process.argv[1]) : process.cwd(), Q = rd2.sep === "\\") {
        let B = Q ? sd2(A) : A;
        return (G)=>{
            if (!G) return;
            let Z = Q ? sd2(G) : G, { dir: Y, base: J, ext: X } = rd2.posix.parse(Z);
            if (X === ".js" || X === ".mjs" || X === ".cjs") J = J.slice(0, X.length * -1);
            if (!Y) Y = ".";
            let I = Y.lastIndexOf("/node_modules");
            if (I > -1) return `${Y.slice(I + 14).replace(/\//g, ".")}:${J}`;
            if (Y.startsWith(B)) {
                let W = Y.slice(B.length + 1).replace(/\//g, ".");
                if (W) W += ":";
                return ((W += J), W);
            }
            return J;
        };
    }
    td2.createGetModuleFromFilename = Vp5;
});
