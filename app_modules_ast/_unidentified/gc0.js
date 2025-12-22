// Module: gc0
// Type: L
// Lines: 16658-16688
//
var renderElement = L(()=>{
    Pc0();
    xc0 = l(yc0(), 1);
});
var sp9, tp9, HU1 = (A, Q)=>{
    for (let [B, G] of tp9){
        let Z = typeof Q === "function" ? (...Y)=>Reflect.apply(G.value, Q(), Y) : G.value.bind(Q);
        Reflect.defineProperty(A, B, {
            ...G,
            value: Z
        });
    }
}, uc0 = (A)=>new Promise((Q, B)=>{
        if ((A.on("exit", (G, Z)=>{
            Q({
                exitCode: G,
                signal: Z
            });
        }), A.on("error", (G)=>{
            B(G);
        }), A.stdin)) A.stdin.on("error", (G)=>{
            B(G);
        });
    });
