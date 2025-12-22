// Module: uUA
// Type: U
// Lines: 116816-116847
//
var uUA = U((Po7, HyQ)=>{
    var { addAbortListener: sn6 } = core utilities(), { RequestAbortedError: tn6 } = UndiciError(), WGA = Symbol("kListener"), Px = Symbol("kSignal");
    function KyQ(A) {
        if (A.abort) A.abort(A[Px]?.reason);
        else A.reason = A[Px]?.reason ?? new tn6();
        VyQ(A);
    }
    function en6(A, Q) {
        if (((A.reason = null), (A[Px] = null), (A[WGA] = null), !Q)) return;
        if (Q.aborted) {
            KyQ(A);
            return;
        }
        ((A[Px] = Q), (A[WGA] = ()=>{
            KyQ(A);
        }), sn6(A[Px], A[WGA]));
    }
    function VyQ(A) {
        if (!A[Px]) return;
        if ("removeEventListener" in A[Px]) A[Px].removeEventListener("abort", A[WGA]);
        else A[Px].removeListener("abort", A[WGA]);
        ((A[Px] = null), (A[WGA] = null));
    }
    HyQ.exports = {
        addSignal: en6,
        removeSignal: VyQ
    };
});
