// Module: N79
// Type: L
// Lines: 492513-492572
//
var N79 = L(()=>{
    aQ();
    g1();
    pushStartInstance();
    restoreViewTransitionName();
    pushStartInstance();
    w79();
    bA();
    bA();
    U$();
    Z6();
    ((IO = l(React runtime(), 1)), (jL0 = l(React runtime(), 1)), (k67 = {
        type: "local-jsx",
        name: "memory",
        description: "Edit Claude memory files",
        isEnabled: ()=>!0,
        isHidden: !1,
        async call (A) {
            return IO.createElement(f67, {
                onDone: A
            });
        },
        userFacingName () {
            return this.name;
        }
    }));
    q79 = k67;
});
function L79({ onCancel: A }) {
    return (_1((Q, B)=>{
        if (B.escape) A();
    }), u$.createElement(T, {
        flexDirection: "column",
        paddingY: 1,
        gap: 1
    }, u$.createElement(T, null, u$.createElement(C, null, "Claude understands your codebase, makes edits with your permission, and executes commands — right from your terminal.")), u$.createElement(T, {
        flexDirection: "column"
    }, u$.createElement(T, null, u$.createElement(C, {
        bold: !0
    }, "Shortcuts")), u$.createElement(yK1, {
        gap: 2
    }))));
}
var u$;
