// Module: J7B
// Type: L
// Lines: 179362-179390
//
var J7B = L(()=>{
    bA();
    ((Pi = l(React runtime(), 1)), (dL8 = Pi.createContext({
        marker: ""
    })));
});
function I7B({ children: A }) {
    let { marker: Q } = lU.useContext(X7B), B = 0;
    for (let Z of lU.default.Children.toArray(A)){
        if (!lU.isValidElement(Z) || Z.type !== NtA) continue;
        B++;
    }
    let G = String(B).length;
    return lU.default.createElement(T, {
        flexDirection: "column"
    }, lU.default.Children.map(A, (Z, Y)=>{
        if (!lU.isValidElement(Z) || Z.type !== NtA) return Z;
        let J = `${String(Y + 1).padStart(G)}.`, X = `${Q}${J}`;
        return lU.default.createElement(X7B.Provider, {
            value: {
                marker: X
            }
        }, lU.default.createElement(cL8.Provider, {
            value: {
                marker: X
            }
        }, Z));
    }));
}
var lU, X7B, cL8, UNA;
