// Module: kq2
// Type: U
// Lines: 384261-384279
//
var renderElement = U((HyZ, vq2)=>{
    var xq2 = yq2();
    vq2.exports = aG5;
    function aG5(A) {
        let Q, B, G, Z;
        if (((A = Array.prototype.slice.call(A)), typeof A[A.length - 1] === "function")) Z = A.pop();
        if (typeof A[0] === "string") if (((Q = A[0]), typeof A[2] === "object")) ((B = A[1]), (G = A[2]));
        else ((B = void 0), (G = A[1]));
        else ((Q = ""), (B = A[0]), (G = A[1]));
        if (!(G instanceof xq2)) G = new xq2(G);
        return {
            path: Q,
            schema: B,
            options: G,
            callback: Z
        };
    }
});
