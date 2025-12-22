// Module: bi2
// Type: L
// Lines: 448553-448592
//
var bi2 = L(()=>{
    i0();
    main();
    g1();
    X2();
    safeGet();
    D0B();
    lR();
    LI();
    s1();
    trackUsedThenable();
    y$ = l(React runtime(), 1);
});
function $DA() {
    let A = Pd.useContext(gU0);
    if (!A) throw Error("useMcpReconnect must be used within MCPConnectionManager");
    return A.reconnectMcpServer;
}
function Is() {
    let A = Pd.useContext(gU0);
    if (!A) throw Error("useMcpToggleEnabled must be used within MCPConnectionManager");
    return A.toggleMcpServer;
}
function _K1({ children: A, dynamicMcpConfig: Q, isStrictMcpConfig: B, mcpCliEndpoint: G }) {
    let { reconnectMcpServer: Z, toggleMcpServer: Y } = fi2(Q, B, G), J = Pd.useMemo(()=>({
            reconnectMcpServer: Z,
            toggleMcpServer: Y
        }), [
        Z,
        Y
    ]);
    return Pd.default.createElement(gU0.Provider, {
        value: J
    }, A);
}
var Pd, gU0;
