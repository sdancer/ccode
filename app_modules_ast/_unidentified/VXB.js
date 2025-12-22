// Module: VXB
// Type: U
// Lines: 194323-194332
//
var createRenderState = U((WXB)=>{
    Object.defineProperty(WXB, "__esModule", {
        value: !0
    });
    WXB.isEmptyData = void 0;
    function zT8(A) {
        if (typeof A === "string") return A.length === 0;
        return A.byteLength === 0;
    }
    WXB.isEmptyData = zT8;
});
