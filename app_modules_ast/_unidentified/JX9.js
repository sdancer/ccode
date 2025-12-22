// Module: JX9
// Type: L
// Lines: 504219-504287
//
var prepareToHydrateHostInstance = L(()=>{
    $2();
    bA();
    Jf();
    P3();
    U4();
    b6();
    n7 = l(React runtime(), 1);
});
function XX9({ selectedHook: A, eventSupportsMatcher: Q, onDelete: B, onCancel: G }) {
    return H7.createElement(H7.Fragment, null, H7.createElement(T, {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "error",
        gap: 1
    }, H7.createElement(C, {
        bold: !0,
        color: "error"
    }, "Delete hook?"), H7.createElement(T, {
        flexDirection: "column",
        marginX: 2
    }, H7.createElement(C, {
        bold: !0
    }, c$(A.config)), H7.createElement(C, {
        dimColor: !0
    }, "Event: ", A.event), Q && H7.createElement(C, {
        dimColor: !0
    }, "Matcher: ", A.matcher), H7.createElement(C, {
        dimColor: !0
    }, WX9(A.source))), H7.createElement(C, null, "This will remove the hook configuration from your settings."), H7.createElement(T0, {
        onChange: (Z)=>(Z === "yes" ? B() : G()),
        onCancel: G,
        options: [
            {
                label: "Yes",
                value: "yes"
            },
            {
                label: "No",
                value: "no"
            }
        ]
    })), H7.createElement(T, {
        marginLeft: 3
    }, H7.createElement(C, {
        dimColor: !0
    }, H7.createElement(YB, null, H7.createElement(I0, {
        shortcut: "Enter",
        action: "confirm"
    }), H7.createElement(I0, {
        shortcut: "Esc",
        action: "cancel"
    })))));
}
var H7;
