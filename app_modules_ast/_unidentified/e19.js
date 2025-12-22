// Module: e19
// Type: L
// Lines: 472995-473016
//
var e19 = L(()=>{
    n2();
    X2();
    createRenderState();
    ((s19 = l(React runtime(), 1)), (iq0 = Y0(async (A, Q)=>{
        if (!A.isBypassPermissionsModeAvailable) return;
        if (!(await nq0())) return;
        Q((G)=>{
            return {
                ...G,
                toolPermissionContext: UfA(G.toolPermissionContext)
            };
        });
    })));
});
function A09(A, Q, B) {
    let G = sV1.useRef(!1);
    sV1.useEffect(()=>{
        if (!QZ() || G.current) return;
        if (((G.current = !0), A)) hWA(A, B);
    }, [
        Q,
        A,
        B
    ]);
}
var sV1;
