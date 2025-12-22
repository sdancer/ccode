// Module: zk2
// Type: U
// Lines: 430645-430677
//
var zk2 = U((Ek2)=>{
    Object.defineProperty(Ek2, "__esModule", {
        value: !0
    });
    function Dk2(A, Q, B) {
        let G = Q.match(/([a-z_]+)\.(.*)/i);
        if (G === null) A[Q] = B;
        else {
            let Z = A[G[1]];
            Dk2(Z, G[2], B);
        }
    }
    function dq5(A, Q, B = {}) {
        return Array.isArray(Q) ? Fk2(A, Q, B) : cq5(A, Q, B);
    }
    function Fk2(A, Q, B) {
        let G = Q.find((Z)=>Z.name === A.name);
        if (G) {
            for (let [Z, Y] of Object.entries(B))Dk2(G, Z, Y);
            return Q;
        }
        return [
            ...Q,
            A
        ];
    }
    function cq5(A, Q, B) {
        return (Z)=>{
            let Y = Q(Z);
            if (A.allowExclusionByUser) {
                if (!Y.find((X)=>X.name === A.name)) return Y;
            }
            return Fk2(A, Y, B);
        };
    }
    Ek2.addOrUpdateIntegration = dq5;
});
