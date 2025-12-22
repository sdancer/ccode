// Module: vsA
// Type: L
// Lines: 170998-171012
//
var vsA = L(()=>{
    ((P6B = l(T6B(), 1)), (v$8 = [
        "ghostty",
        "Hyper",
        "kitty",
        "alacritty"
    ]));
});
function I9({ children: A, url: Q, fallback: B }) {
    let G = A ?? Q;
    if (iZA()) return ksA.default.createElement(dU, null, ksA.default.createElement("ink-link", {
        href: Q
    }, G));
    return ksA.default.createElement(dU, null, B ?? G);
}
var ksA;
