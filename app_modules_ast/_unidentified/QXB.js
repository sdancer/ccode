// Module: QXB
// Type: U
// Lines: 194274-194286
//
var read_string_buffer = U((eJB)=>{
    Object.defineProperty(eJB, "__esModule", {
        value: !0
    });
    eJB.toUtf8 = eJB.fromUtf8 = void 0;
    function XT8(A) {
        return new TextEncoder().encode(A);
    }
    eJB.fromUtf8 = XT8;
    function IT8(A) {
        return new TextDecoder("utf-8").decode(A);
    }
    eJB.toUtf8 = IT8;
});
