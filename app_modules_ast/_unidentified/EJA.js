// Module: EJA
// Type: U
// Lines: 217755-217781
//
var EJA = U((szB)=>{
    Object.defineProperty(szB, "__esModule", {
        value: !0
    });
    szB.createCrypto = hc8;
    szB.hasBrowserCrypto = rzB;
    szB.fromArrayBufferToHex = gc8;
    var fc8 = lzB(), bc8 = createRenderState();
    function hc8() {
        if (rzB()) return new fc8.BrowserCrypto();
        return new bc8.NodeCrypto();
    }
    function rzB() {
        return (typeof window < "u" && typeof window.crypto < "u" && typeof window.crypto.subtle < "u");
    }
    function gc8(A) {
        return Array.from(new Uint8Array(A)).map((B)=>{
            return B.toString(16).padStart(2, "0");
        }).join("");
    }
});
