// Module: Gh2
// Type: U
// Lines: 435276-435322
//
var Gh2 = U((Bh2)=>{
    Object.defineProperty(Bh2, "__esModule", {
        value: !0
    });
    var W$0 = FQ(), Ah2 = new Map(), eb2 = new Set();
    function gy5(A) {
        if (!W$0.GLOBAL_OBJ._sentryModuleMetadata) return;
        for (let Q of Object.keys(W$0.GLOBAL_OBJ._sentryModuleMetadata)){
            let B = W$0.GLOBAL_OBJ._sentryModuleMetadata[Q];
            if (eb2.has(Q)) continue;
            eb2.add(Q);
            let G = A(Q);
            for (let Z of G.reverse())if (Z.filename) {
                Ah2.set(Z.filename, B);
                break;
            }
        }
    }
    function Qh2(A, Q) {
        return (gy5(A), Ah2.get(Q));
    }
    function uy5(A, Q) {
        try {
            Q.exception.values.forEach((B)=>{
                if (!B.stacktrace) return;
                for (let G of B.stacktrace.frames || []){
                    if (!G.filename) continue;
                    let Z = Qh2(A, G.filename);
                    if (Z) G.module_metadata = Z;
                }
            });
        } catch (B) {}
    }
    function my5(A) {
        try {
            A.exception.values.forEach((Q)=>{
                if (!Q.stacktrace) return;
                for (let B of Q.stacktrace.frames || [])delete B.module_metadata;
            });
        } catch (Q) {}
    }
    Bh2.addMetadataToStackFrames = uy5;
    Bh2.getMetadataForUrl = Qh2;
    Bh2.stripMetadataFromStackFrames = my5;
});
