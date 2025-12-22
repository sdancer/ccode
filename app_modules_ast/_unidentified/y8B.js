// Module: y8B
// Type: U
// Lines: 173460-173472
//
var read_string_buffer = U((KXG, S8B)=>{
    var P8B = qA("fs"), dU8 = (A)=>P8B.readFileSync(A, "utf-8"), cU8 = (A)=>new Promise((Q, B)=>{
            P8B.readFile(A, "utf-8", (G, Z)=>{
                if (G) B(G);
                else Q(Z);
            });
        });
    S8B.exports = {
        LDD_PATH: "/usr/bin/ldd",
        readFileSync: dU8,
        readFile: cU8
    };
});
