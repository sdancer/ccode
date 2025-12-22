// Module: I81
// Type: U
// Lines: 282465-282485
//
var I81 = U((q9Z, unB)=>{
    function gN3(A, { EOL: Q = `
`, finalEOL: B = !0, replacer: G = null, spaces: Z } = {}) {
        let Y = B ? Q : "";
        return JSON.stringify(A, G, Z).replace(/\n/g, Q) + Y;
    }
    function uN3(A) {
        if (Buffer.isBuffer(A)) A = A.toString("utf8");
        return A.replace(/^\uFEFF/, "");
    }
    unB.exports = {
        stringify: gN3,
        stripBom: uN3
    };
});
