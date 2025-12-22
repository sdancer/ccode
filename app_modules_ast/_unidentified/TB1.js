// Module: TB1
// Type: L
// Lines: 244469-244551
//
var pushStartInstance = L(()=>{
    pushStartInstance();
});
import * as aA0 from "path";
async function gPB(A, Q, { maxSizeBytes: B = ERA, maxTokens: G = rA0 }) {
    if (!PB1.has(Q) && A.length > B) throw Error(oA0(A.length, B));
    let Z = jZ(A);
    if (!Z || Z <= G / 4) return;
    let Y = await DPB(A);
    if (Y && Y > G) throw new yB1(Y, G);
}
function SB1(A, Q, B, G) {
    return {
        type: "image",
        file: {
            base64: A.toString("base64"),
            type: `image/${Q}`,
            originalSize: B,
            dimensions: G
        }
    };
}
async function a23(A, Q) {
    let G = vA().statSync(A).size, Z = vA().readFileBytesSync(A), Y = qtA(Z);
    try {
        let J = await t5B(Z, Q, Y);
        return {
            type: "image",
            file: {
                base64: J.base64,
                type: J.mediaType,
                originalSize: G
            }
        };
    } catch (J) {
        t(J);
        try {
            let X = await Promise.resolve().then(()=>l(Ep1(), 1)), W = await (X.default || X)(Z).resize(400, 400, {
                fit: "inside",
                withoutEnlargement: !0
            }).jpeg({
                quality: 20
            }).toBuffer();
            return SB1(W, "jpeg", G);
        } catch (X) {
            t(X);
            let I = Y.split("/")[1] || "png";
            return SB1(Z, I, G);
        }
    }
}
async function o23(A, Q) {
    let G = vA().statSync(A).size;
    if (G === 0) throw Error(`Image file is empty: ${A}`);
    let Z = vA().readFileBytesSync(A), J = qtA(Z).split("/")[1] || "png";
    try {
        let X = await JYA(Z, G, J);
        return SB1(X.buffer, X.mediaType, G, X.dimensions);
    } catch (X) {
        return (t(X), SB1(Z, J, G));
    }
}
async function sA0(A, Q = rA0, B = A.split(".").pop()?.toLowerCase() || "png") {
    let G = await o23(A, B);
    if (Math.ceil(G.file.base64.length * 0.125) > Q) return await a23(A, Q);
    return G;
}
var d23, rA0 = 25000, yB1, PB1, c23, p23, l23, i23, D3, n23 = `

<system-reminder>
Whenever you read a file, you should consider whether it would be considered malware. You CAN and SHOULD provide analysis of malware, what it is doing. But you MUST refuse to improve or augment the code. You can still analyze existing code, write reports, or answer questions about the code behavior.
</system-reminder>
`, oA0 = (A, Q = ERA)=>`File content (${FI(A)}) exceeds maximum allowed size (${FI(Q)}). Please use offset and limit parameters to read specific portions of the file, or use the GrepTool to search for specific content.`;
