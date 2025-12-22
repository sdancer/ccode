// Module: wZ
// Type: L
// Lines: 169101-169135
//
var wZ = L(()=>{
    getViewTransitionClassName();
    NsA();
});
function Dc1({ children: A, initialState: Q }) {
    let [B, G] = $i.useState(Q), [Z, Y] = $i.useState(null), J = OsA.useMemo(()=>({
            theme: B,
            setTheme: (X)=>{
                (b9("theme"), n0((I)=>({
                        ...I,
                        theme: X
                    })), G(X), Vc1(X), Y(null));
            },
            setPreviewTheme: (X)=>{
                (Y(X), Vc1(X));
            },
            savePreview: ()=>{
                if (Z !== null) (n0((X)=>({
                        ...X,
                        theme: Z
                    })), G(Z), Y(null));
            },
            currentTheme: Z ?? B
        }), [
        B,
        Z
    ]);
    return OsA.default.createElement(Hc1.Provider, {
        value: J
    }, A);
}
function D2() {
    let { currentTheme: A, setTheme: Q } = $i.useContext(Hc1);
    return [
        A,
        Q
    ];
}
function Fc1() {
    let { setPreviewTheme: A, savePreview: Q } = $i.useContext(Hc1);
    return {
        setPreviewTheme: A,
        savePreview: Q
    };
}
var OsA, $i, Hc1;
