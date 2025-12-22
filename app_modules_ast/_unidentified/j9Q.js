// Module: j9Q
// Type: U
// Lines: 61685-61712
//
var j9Q = U((v64, ON1)=>{
    var _9Q = Symbol();
    function y64(A, Q, B) {
        let G = Q[_9Q];
        if (G) return Q.stat(A, (Y, J)=>{
            if (Y) return B(Y);
            B(null, J.mtime, G);
        });
        let Z = new Date(Math.ceil(Date.now() / 1000) * 1000 + 5);
        Q.utimes(A, Z, Z, (Y)=>{
            if (Y) return B(Y);
            Q.stat(A, (J, X)=>{
                if (J) return B(J);
                let I = X.mtime.getTime() % 1000 === 0 ? "s" : "ms";
                (Object.defineProperty(Q, _9Q, {
                    value: I
                }), B(null, X.mtime, I));
            });
        });
    }
    function x64(A) {
        let Q = Date.now();
        if (A === "s") Q = Math.ceil(Q / 1000) * 1000;
        return new Date(Q);
    }
    v64.probe = y64;
    v64.getMtime = x64;
});
