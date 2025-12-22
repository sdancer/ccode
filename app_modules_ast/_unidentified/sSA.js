// Module: sSA
// Type: L
// Lines: 365785-365873
//
var sSA = L(()=>{
    bA();
    $2();
    ID = l(React runtime(), 1);
});
function QZ1({ tasks: A, isStandalone: Q = !1 }) {
    let [B] = IQ(), { teamContext: G } = B;
    if (A.length === 0) return null;
    let Z = {};
    if (G?.teammates) {
        for (let V of Object.values(G.teammates))if (V.color) {
            let H = E$[V.color];
            if (H) Z[V.name] = H;
        }
    }
    let Y = [
        ...A
    ].sort((V, H)=>parseInt(V.id, 10) - parseInt(H.id, 10)), J = A.filter((V)=>V.status === "open"), X = J.length, I = A.length - X, W = new Set(J.map((V)=>V.id)), K = hZ.createElement(hZ.Fragment, null, Y.map((V)=>hZ.createElement(b25, {
            key: V.id,
            task: V,
            ownerColor: V.owner ? Z[V.owner] : void 0,
            openBlockers: V.blockedBy.filter((H)=>W.has(H))
        })));
    if (Q) return hZ.createElement(T, {
        flexDirection: "column",
        marginTop: 1,
        marginLeft: 2
    }, hZ.createElement(C, {
        bold: !0,
        dimColor: !0
    }, "Tasks (", I, " done, ", X, " open)"), K);
    return hZ.createElement(T, {
        flexDirection: "column"
    }, K);
}
function b25({ task: A, ownerColor: Q, openBlockers: B }) {
    let G = A.status === "resolved", Z = G ? B1.checkboxOn : B1.checkboxOff;
    return hZ.createElement(T, null, hZ.createElement(C, {
        dimColor: G
    }, Z, " "), hZ.createElement(C, {
        dimColor: !0
    }, "#", A.id, " "), hZ.createElement(C, {
        bold: !!A.owner && !G,
        strikethrough: G,
        dimColor: G || B.length > 0
    }, A.subject), A.owner && hZ.createElement(C, null, " (", Q ? hZ.createElement(C, {
        color: Q
    }, A.owner) : A.owner, ")"), B.length > 0 && hZ.createElement(C, {
        dimColor: !0
    }, " ", B1.pointerSmall, " blocked by", " ", [
        ...B
    ].sort((Y, J)=>parseInt(Y, 10) - parseInt(J, 10)).map((Y)=>`#${Y}`).join(", ")));
}
var hZ;
