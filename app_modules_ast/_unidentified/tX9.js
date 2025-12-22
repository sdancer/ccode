// Module: tX9
// Type: L
// Lines: 506434-506471
//
var tX9 = L(()=>{
    defaultOnDefaultTransitionIndicator();
    g_();
    defaultOnDefaultTransitionIndicator();
    U4();
    b6();
    o4A = l(React runtime(), 1);
});
function OD1({ initialModel: A, onComplete: Q, onCancel: B }) {
    let G = u_.useMemo(()=>xQB(), []), Z = u_.useMemo(()=>{
        if (A && G.some((Y)=>Y.value === A)) return A;
        return "sonnet";
    }, [
        A,
        G
    ]);
    return u_.createElement(T, {
        flexDirection: "column"
    }, u_.createElement(T, {
        marginBottom: 1
    }, u_.createElement(C, {
        dimColor: !0
    }, "Model determines the agent's reasoning capabilities and speed.")), u_.createElement(T0, {
        options: G,
        defaultValue: Z,
        onChange: (Y)=>{
            Q(Y);
        },
        onCancel: ()=>(B ? B() : Q(A))
    }));
}
var u_;
