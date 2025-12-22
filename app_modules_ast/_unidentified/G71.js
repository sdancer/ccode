// Module: G71
// Type: U
// Lines: 340903-340922
//
var renderChildrenArray = U((G72)=>{
    Object.defineProperty(G72, "__esModule", {
        value: !0
    });
    G72.getErrorMessage = Al3;
    G72.getErrorCode = Ql3;
    function Al3(A) {
        if (A instanceof Error) return A.message;
        else return String(A);
    }
    function Ql3(A) {
        if (typeof A === "object" && A !== null && "code" in A && typeof A.code === "number") return A.code;
        else return null;
    }
});
