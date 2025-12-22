// Module: mj0
// Type: L
// Lines: 819-834
//
var mj0 = L(()=>{
    uj0 = g$9;
});
function m$9(A, Q) {
    var B = this.__data__;
    if (B instanceof nc) {
        var G = B.__data__;
        if (!ac || G.length < u$9 - 1) return (G.push([
            A,
            Q
        ]), (this.size = ++B.size), this);
        B = this.__data__ = new gt(G);
    }
    return (B.set(A, Q), (this.size = B.size), this);
}
var u$9 = 200, dj0;
