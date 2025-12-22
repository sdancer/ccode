// Module: Lj
// Type: L
// Lines: 51753-51774
//
var Lj = L(()=>{
    rAQ();
    renderElement();
    v7 = {
        ...kw1,
        ...oAQ
    };
});
function fw1(A, Q) {
    return Tp(A, new v7.classes.URLSearchParams(), Object.assign({
        visitor: function(B, G, Z, Y) {
            if (v7.isNode && n1.isBuffer(B)) return (this.append(G, B.toString("base64")), !1);
            return Y.defaultVisitor.apply(this, arguments);
        }
    }, Q));
}
