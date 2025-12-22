// Module: VKA
// Type: L
// Lines: 322886-322990
//
var getViewTransitionClassName = L(()=>{
    g1();
    b8();
    KB();
    createRenderState();
    pushStartInstance();
    eI();
    createRenderState();
    xw();
});
function Gh3({ orientation: A = "horizontal", width: Q = "auto", dividerChar: B, dividerColor: G, dividerDimColor: Z = !0, boxProps: Y }) {
    let J = A === "vertical", X = B || (J ? "│" : "─");
    if (J) return Rm.default.createElement(T, {
        height: "100%",
        borderStyle: {
            topLeft: "",
            top: "",
            topRight: "",
            right: X,
            bottomRight: "",
            bottom: "",
            bottomLeft: "",
            left: ""
        },
        borderColor: G,
        borderDimColor: Z,
        borderBottom: !1,
        borderTop: !1,
        borderLeft: !1,
        borderRight: !0,
        ...Y
    });
    return Rm.default.createElement(T, {
        width: Q,
        borderStyle: {
            topLeft: "",
            top: "",
            topRight: "",
            right: "",
            bottomRight: "",
            bottom: X,
            bottomLeft: "",
            left: ""
        },
        borderColor: G,
        borderDimColor: Z,
        flexGrow: 1,
        borderBottom: !0,
        borderTop: !1,
        borderLeft: !1,
        borderRight: !1,
        ...Y
    });
}
function Zh3({ orientation: A = "horizontal", title: Q, width: B = "auto", padding: G = 0, titlePadding: Z = 1, titleColor: Y = "text", titleDimColor: J = !0, dividerChar: X, dividerColor: I, dividerDimColor: W = !0, boxProps: K }) {
    let V = A === "vertical", D = Rm.default.createElement(Gh3, {
        orientation: A,
        dividerChar: X || (V ? "│" : "─"),
        dividerColor: I,
        dividerDimColor: W,
        boxProps: K
    });
    if (V) return D;
    if (!Q) return Rm.default.createElement(T, {
        paddingLeft: G,
        paddingRight: G
    }, D);
    return Rm.default.createElement(T, {
        width: B,
        paddingLeft: G,
        paddingRight: G,
        gap: Z
    }, D, Rm.default.createElement(T, null, Rm.default.createElement(C, {
        color: Y,
        dimColor: J
    }, Rm.default.createElement(T3, null, Q))), D);
}
var Rm, g8;
