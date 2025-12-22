// Module: _1Q
// Type: L
// Lines: 53013-53048
//
var _1Q = L(()=>{
    R1Q = _04;
});
var tb = (A, Q, B = 3)=>{
    let G = 0, Z = O1Q(50, 250);
    return R1Q((Y)=>{
        let J = Y.loaded, X = Y.lengthComputable ? Y.total : void 0, I = J - G, W = Z(I), K = J <= X;
        G = J;
        let V = {
            loaded: J,
            total: X,
            progress: X ? J / X : void 0,
            bytes: I,
            rate: W ? W : void 0,
            estimated: W && X && K ? (X - J) / W : void 0,
            event: Y,
            lengthComputable: X != null,
            [Q ? "download" : "upload"]: !0
        };
        A(V);
    }, B);
}, b3A = (A, Q)=>{
    let B = A != null;
    return [
        (G)=>Q[0]({
                lengthComputable: B,
                total: A,
                loaded: G
            }),
        Q[1]
    ];
}, h3A = (A)=>(...Q)=>n1.asap(()=>A(...Q));
