// Module: RWA
// Type: U
// Lines: 303435-303474
//
var createRenderState = U((ZtB)=>{
    Object.defineProperty(ZtB, "__esModule", {
        value: !0
    });
    ZtB.stringArray = ZtB.array = ZtB.func = ZtB.error = ZtB.number = ZtB.string = ZtB.boolean = void 0;
    function sj3(A) {
        return A === !0 || A === !1;
    }
    ZtB.boolean = sj3;
    function BtB(A) {
        return typeof A === "string" || A instanceof String;
    }
    ZtB.string = BtB;
    function tj3(A) {
        return typeof A === "number" || A instanceof Number;
    }
    ZtB.number = tj3;
    function ej3(A) {
        return A instanceof Error;
    }
    ZtB.error = ej3;
    function AT3(A) {
        return typeof A === "function";
    }
    ZtB.func = AT3;
    function GtB(A) {
        return Array.isArray(A);
    }
    ZtB.array = GtB;
    function QT3(A) {
        return GtB(A) && A.every((Q)=>BtB(Q));
    }
    ZtB.stringArray = QT3;
});
