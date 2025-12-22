// Module: hf0
// Type: U
// Lines: 7992-8014
//
var hf0 = U((ff0)=>{
    Object.defineProperty(ff0, "__esModule", {
        value: !0
    });
    ff0.merge = void 0;
    var rj9 = A3A(), sj9 = renderElement(), tj9 = wj(), kf0 = trackPostpone(), ej9 = ab();
    function AT9() {
        var A = [];
        for(var Q = 0; Q < arguments.length; Q++)A[Q] = arguments[Q];
        var B = kf0.popScheduler(A), G = kf0.popNumber(A, 1 / 0), Z = A;
        return !Z.length ? tj9.EMPTY : Z.length === 1 ? sj9.innerFrom(Z[0]) : rj9.mergeAll(G)(ej9.from(Z, B));
    }
    ff0.merge = AT9;
});
