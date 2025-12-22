// Module: D4B
// Type: L
// Lines: 167799-167898
//
var D4B = L(()=>{
    sd1();
    PrA();
    hZA();
    LZA();
    trackPostpone();
    Vi();
    V4B = Object.freeze({
        type: "char",
        value: " ",
        fullWidth: !1,
        styles: []
    });
    H4B = new Intl.Segmenter();
});
function Bc1(A, Q) {
    let B;
    return (G)=>{
        let { terminalWidth: Z, terminalRows: Y, isTTY: J, ink2: X, prevScreen: I } = G, W = A.yogaNode?.getComputedHeight(), K = A.yogaNode?.getComputedWidth(), V = W === void 0 || !Number.isFinite(W) || W < 0, H = K === void 0 || !Number.isFinite(K) || K < 0;
        if (!A.yogaNode || V || H) {
            if (A.yogaNode && (V || H)) k(`Invalid yoga dimensions: width=${K}, height=${W}, childNodes=${A.childNodes.length}, terminalWidth=${Z}, terminalRows=${Y}`);
            return {
                output: "",
                outputHeight: 0,
                staticOutput: "",
                rows: Y,
                columns: Z,
                cursorVisible: !0,
                screen: gZA(Z, 0, Q),
                viewport: {
                    width: Z,
                    height: 0
                },
                cursor: {
                    x: 0,
                    y: 0,
                    visible: !0
                }
            };
        }
        let D = new aqA({
            width: Math.floor(A.yogaNode.getComputedWidth()),
            height: Math.floor(A.yogaNode.getComputedHeight()),
            ink2: X,
            stylePool: Q
        }), F = A.dirty;
        pd1(A, D, {
            skipStaticElements: !0,
            prevScreen: I,
            ink2: X
        });
        let E, z = A.staticNode, $ = z?.yogaNode?.getComputedHeight(), O = z?.yogaNode?.getComputedWidth(), N = $ !== void 0 && Number.isFinite($) && $ >= 0 && O !== void 0 && Number.isFinite(O) && O >= 0;
        if (!X && z && z.yogaNode && N) ((E = new aqA({
            width: Math.floor(O),
            height: Math.floor($),
            ink2: !1,
            stylePool: Q
        })), pd1(z, E, {
            skipStaticElements: !1,
            prevScreen: void 0,
            ink2: !1
        }));
        let { output: M, height: R, screen: j } = D.get();
        if (F) B = F4B(A);
        return {
            output: M,
            outputHeight: R,
            staticOutput: E ? `${E.get().output}
` : "",
            rows: Y,
            columns: Z,
            cursorVisible: !J || M === "",
            screen: j,
            viewport: {
                width: Z,
                height: Y
            },
            cursor: {
                x: 0,
                y: j.height,
                visible: !0
            },
            progress: B
        };
    };
}
function F4B(A) {
    if (A.nodeName === "ink-progress") {
        let Q = A.attributes.state;
        if (Q) return {
            state: Q,
            percentage: A.attributes.percentage
        };
    }
    for (let Q of A.childNodes)if ("nodeName" in Q && Q.nodeName !== "#text") {
        let B = F4B(Q);
        if (B) return B;
    }
    return;
}
