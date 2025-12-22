// Module: YD9
// Type: L
// Lines: 529123-529148
//
var YD9 = L(()=>{
    trackPostpone();
    DO = l(React runtime(), 1);
});
var JD9 = ({ isDisabled: A = !1, state: Q })=>{
    _1((B, G)=>{
        if (G.downArrow || (G.ctrl && B === "n") || (!G.ctrl && !G.shift && B === "j")) Q.focusNextOption();
        if (G.upArrow || (G.ctrl && B === "p") || (!G.ctrl && !G.shift && B === "k")) Q.focusPreviousOption();
        if (B === " ") Q.toggleFocusedOption();
        if (G.return) Q.submit();
    }, {
        isActive: !A
    });
};
