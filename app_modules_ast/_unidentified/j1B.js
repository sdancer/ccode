// Module: j1B
// Type: L
// Lines: 133902-133921
//
var j1B = L(()=>{
    ((OH8 = qH8 + NH8 + LH8), (RH8 = "[" + q1B + "]"), (gu1 = "[" + OH8 + "]"), (_H8 = "(?:" + gu1 + "|" + uu1 + ")"), (N1B = "[^" + q1B + "]"), (M1B = _H8 + "?"), (R1B = "[" + MH8 + "]?"), (TH8 = "(?:" + jH8 + "(?:" + [
        N1B,
        L1B,
        O1B
    ].join("|") + ")" + R1B + M1B + ")*"), (PH8 = R1B + M1B + TH8), (SH8 = "(?:" + [
        N1B + gu1 + "?",
        gu1,
        L1B,
        O1B,
        RH8
    ].join("|") + ")"), (yH8 = RegExp(uu1 + "(?=" + uu1 + ")|" + SH8 + PH8, "g")));
    _1B = xH8;
});
function vH8(A) {
    return joA(A) ? _1B(A) : U1B(A);
}
var T1B;
