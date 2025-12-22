// Module: Re2
// Type: L
// Lines: 465374-465409
//
var samplingCallback = L(()=>{
    bA();
    N9();
    Ue2();
    qe2();
    Le2();
    Me2();
    ZfA = l(React runtime(), 1);
});
function e07(A, Q) {
    if (A.length <= t07) return {
        truncatedText: A,
        placeholderContent: ""
    };
    let B = Math.floor(_e2 / 2), G = Math.floor(_e2 / 2), Z = A.slice(0, B), Y = A.slice(-G), J = A.slice(B, -G), X = jtA(J), W = AQ7(Q, X);
    return {
        truncatedText: Z + W + Y,
        placeholderContent: J
    };
}
function AQ7(A, Q) {
    return `[...Truncated text #${A} +${Q} lines...]`;
}
function je2(A, Q) {
    let B = Object.keys(Q).map(Number), G = B.length > 0 ? Math.max(...B) + 1 : 1, { truncatedText: Z, placeholderContent: Y } = e07(A, G);
    if (!Y) return {
        newInput: A,
        newPastedContents: Q
    };
    return {
        newInput: Z,
        newPastedContents: {
            ...Q,
            [G]: {
                id: G,
                type: "text",
                content: Y
            }
        }
    };
}
var t07 = 1e4, _e2 = 1000;
