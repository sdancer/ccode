// Module: qI9
// Type: L
// Lines: 508490-508580
//
var qI9 = L(()=>{
    bA();
    bA();
    $2();
    b6();
    wW();
    createRenderState();
    pushStartInstance();
    hK();
    pushStartInstance();
    Y$();
    getViewTransitionClassName();
    zB();
    ((d1 = l(React runtime(), 1)), (l$ = l(React runtime(), 1)));
});
function gs({ totalItems: A, maxVisible: Q = YZ7, selectedIndex: B = 0 }) {
    let G = A > Q, Z = KO.useRef(0), Y = KO.useMemo(()=>{
        if (!G) return 0;
        let O = Z.current;
        if (B < O) return ((Z.current = B), B);
        if (B >= O + Q) {
            let R = B - Q + 1;
            return ((Z.current = R), R);
        }
        let N = Math.max(0, A - Q), M = Math.min(O, N);
        return ((Z.current = M), M);
    }, [
        B,
        Q,
        G,
        A
    ]), J = Y, X = Math.min(Y + Q, A), I = KO.useCallback((O)=>{
        if (!G) return O;
        return O.slice(J, X);
    }, [
        G,
        J,
        X
    ]), W = KO.useCallback((O)=>{
        return J + O;
    }, [
        J
    ]), K = KO.useCallback((O)=>{
        return O >= J && O < X;
    }, [
        J,
        X
    ]), V = KO.useCallback((O)=>{}, []), H = KO.useCallback(()=>{}, []), D = KO.useCallback(()=>{}, []), F = KO.useCallback((O, N)=>{
        let M = Math.max(0, Math.min(O, A - 1));
        N(M);
    }, [
        A
    ]), E = KO.useCallback((O, N)=>{
        return !1;
    }, []), z = Math.max(1, Math.ceil(A / Q));
    return {
        currentPage: Math.floor(Y / Q),
        totalPages: z,
        startIndex: J,
        endIndex: X,
        needsPagination: G,
        pageSize: Q,
        getVisibleItems: I,
        toActualIndex: W,
        isOnCurrentPage: K,
        goToPage: V,
        nextPage: H,
        prevPage: D,
        handleSelectionChange: F,
        handlePageNavigation: E,
        scrollPosition: {
            current: B + 1,
            total: A,
            canScrollUp: Y > 0,
            canScrollDown: Y + Q < A
        }
    };
}
var KO, YZ7 = 5;
