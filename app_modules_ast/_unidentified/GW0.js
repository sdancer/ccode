// Module: GW0
// Type: L
// Lines: 364841-364876
//
var GW0 = L(()=>{
    bA();
    I_();
    o2A = l(React runtime(), 1);
});
function HY({ title: A, subtitle: Q, color: B = "permission", titleColor: G, innerPaddingX: Z = 1, workerBadge: Y, children: J }) {
    return sP.createElement(T, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: B,
        borderLeft: !1,
        borderRight: !1,
        borderBottom: !1,
        marginTop: 1
    }, sP.createElement(T, {
        paddingX: 1,
        flexDirection: "column"
    }, Y && sP.createElement(oG1, {
        name: Y.name,
        color: Y.color
    }), sP.createElement(HVA, {
        title: A,
        subtitle: Q,
        color: G
    })), sP.createElement(T, {
        flexDirection: "column",
        paddingX: Z
    }, J));
}
var sP;
