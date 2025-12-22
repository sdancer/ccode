// Module: MkA
// Type: L
// Lines: 450094-450106
//
var MkA = L(()=>{
    createRenderState();
    getViewTransitionClassName();
    I5();
});
function Hs() {
    let [{ mainLoopModel: A, mainLoopModelForSession: Q }] = IQ();
    return Zn2.useMemo(()=>{
        return JW(Q ?? A ?? XrA());
    }, [
        Q,
        A
    ]);
}
var Zn2;
