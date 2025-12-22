// Module: Ww2
// Type: U
// Lines: 381652-381743
//
var trackPostpone = U((mSZ, Iw2)=>{
    var SyA = performWork();
    function jV0(A, Q, B, G, Z) {
        var Y = "", J = "", X = Math.floor(Z / 2) - 1;
        if (G - Q > X) ((Y = " ... "), (Q = G - X + Y.length));
        if (B - G > X) ((J = " ..."), (B = G + X - J.length));
        return {
            str: Y + A.slice(Q, B).replace(/\t/g, "→") + J,
            pos: G - Q + Y.length
        };
    }
    function TV0(A, Q) {
        return SyA.repeat(" ", Q - A.length) + A;
    }
    function Z55(A, Q) {
        if (((Q = Object.create(Q || null)), !A.buffer)) return null;
        if (!Q.maxLength) Q.maxLength = 79;
        if (typeof Q.indent !== "number") Q.indent = 1;
        if (typeof Q.linesBefore !== "number") Q.linesBefore = 3;
        if (typeof Q.linesAfter !== "number") Q.linesAfter = 2;
        var B = /\r?\n|\r|\0/g, G = [
            0
        ], Z = [], Y, J = -1;
        while((Y = B.exec(A.buffer)))if ((Z.push(Y.index), G.push(Y.index + Y[0].length), A.position <= Y.index && J < 0)) J = G.length - 2;
        if (J < 0) J = G.length - 1;
        var X = "", I, W, K = Math.min(A.line + Q.linesAfter, Z.length).toString().length, V = Q.maxLength - (Q.indent + K + 3);
        for(I = 1; I <= Q.linesBefore; I++){
            if (J - I < 0) break;
            ((W = jV0(A.buffer, G[J - I], Z[J - I], A.position - (G[J] - G[J - I]), V)), (X = SyA.repeat(" ", Q.indent) + TV0((A.line - I + 1).toString(), K) + " | " + W.str + `
` + X));
        }
        ((W = jV0(A.buffer, G[J], Z[J], A.position, V)), (X += SyA.repeat(" ", Q.indent) + TV0((A.line + 1).toString(), K) + " | " + W.str + `
`), (X += SyA.repeat("-", Q.indent + K + 3 + W.pos) + `^
`));
        for(I = 1; I <= Q.linesAfter; I++){
            if (J + I >= Z.length) break;
            ((W = jV0(A.buffer, G[J + I], Z[J + I], A.position - (G[J] - G[J + I]), V)), (X += SyA.repeat(" ", Q.indent) + TV0((A.line + I + 1).toString(), K) + " | " + W.str + `
`));
        }
        return X.replace(/\n$/, "");
    }
    Iw2.exports = Z55;
});
