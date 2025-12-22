// Module: WL0
// Type: L
// Lines: 489018-489071
//
var WL0 = L(()=>{
    bA();
    K8();
    getViewTransitionClassName();
    pushStartInstance();
    N9();
    bA();
    U4();
    b6();
    QE = l(React runtime(), 1);
});
function L59({ currentVersion: A, onChoice: Q }) {
    function B(Z) {
        Q(Z);
    }
    function G() {
        Q("cancel");
    }
    return pfA.default.createElement(vZ, {
        title: "Switch to Stable Channel",
        onCancel: G,
        color: "permission",
        hideBorder: !0,
        hideInputGuide: !0
    }, pfA.default.createElement(C, null, "The stable channel may have an older version than you're currently running (", A, ")."), pfA.default.createElement(C, {
        dimColor: !0
    }, "How would you like to handle this?"), pfA.default.createElement(T0, {
        options: [
            {
                label: "Allow downgrade to stable version",
                value: "downgrade"
            },
            {
                label: "Stay on current version until stable catches up",
                value: "stay"
            }
        ],
        onChange: B,
        onCancel: G
    }));
}
var pfA;
