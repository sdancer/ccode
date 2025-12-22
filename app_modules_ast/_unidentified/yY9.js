// Module: yY9
// Type: U
// Lines: 500155-500197
//
var yY9 = U((x77)=>{
    var bO0 = createRenderState();
    function S77(A, Q, B) {
        if ((A.clearRect(0, 0, Q.width, Q.height), !Q.style)) Q.style = {};
        ((Q.height = B), (Q.width = B), (Q.style.height = B + "px"), (Q.style.width = B + "px"));
    }
    function y77() {
        try {
            return document.createElement("canvas");
        } catch (A) {
            throw Error("You need to specify a canvas element");
        }
    }
    x77.render = function(Q, B, G) {
        let Z = G, Y = B;
        if (typeof Z > "u" && (!B || !B.getContext)) ((Z = B), (B = void 0));
        if (!B) Y = y77();
        Z = bO0.getOptions(Z);
        let J = bO0.getImageWidth(Q.modules.size, Z), X = Y.getContext("2d"), I = X.createImageData(J, J);
        return (bO0.qrToImageData(I.data, Q, Z), S77(X, Y, J), X.putImageData(I, 0, 0), Y);
    };
    x77.renderToDataURL = function(Q, B, G) {
        let Z = G;
        if (typeof Z > "u" && (!B || !B.getContext)) ((Z = B), (B = void 0));
        if (!Z) Z = {};
        let Y = x77.render(Q, B, Z), J = Z.type || "image/png", X = Z.rendererOpts || {};
        return Y.toDataURL(J, X.quality);
    };
});
