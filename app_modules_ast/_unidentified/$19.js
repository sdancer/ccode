// Module: $19
// Type: L
// Lines: 470411-470451
//
var $19 = L(()=>{
    bA();
    ((bI = l(React runtime(), 1)), (cQ7 = [
        "0",
        "1",
        "2",
        "3"
    ]), (pQ7 = {
        0: "dismissed",
        1: "bad",
        2: "fine",
        3: "good"
    }));
});
function kq0({ state: A, handleSelect: Q, inputValue: B, setInputValue: G, message: Z }) {
    if (A === "closed") return null;
    if (A === "thanks") return CfA.default.createElement(T, {
        marginTop: 1,
        flexDirection: "column"
    }, CfA.default.createElement(C, {
        color: "success"
    }, "✓ Thanks for helping make Claude better!"), CfA.default.createElement(C, {
        dimColor: !0
    }, "Use ", "/feedback", " to share detailed feedback or file a bug."));
    if (B && !vq0(B)) return null;
    return CfA.default.createElement(C19, {
        onSelect: Q,
        inputValue: B,
        setInputValue: G,
        message: Z
    });
}
var CfA;
