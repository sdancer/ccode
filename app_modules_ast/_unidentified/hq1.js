// Module: hq1
// Type: U
// Lines: 56117-56141
//
var hq1 = U((_QQ)=>{
    Object.defineProperty(_QQ, "__esModule", {
        value: !0
    });
    _QQ.createMemoKey = _QQ.MemoPrefix = void 0;
    _QQ.MemoPrefix = {
        _gate: "g",
        _dynamicConfig: "c",
        _experiment: "e",
        _layer: "l",
        _paramStore: "p"
    };
    var MB4 = new Set([]), RB4 = new Set([
        "userPersistedValues"
    ]);
    function _B4(A, Q, B) {
        let G = `${A}|${Q}`;
        if (!B) return G;
        for (let Z of Object.keys(B)){
            if (RB4.has(Z)) return;
            if (MB4.has(Z)) G += `|${Z}=true`;
            else G += `|${Z}=${B[Z]}`;
        }
        return G;
    }
    _QQ.createMemoKey = _B4;
});
