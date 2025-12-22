// Module: XZ9
// Type: U
// Lines: 497591-497662
//
var XZ9 = U((A37)=>{
    var WD1 = Rs(), r87 = sL0(), GZ9 = parseURL(), Ts = js(), XO0 = AO0(), ZZ9 = WD1.getBCHDigit(7973);
    function s87(A, Q, B) {
        for(let G = 1; G <= 40; G++)if (Q <= A37.getCapacity(G, B, A)) return G;
        return;
    }
    function YZ9(A, Q) {
        return Ts.getCharCountIndicator(A, Q) + 4;
    }
    function t87(A, Q) {
        let B = 0;
        return (A.forEach(function(G) {
            let Z = YZ9(G.mode, Q);
            B += Z + G.getBitsLength();
        }), B);
    }
    function e87(A, Q) {
        for(let B = 1; B <= 40; B++)if (t87(A, B) <= A37.getCapacity(B, Q, Ts.MIXED)) return B;
        return;
    }
    A37.from = function(Q, B) {
        if (XO0.isValid(Q)) return parseInt(Q, 10);
        return B;
    };
    A37.getCapacity = function(Q, B, G) {
        if (!XO0.isValid(Q)) throw Error("Invalid QR Code version");
        if (typeof G > "u") G = Ts.BYTE;
        let Z = WD1.getSymbolTotalCodewords(Q), Y = r87.getTotalCodewordsCount(Q, B), J = (Z - Y) * 8;
        if (G === Ts.MIXED) return J;
        let X = J - YZ9(G, Q);
        switch(G){
            case Ts.NUMERIC:
                return Math.floor((X / 10) * 3);
            case Ts.ALPHANUMERIC:
                return Math.floor((X / 11) * 2);
            case Ts.KANJI:
                return Math.floor(X / 13);
            case Ts.BYTE:
            default:
                return Math.floor(X / 8);
        }
    };
    A37.getBestVersionForData = function(Q, B) {
        let G, Z = GZ9.from(B, GZ9.M);
        if (Array.isArray(Q)) {
            if (Q.length > 1) return e87(Q, Z);
            if (Q.length === 0) return 1;
            G = Q[0];
        } else G = Q;
        return s87(G.mode, G.getLength(), Z);
    };
    A37.getEncodedBits = function(Q) {
        if (!XO0.isValid(Q) || Q < 7) throw Error("Invalid QR Code version");
        let B = Q << 12;
        while(WD1.getBCHDigit(B) - ZZ9 >= 0)B ^= 7973 << (WD1.getBCHDigit(B) - ZZ9);
        return (Q << 12) | B;
    };
});
