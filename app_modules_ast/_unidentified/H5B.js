// Module: H5B
// Type: U
// Lines: 175447-175607
//
var H5B = U((uXG, V5B)=>{
    var HNA = Zp1(), DNA = I5B(), W5B = Object.hasOwnProperty, K5B = Object.create(null);
    for(VNA in HNA)if (W5B.call(HNA, VNA)) K5B[HNA[VNA]] = VNA;
    var VNA, yN = (V5B.exports = {
        to: {},
        get: {}
    });
    yN.get = function(A) {
        var Q = A.substring(0, 3).toLowerCase(), B, G;
        switch(Q){
            case "hsl":
                ((B = yN.get.hsl(A)), (G = "hsl"));
                break;
            case "hwb":
                ((B = yN.get.hwb(A)), (G = "hwb"));
                break;
            default:
                ((B = yN.get.rgb(A)), (G = "rgb"));
                break;
        }
        if (!B) return null;
        return {
            model: G,
            value: B
        };
    };
    yN.get.rgb = function(A) {
        if (!A) return null;
        var Q = /^#([a-f0-9]{3,4})$/i, B = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i, G = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/, Z = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/, Y = /^(\w+)$/, J = [
            0,
            0,
            0,
            1
        ], X, I, W;
        if ((X = A.match(B))) {
            ((W = X[2]), (X = X[1]));
            for(I = 0; I < 3; I++){
                var K = I * 2;
                J[I] = parseInt(X.slice(K, K + 2), 16);
            }
            if (W) J[3] = parseInt(W, 16) / 255;
        } else if ((X = A.match(Q))) {
            ((X = X[1]), (W = X[3]));
            for(I = 0; I < 3; I++)J[I] = parseInt(X[I] + X[I], 16);
            if (W) J[3] = parseInt(W + W, 16) / 255;
        } else if ((X = A.match(G))) {
            for(I = 0; I < 3; I++)J[I] = parseInt(X[I + 1], 0);
            if (X[4]) if (X[5]) J[3] = parseFloat(X[4]) * 0.01;
            else J[3] = parseFloat(X[4]);
        } else if ((X = A.match(Z))) {
            for(I = 0; I < 3; I++)J[I] = Math.round(parseFloat(X[I + 1]) * 2.55);
            if (X[4]) if (X[5]) J[3] = parseFloat(X[4]) * 0.01;
            else J[3] = parseFloat(X[4]);
        } else if ((X = A.match(Y))) {
            if (X[1] === "transparent") return [
                0,
                0,
                0,
                0
            ];
            if (!W5B.call(HNA, X[1])) return null;
            return ((J = HNA[X[1]]), (J[3] = 1), J);
        } else return null;
        for(I = 0; I < 3; I++)J[I] = _i(J[I], 0, 255);
        return ((J[3] = _i(J[3], 0, 1)), J);
    };
    yN.get.hsl = function(A) {
        if (!A) return null;
        var Q = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/, B = A.match(Q);
        if (B) {
            var G = parseFloat(B[4]), Z = ((parseFloat(B[1]) % 360) + 360) % 360, Y = _i(parseFloat(B[2]), 0, 100), J = _i(parseFloat(B[3]), 0, 100), X = _i(isNaN(G) ? 1 : G, 0, 1);
            return [
                Z,
                Y,
                J,
                X
            ];
        }
        return null;
    };
    yN.get.hwb = function(A) {
        if (!A) return null;
        var Q = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/, B = A.match(Q);
        if (B) {
            var G = parseFloat(B[4]), Z = ((parseFloat(B[1]) % 360) + 360) % 360, Y = _i(parseFloat(B[2]), 0, 100), J = _i(parseFloat(B[3]), 0, 100), X = _i(isNaN(G) ? 1 : G, 0, 1);
            return [
                Z,
                Y,
                J,
                X
            ];
        }
        return null;
    };
    yN.to.hex = function() {
        var A = DNA(arguments);
        return ("#" + WtA(A[0]) + WtA(A[1]) + WtA(A[2]) + (A[3] < 1 ? WtA(Math.round(A[3] * 255)) : ""));
    };
    yN.to.rgb = function() {
        var A = DNA(arguments);
        return A.length < 4 || A[3] === 1 ? "rgb(" + Math.round(A[0]) + ", " + Math.round(A[1]) + ", " + Math.round(A[2]) + ")" : "rgba(" + Math.round(A[0]) + ", " + Math.round(A[1]) + ", " + Math.round(A[2]) + ", " + A[3] + ")";
    };
    yN.to.rgb.percent = function() {
        var A = DNA(arguments), Q = Math.round((A[0] / 255) * 100), B = Math.round((A[1] / 255) * 100), G = Math.round((A[2] / 255) * 100);
        return A.length < 4 || A[3] === 1 ? "rgb(" + Q + "%, " + B + "%, " + G + "%)" : "rgba(" + Q + "%, " + B + "%, " + G + "%, " + A[3] + ")";
    };
    yN.to.hsl = function() {
        var A = DNA(arguments);
        return A.length < 4 || A[3] === 1 ? "hsl(" + A[0] + ", " + A[1] + "%, " + A[2] + "%)" : "hsla(" + A[0] + ", " + A[1] + "%, " + A[2] + "%, " + A[3] + ")";
    };
    yN.to.hwb = function() {
        var A = DNA(arguments), Q = "";
        if (A.length >= 4 && A[3] !== 1) Q = ", " + A[3];
        return "hwb(" + A[0] + ", " + A[1] + "%, " + A[2] + "%" + Q + ")";
    };
    yN.to.keyword = function(A) {
        return K5B[A.slice(0, 3)];
    };
    function _i(A, Q, B) {
        return Math.min(Math.max(Q, A), B);
    }
    function WtA(A) {
        var Q = Math.round(A).toString(16).toUpperCase();
        return Q.length < 2 ? "0" + Q : Q;
    }
});
