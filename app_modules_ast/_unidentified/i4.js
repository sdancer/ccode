// Module: i4
// Type: L
// Lines: 190808-190857
//
var i4 = L(()=>{
    bA();
    ((MT = l(React runtime(), 1)), (lYB = l(React runtime(), 1)));
    iYB = MT.createContext(!1);
});
function il1(A) {
    let Q = A.toString();
    if (Q.includes("\x1B[I")) ((ll1 = !0), I0A.forEach((B)=>B(!0)));
    if (Q.includes("\x1B[O")) ((ll1 = !1), I0A.forEach((B)=>B(!1)));
}
function nYB() {
    let A = ()=>{
        if (I0A.size === 0) return;
        (process.stdin.off("data", il1), process.stdout.write("\x1B[?1004l"));
    };
    process.on("exit", A);
}
function ii() {
    let [A, Q] = kg.useState(ll1), [B, G] = kg.useState(!1), Z = kg.useCallback((J)=>{
        (Q(J), G(!1));
    }, []);
    (kg.useEffect(()=>{
        if (!process.stdout.isTTY) return;
        if ((I0A.add(Z), I0A.size === 1)) (process.stdout.write("\x1B[?1004h"), process.stdin.on("data", il1));
        return ()=>{
            if ((I0A.delete(Z), I0A.size === 0)) (process.stdin.off("data", il1), process.stdout.write("\x1B[?1004l"));
        };
    }, [
        Z
    ]), kg.useEffect(()=>{
        if (!A && B) r("tengu_typing_without_terminal_focus", {});
    }, [
        A,
        B
    ]));
    let Y = kg.useCallback((J, X)=>{
        if (J === "\x1B[I" || J === "\x1B[O" || J === "[I" || J === "[O") return "";
        if ((J || X) && !A) G(!0);
        return J;
    }, [
        A
    ]);
    return {
        isFocused: A || B,
        filterFocusSequences: Y
    };
}
var kg, ll1 = !0, I0A;
