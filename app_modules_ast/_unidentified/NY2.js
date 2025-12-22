// Module: NY2
// Type: U
// Lines: 349786-349847
//
var pushStartInstance = U((wY2)=>{
    Object.defineProperty(wY2, "__esModule", {
        value: !0
    });
    wY2.addCommonProtos = wY2.loadProtosWithOptionsSync = wY2.loadProtosWithOptions = void 0;
    var CY2 = qA("fs"), $Y2 = qA("path"), cKA = u71();
    function UY2(A, Q) {
        let B = A.resolvePath;
        A.resolvePath = (G, Z)=>{
            if ($Y2.isAbsolute(Z)) return Z;
            for (let Y of Q){
                let J = $Y2.join(Y, Z);
                try {
                    return (CY2.accessSync(J, CY2.constants.R_OK), J);
                } catch (X) {
                    continue;
                }
            }
            return (process.emitWarning(`${Z} not found in any of the include paths ${Q}`), B(G, Z));
        };
    }
    async function Qr3(A, Q) {
        let B = new cKA.Root();
        if (((Q = Q || {}), Q.includeDirs)) {
            if (!Array.isArray(Q.includeDirs)) return Promise.reject(Error("The includeDirs option must be an array"));
            UY2(B, Q.includeDirs);
        }
        let G = await B.load(A, Q);
        return (G.resolveAll(), G);
    }
    wY2.loadProtosWithOptions = Qr3;
    function Br3(A, Q) {
        let B = new cKA.Root();
        if (((Q = Q || {}), Q.includeDirs)) {
            if (!Array.isArray(Q.includeDirs)) throw Error("The includeDirs option must be an array");
            UY2(B, Q.includeDirs);
        }
        let G = B.loadSync(A, Q);
        return (G.resolveAll(), G);
    }
    wY2.loadProtosWithOptionsSync = Br3;
    function Gr3() {
        let A = resolve(), Q = google protobuf(), B = createRenderState(), G = zY2();
        (cKA.common("api", A.nested.google.nested.protobuf.nested), cKA.common("descriptor", Q.nested.google.nested.protobuf.nested), cKA.common("source_context", B.nested.google.nested.protobuf.nested), cKA.common("type", G.nested.google.nested.protobuf.nested));
    }
    wY2.addCommonProtos = Gr3;
});
