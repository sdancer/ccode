// Module: dU0
// Type: L
// Lines: 520207-520252
//
var samplingCallback = L(()=>{
    cx();
    psA();
    lc1();
    $NA();
    createRenderState();
    Ug();
    createRenderState();
    cV();
    wZ();
});
function L6(A) {
    let [Q] = D2(), { isFocused: B, filterFocusSequences: G } = ii(), Z = TK1({
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
        invert: B ? V1.inverse : (Y)=>Y,
        themeText: SB("text", Q),
        columns: A.columns,
        onImagePaste: A.onImagePaste,
        disableCursorMovementForUpDownKeys: A.disableCursorMovementForUpDownKeys,
        externalOffset: A.cursorOffset,
        onOffsetChange: A.onChangeCursorOffset,
        inputFilter: G
    });
    return lK9.default.createElement(PK1, {
        inputState: Z,
        terminalFocus: B,
        highlights: A.highlights,
        ...A
    });
}
var lK9;
