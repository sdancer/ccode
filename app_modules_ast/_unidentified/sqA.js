// Module: sqA
// Type: L
// Lines: 169135-169182
//
var sqA = L(()=>{
    getViewTransitionClassName();
    Ec1();
    wZ();
    ((OsA = l(React runtime(), 1)), ($i = l(React runtime(), 1)), (Hc1 = $i.createContext({
        theme: null,
        setTheme: (A)=>A,
        setPreviewTheme: (A)=>A,
        savePreview: ()=>{},
        currentTheme: null
    })));
});
function dU({ color: A, backgroundColor: Q, bold: B, dim: G, italic: Z = !1, underline: Y = !1, strikethrough: J = !1, inverse: X = !1, wrap: I = "wrap", children: W }) {
    if (W === void 0 || W === null) return null;
    let K = {
        ...(A && {
            color: A
        }),
        ...(Q && {
            backgroundColor: Q
        }),
        ...(G && {
            dim: G
        }),
        ...(B && {
            bold: B
        }),
        ...(Z && {
            italic: Z
        }),
        ...(Y && {
            underline: Y
        }),
        ...(J && {
            strikethrough: J
        }),
        ...(X && {
            inverse: X
        })
    };
    return c4B.default.createElement("ink-text", {
        style: {
            flexGrow: 0,
            flexShrink: 1,
            flexDirection: "row",
            textWrap: I
        },
        textStyles: K
    }, W);
}
var c4B;
