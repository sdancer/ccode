// Module: FJ9
// Type: L
// Lines: 501846-501894
//
var FJ9 = L(()=>{
    Iq0();
    ((sO0 = l(React runtime(), 1)), (wG7 = {
        type: "local-jsx",
        name: "tasks",
        aliases: [
            "bashes"
        ],
        description: "List and manage background tasks",
        isEnabled: ()=>!0,
        isHidden: !1,
        async call (A, Q) {
            return sO0.createElement(UV1, {
                toolUseContext: Q,
                onDone: A
            });
        },
        userFacingName () {
            return "tasks";
        }
    }), (DJ9 = wG7));
});
var EJ9 = ()=>{};
function zJ9() {
    let A = m0(), Q = Um(A);
    if (Q.length === 0) return yS.default.createElement(C, null, "No todos currently tracked");
    return yS.default.createElement(T, {
        flexDirection: "column"
    }, yS.default.createElement(C, null, yS.default.createElement(C, {
        bold: !0
    }, Q.length, " ", Q.length === 1 ? "todo" : "todos"), yS.default.createElement(C, null, ":")), yS.default.createElement(T, {
        marginTop: 1
    }, yS.default.createElement(Qr, {
        todos: Q
    })));
}
var yS, qG7, CJ9;
