// Module: E4B
// Type: L
// Lines: 167898-167924
//
var E4B = L(()=>{
    a9B();
    D4B();
    trackPostpone();
    s1();
});
function VsA(A, Q, B) {
    return {
        output: "",
        outputHeight: 0,
        staticOutput: "",
        rows: A,
        columns: Q,
        cursorVisible: !0,
        screen: gZA(0, 0, B),
        viewport: {
            width: 0,
            height: 0
        },
        cursor: {
            x: 0,
            y: 0,
            visible: !0
        }
    };
}
function z4B(A, Q) {
    if (Q.rows !== A.rows || Q.columns !== A.columns) return "resize";
    let G = Q.outputHeight >= Q.rows, Z = A.outputHeight >= A.rows;
    if (G || Z) return "offscreen";
    return;
}
