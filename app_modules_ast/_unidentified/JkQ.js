// Module: JkQ
// Type: U
// Lines: 121079-121096
//
var JkQ = U((Jr7, YkQ)=>{
    var xs6 = qA("node:assert"), { URLSerializer: ZkQ } = minimizeSupportedMimeType(), { isValidHeaderName: vs6 } = fetch internals();
    function ks6(A, Q, B = !1) {
        let G = ZkQ(A, B), Z = ZkQ(Q, B);
        return G === Z;
    }
    function fs6(A) {
        xs6(A !== null);
        let Q = [];
        for (let B of A.split(","))if (((B = B.trim()), vs6(B))) Q.push(B);
        return Q;
    }
    YkQ.exports = {
        urlEquals: ks6,
        getFieldValues: fs6
    };
});
