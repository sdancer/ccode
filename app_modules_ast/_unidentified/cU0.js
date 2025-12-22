// Module: cU0
// Type: L
// Lines: 450023-450077
//
var main = L(()=>{
    bA();
    ni2();
    oi2();
    Qn2();
    Vs = l(React runtime(), 1);
});
function pU0(A) {
    let [Q] = D2(), { isFocused: B, filterFocusSequences: G } = ii(), Z = pi2({
        value: A.value,
        onChange: A.onChange,
        onSubmit: A.onSubmit,
        onExit: A.onExit,
        onExitMessage: A.onExitMessage,
        onHistoryReset: A.onHistoryReset,
        onHistoryUp: A.onHistoryUp,
        onHistoryDown: A.onHistoryDown,
        focus: A.focus,
        mask: A.mask,
        multiline: A.multiline,
        cursorChar: A.showCursor ? " " : "",
        highlightPastedText: A.highlightPastedText,
        invert: B ? V1.inverse : (X)=>X,
        themeText: SB("text", Q),
        columns: A.columns,
        onImagePaste: A.onImagePaste,
        disableCursorMovementForUpDownKeys: A.disableCursorMovementForUpDownKeys,
        externalOffset: A.cursorOffset,
        onOffsetChange: A.onChangeCursorOffset,
        onModeChange: A.onModeChange,
        isMessageLoading: A.isLoading,
        onUndo: A.onUndo,
        inputFilter: G
    }), { mode: Y, setMode: J } = Z;
    return (SK1.default.useEffect(()=>{
        if (A.initialMode && A.initialMode !== Y) J(A.initialMode);
    }, [
        A.initialMode,
        Y,
        J
    ]), SK1.default.createElement(T, {
        flexDirection: "column"
    }, SK1.default.createElement(PK1, {
        inputState: Z,
        terminalFocus: B,
        highlights: A.highlights,
        ...A
    })));
}
var SK1;
