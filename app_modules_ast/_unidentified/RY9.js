// Module: RY9
// Type: U
// Lines: 500026-500070
//
var useActionState = U(($77)=>{
    var E77 = "\x1B[47m\x1B[30m", z77 = "\x1B[40m\x1B[37m", C77 = function(A, Q, B) {
        return {
            "00": "\x1B[0m " + A,
            "01": "\x1B[0m" + Q + "▄" + A,
            "02": "\x1B[0m" + B + "▄" + A,
            10: "\x1B[0m" + Q + "▀" + A,
            11: " ",
            12: "▄",
            20: "\x1B[0m" + B + "▀" + A,
            21: "▀",
            22: "█"
        };
    }, OY9 = function(A, Q, B, G) {
        let Z = Q + 1;
        if (B >= Z || G >= Z || G < -1 || B < -1) return "0";
        if (B >= Q || G >= Q || G < 0 || B < 0) return "1";
        let Y = G * Q + B;
        return A[Y] ? "2" : "1";
    }, MY9 = function(A, Q, B, G) {
        return OY9(A, Q, B, G) + OY9(A, Q, B, G + 1);
    };
    $77.render = function(A, Q, B) {
        let G = A.modules.size, Z = A.modules.data, Y = !!(Q && Q.inverse), J = Q && Q.inverse ? z77 : E77, W = C77(J, Y ? "\x1B[30m" : "\x1B[37m", Y ? "\x1B[37m" : "\x1B[30m"), K = `\x1B[0m
` + J, V = J;
        for(let H = -1; H < G + 1; H += 2){
            for(let D = -1; D < G; D++)V += W[MY9(Z, G, D, H)];
            V += W[MY9(Z, G, G, H)] + K;
        }
        if (((V += "\x1B[0m"), typeof B === "function")) B(null, V);
        return V;
    };
});
