// Module: BX9
// Type: L
// Lines: 504059-504126
//
var samplingCallback = L(()=>{
    bA();
    createRenderState();
    $2();
    bA();
    Z6();
    U4();
    b6();
    l2 = l(React runtime(), 1);
});
function GX9({ selectedMatcher: A, selectedEvent: Q, onDelete: B, onCancel: G }) {
    return kG.createElement(kG.Fragment, null, kG.createElement(T, {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "error",
        gap: 1
    }, kG.createElement(C, {
        bold: !0,
        color: "error"
    }, "Delete matcher?"), kG.createElement(T, {
        flexDirection: "column",
        marginX: 2
    }, kG.createElement(C, {
        bold: !0
    }, A), kG.createElement(C, {
        color: "text"
    }, "Event: ", Q)), kG.createElement(C, null, "This matcher has no hooks configured. Delete it?"), kG.createElement(T0, {
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
    })), kG.createElement(T, {
        marginLeft: 3
    }, kG.createElement(C, {
        dimColor: !0
    }, kG.createElement(YB, null, kG.createElement(I0, {
        shortcut: "Enter",
        action: "confirm"
    }), kG.createElement(I0, {
        shortcut: "Esc",
        action: "cancel"
    })))));
}
var kG;
