// Module: LiB
// Type: U
// Lines: 281486-281501
//
var trackPostpone = U(($q3, X30)=>{
    var wiB = renderElement(), { checkPath: qiB } = pushStartInstance(), NiB = (A)=>{
        let Q = {
            mode: 511
        };
        if (typeof A === "number") return A;
        return {
            ...Q,
            ...A
        }.mode;
    };
    $q3.makeDir = async (A, Q)=>{
        return (qiB(A), wiB.mkdir(A, {
            mode: NiB(Q),
            recursive: !0
        }));
    };
    $q3.makeDirSync = (A, Q)=>{
        return (qiB(A), wiB.mkdirSync(A, {
            mode: NiB(Q),
            recursive: !0
        }));
    };
});
