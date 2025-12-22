// Module: Ad
// Type: L
// Lines: 389251-389378
//
var Ad = L(()=>{
    bA();
    GD0();
    zL2 = l(React runtime(), 1);
});
function yY5({ request: A }) {
    return H8.createElement(T, {
        flexDirection: "column",
        marginY: 1
    }, H8.createElement(T, {
        borderStyle: "round",
        borderColor: "warning",
        flexDirection: "column",
        paddingX: 1,
        paddingY: 1
    }, H8.createElement(T, {
        marginBottom: 1
    }, H8.createElement(C, {
        color: "warning",
        bold: !0
    }, "Shutdown request from ", A.from)), A.reason && H8.createElement(T, null, H8.createElement(C, null, "Reason: ", A.reason))));
}
function xY5({ response: A }) {
    return H8.createElement(T, {
        flexDirection: "column",
        marginY: 1
    }, H8.createElement(T, {
        borderStyle: "round",
        borderColor: "success",
        flexDirection: "column",
        paddingX: 1,
        paddingY: 1
    }, H8.createElement(C, {
        color: "success",
        bold: !0
    }, "Shutdown approved by ", A.from), H8.createElement(T, {
        marginTop: 1
    }, H8.createElement(C, {
        dimColor: !0
    }, "Teammate is now exiting."))));
}
function vY5({ response: A }) {
    return H8.createElement(T, {
        flexDirection: "column",
        marginY: 1
    }, H8.createElement(T, {
        borderStyle: "round",
        borderColor: "subtle",
        flexDirection: "column",
        paddingX: 1,
        paddingY: 1
    }, H8.createElement(C, {
        color: "subtle",
        bold: !0
    }, "Shutdown rejected by ", A.from), H8.createElement(T, {
        marginTop: 1,
        borderStyle: "dashed",
        borderColor: "subtle",
        borderLeft: !1,
        borderRight: !1,
        paddingX: 1
    }, H8.createElement(C, null, "Reason: ", A.reason)), H8.createElement(T, {
        marginTop: 1
    }, H8.createElement(C, {
        dimColor: !0
    }, "Teammate is continuing to work. You may request shutdown again later."))));
}
function CL2(A) {
    let Q = $yA(A);
    if (Q) return H8.createElement(yY5, {
        request: Q
    });
    let B = yVA(A);
    if (B) return H8.createElement(xY5, {
        response: B
    });
    let G = wK0(A);
    if (G) return H8.createElement(vY5, {
        response: G
    });
    return null;
}
function $L2(A) {
    let Q = $yA(A);
    if (Q) return `[Shutdown Request from ${Q.from}]${Q.reason ? ` ${Q.reason}` : ""}`;
    let B = yVA(A);
    if (B) return `[Shutdown Approved] ${B.from} is now exiting`;
    let G = wK0(A);
    if (G) return `[Shutdown Rejected] ${G.from}: ${G.reason}`;
    return null;
}
var H8;
