// Module: XTA
// Type: U
// Lines: 282162-282176
//
var XTA = U((D9Z, QnB)=>{
    var X81 = renderElement(), DN3 = renderElement().fromCallback, AnB = renderElement();
    function FN3(A, Q) {
        if (X81.rm) return X81.rm(A, {
            recursive: !0,
            force: !0
        }, Q);
        AnB(A, Q);
    }
    function EN3(A) {
        if (X81.rmSync) return X81.rmSync(A, {
            recursive: !0,
            force: !0
        });
        AnB.sync(A);
    }
    QnB.exports = {
        remove: DN3(FN3),
        removeSync: EN3
    };
});
