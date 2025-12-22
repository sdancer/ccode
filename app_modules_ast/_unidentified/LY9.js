// Module: LY9
// Type: U
// Lines: 499993-500026
//
var useActionState = U((D77)=>{
    D77.render = function(A, Q, B) {
        let G = A.modules.size, Z = A.modules.data, Y = "\x1B[40m  \x1B[0m", J = "\x1B[47m  \x1B[0m", X = "", I = Array(G + 3).join("\x1B[47m  \x1B[0m"), W = Array(2).join("\x1B[47m  \x1B[0m");
        X += I + `
`;
        for(let K = 0; K < G; ++K){
            X += "\x1B[47m  \x1B[0m";
            for(let V = 0; V < G; V++)X += Z[K * G + V] ? "\x1B[40m  \x1B[0m" : "\x1B[47m  \x1B[0m";
            X += W + `
`;
        }
        if (((X += I + `
`), typeof B === "function")) B(null, X);
        return X;
    };
});
