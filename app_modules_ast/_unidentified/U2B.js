// Module: U2B
// Type: L
// Lines: 150752-150889
//
var preload = L(()=>{
    Vi();
    urA();
});
function TZA(A) {
    return mrA.get(A);
}
function q2B(A) {
    let Q = A.attributes.eventTargetId;
    if (typeof Q === "string") mrA.delete(Q);
    for (let B of A.childNodes)if (B.nodeName !== "#text") q2B(B);
}
function kE8(A, Q) {
    if (A === Q) return !0;
    let B = Object.keys(A), G = Object.keys(Q);
    if (B.length !== G.length) return !1;
    for (let Z of B)if (A[Z] !== Q[Z]) return !1;
    return !0;
}
var Dd1 = void 0, w2B, mrA, vE8 = ()=>{
    if (Dd1 === void 0) throw Error("Yoga not loaded");
    return Dd1;
}, drA = (A)=>{
    let Q = vE8(), G = {
        nodeName: A,
        style: {},
        attributes: {},
        childNodes: [],
        parentNode: void 0,
        yogaNode: A !== "ink-virtual-text" && A !== "ink-link" && A !== "ink-progress" ? Q.Node.create() : void 0,
        dirty: !1
    };
    if (A === "ink-text") G.yogaNode?.setMeasureFunc(fE8.bind(null, G));
    return G;
}, crA = (A, Q)=>{
    if (Q.parentNode) RqA(Q.parentNode, Q);
    if (((Q.parentNode = A), A.childNodes.push(Q), Q.yogaNode)) A.yogaNode?.insertChild(Q.yogaNode, A.yogaNode.getChildCount());
    Xg(A);
}, Fd1 = (A, Q, B)=>{
    if (Q.parentNode) RqA(Q.parentNode, Q);
    Q.parentNode = A;
    let G = A.childNodes.indexOf(B);
    if (G >= 0) {
        let Z = 0;
        if (Q.yogaNode && A.yogaNode) {
            for(let Y = 0; Y < G; Y++)if (A.childNodes[Y]?.yogaNode) Z++;
        }
        if ((A.childNodes.splice(G, 0, Q), Q.yogaNode && A.yogaNode)) A.yogaNode.insertChild(Q.yogaNode, Z);
        Xg(A);
        return;
    }
    if ((A.childNodes.push(Q), Q.yogaNode)) A.yogaNode?.insertChild(Q.yogaNode, A.yogaNode.getChildCount());
    Xg(A);
}, RqA = (A, Q)=>{
    if (Q.yogaNode) Q.parentNode?.yogaNode?.removeChild(Q.yogaNode);
    Q.parentNode = void 0;
    let B = A.childNodes.indexOf(Q);
    if (B >= 0) A.childNodes.splice(B, 1);
    if (Q.nodeName !== "#text") q2B(Q);
    Xg(A);
}, Ed1 = (A, Q, B)=>{
    if (Q === "children") return;
    if (A.attributes[Q] === B) return;
    if (Q === "eventTargetId") {
        let G = A.attributes[Q];
        if (typeof G === "string") mrA.delete(G);
        if (typeof B === "string") mrA.set(B, A);
    }
    ((A.attributes[Q] = B), Xg(A));
}, zd1 = (A, Q)=>{
    if (kE8(A.style, Q)) return;
    ((A.style = Q), Xg(A));
}, Cd1 = (A, Q)=>{
    A._eventHandlers = Q;
}, N2B = (A)=>{
    let Q = {
        nodeName: "#text",
        nodeValue: A,
        yogaNode: void 0,
        parentNode: void 0,
        style: {}
    };
    return (_qA(Q, A), Q);
}, fE8 = function(A, Q, B) {
    let G = A.nodeName === "#text" ? A.nodeValue : X2B(A), Z = $2B(G), Y = SrA(Z, Q);
    if (Y.width <= Q) return Y;
    if (Y.width >= 1 && Q > 0 && Q < 1) return Y;
    if (Z.includes(`
`) && B === UqA.Undefined) {
        let I = Math.max(Q, Y.width);
        return SrA(Z, I);
    }
    let J = A.style?.textWrap ?? "wrap", X = lx(Z, Q, J);
    return SrA(X, Q);
}, Xg = (A)=>{
    let Q = A, B = !1;
    while(Q){
        if (Q.nodeName !== "#text") {
            if (((Q.dirty = !0), !B && Q.nodeName === "ink-text" && Q.yogaNode)) (Q.yogaNode.markDirty(), (B = !0));
        }
        Q = Q.parentNode;
    }
}, _qA = (A, Q)=>{
    if (typeof Q !== "string") Q = String(Q);
    if (A.nodeValue === Q) return;
    ((A.nodeValue = Q), Xg(A));
};
