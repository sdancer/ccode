// Module: kJ1
// Type: U
// Lines: 400232-400273
//
var kJ1 = U((PW5)=>{
    PW5.isValidName = jW5;
    PW5.isValidQName = TW5;
    var NW5 = /^[_:A-Za-z][-.:\w]+$/, LW5 = /^([_A-Za-z][-.\w]+|[_A-Za-z][-.\w]+:[_A-Za-z][-.\w]+)$/, kxA = "_A-Za-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�", fxA = "-._A-Za-z0-9·À-ÖØ-öø-˿̀-ͽͿ-῿‌‍‿⁀⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�", N9A = "[" + kxA + "][" + fxA + "]*", WF0 = kxA + ":", KF0 = fxA + ":", OW5 = new RegExp("^[" + WF0 + "][" + KF0 + "]*$"), MW5 = new RegExp("^(" + N9A + "|" + N9A + ":" + N9A + ")$"), eM2 = /[\uD800-\uDB7F\uDC00-\uDFFF]/, AR2 = /[\uD800-\uDB7F\uDC00-\uDFFF]/g, QR2 = /[\uD800-\uDB7F][\uDC00-\uDFFF]/g;
    kxA += "\uD800-\uDB7F\uDC00-\uDFFF";
    fxA += "\uD800-\uDB7F\uDC00-\uDFFF";
    N9A = "[" + kxA + "][" + fxA + "]*";
    WF0 = kxA + ":";
    KF0 = fxA + ":";
    var RW5 = new RegExp("^[" + WF0 + "][" + KF0 + "]*$"), _W5 = new RegExp("^(" + N9A + "|" + N9A + ":" + N9A + ")$");
    function jW5(A) {
        if (NW5.test(A)) return !0;
        if (OW5.test(A)) return !0;
        if (!eM2.test(A)) return !1;
        if (!RW5.test(A)) return !1;
        var Q = A.match(AR2), B = A.match(QR2);
        return B !== null && 2 * B.length === Q.length;
    }
    function TW5(A) {
        if (LW5.test(A)) return !0;
        if (MW5.test(A)) return !0;
        if (!eM2.test(A)) return !1;
        if (!_W5.test(A)) return !1;
        var Q = A.match(AR2), B = A.match(QR2);
        return B !== null && 2 * B.length === Q.length;
    }
});
