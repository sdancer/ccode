// Module: Z2B
// Type: L
// Lines: 150354-150412
//
var createRenderState = L(()=>{
    OqA();
    ((RE8 = /^[\uD800-\uDBFF][\uDC00-\uDFFF]$/), (G2B = [
        "\x1B",
        ""
    ]));
});
function krA(A, Q, B) {
    if (A.charAt(Q) === " ") return Q;
    let G = B ? 1 : -1;
    for(let Z = 0; Z <= 3; Z++){
        let Y = Q + Z * G;
        if (A.charAt(Y) === " ") return Y;
    }
    return Q;
}
function Yd1(A, Q, B = {}) {
    let { position: G = "end", space: Z = !1, preferTruncationOnSpace: Y = !1 } = B, { truncationCharacter: J = "…" } = B;
    if (typeof A !== "string") throw TypeError(`Expected \`input\` to be a string, got ${typeof A}`);
    if (typeof Q !== "number") throw TypeError(`Expected \`columns\` to be a number, got ${typeof Q}`);
    if (Q < 1) return "";
    if (Q === 1) return J;
    let X = yY(A);
    if (X <= Q) return A;
    if (G === "start") {
        if (Y) {
            let I = krA(A, X - Q + 1, !0);
            return J + px(A, I, X).trim();
        }
        if (Z === !0) J += " ";
        return J + px(A, X - Q + yY(J), X);
    }
    if (G === "middle") {
        if (Z === !0) J = ` ${J} `;
        let I = Math.floor(Q / 2);
        if (Y) {
            let W = krA(A, I), K = krA(A, X - (Q - I) + 1, !0);
            return px(A, 0, W) + J + px(A, K, X).trim();
        }
        return px(A, 0, I) + J + px(A, X - (Q - I) + yY(J), X);
    }
    if (G === "end") {
        if (Y) {
            let I = krA(A, Q - 1);
            return px(A, 0, I) + J;
        }
        if (Z === !0) J = ` ${J}`;
        return px(A, 0, Q - yY(J)) + J;
    }
    throw Error(`Expected \`options.position\` to be either \`start\`, \`middle\` or \`end\`, got ${G}`);
}
