// Module: pl1
// Type: L
// Lines: 190776-190808
//
var canHydrateInstance = L(()=>{
    bA();
    N9();
    createRenderState();
    createRenderState();
    $2();
    P3();
    ((N6 = l(React runtime(), 1)), (vg = l(React runtime(), 1)), (Nj8 = [
        {
            value: "yes-session",
            label: "Yes, for this session"
        },
        {
            value: "yes-remember",
            label: "Yes, and remember this directory"
        },
        {
            value: "no",
            label: "No"
        }
    ]));
});
function b0({ children: A, height: Q }) {
    if (lYB.useContext(iYB)) return A;
    return MT.createElement(Mj8, null, MT.createElement(T, {
        flexDirection: "row",
        height: Q,
        overflowY: "hidden"
    }, MT.createElement(C, null, "  ", "⎿  "), A));
}
function Mj8({ children: A }) {
    return MT.createElement(iYB.Provider, {
        value: !0
    }, A);
}
var MT, lYB, iYB;
