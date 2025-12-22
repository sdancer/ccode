// Module: bGA
// Type: U
// Lines: 124935-125070
//
var bGA = U((fx, FbQ)=>{
    var { MAX_SAFE_COMPONENT_LENGTH: kh1, MAX_SAFE_BUILD_LENGTH: fA8, MAX_LENGTH: bA8 } = LwA(), hA8 = renderNode();
    fx = FbQ.exports = {};
    var gA8 = (fx.re = []), uA8 = (fx.safeRe = []), R2 = (fx.src = []), mA8 = (fx.safeSrc = []), _2 = (fx.t = {}), dA8 = 0, fh1 = "[a-zA-Z0-9-]", cA8 = [
        [
            "\\s",
            1
        ],
        [
            "\\d",
            bA8
        ],
        [
            fh1,
            fA8
        ]
    ], pA8 = (A)=>{
        for (let [Q, B] of cA8)A = A.split(`${Q}*`).join(`${Q}{0,${B}}`).split(`${Q}+`).join(`${Q}{1,${B}}`);
        return A;
    }, Z8 = (A, Q, B)=>{
        let G = pA8(Q), Z = dA8++;
        (hA8(A, Z, Q), (_2[A] = Z), (R2[Z] = Q), (mA8[Z] = G), (gA8[Z] = new RegExp(Q, B ? "g" : void 0)), (uA8[Z] = new RegExp(G, B ? "g" : void 0)));
    };
    Z8("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    Z8("NUMERICIDENTIFIERLOOSE", "\\d+");
    Z8("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${fh1}*`);
    Z8("MAINVERSION", `(${R2[_2.NUMERICIDENTIFIER]})\\.(${R2[_2.NUMERICIDENTIFIER]})\\.(${R2[_2.NUMERICIDENTIFIER]})`);
    Z8("MAINVERSIONLOOSE", `(${R2[_2.NUMERICIDENTIFIERLOOSE]})\\.(${R2[_2.NUMERICIDENTIFIERLOOSE]})\\.(${R2[_2.NUMERICIDENTIFIERLOOSE]})`);
    Z8("PRERELEASEIDENTIFIER", `(?:${R2[_2.NONNUMERICIDENTIFIER]}|${R2[_2.NUMERICIDENTIFIER]})`);
    Z8("PRERELEASEIDENTIFIERLOOSE", `(?:${R2[_2.NONNUMERICIDENTIFIER]}|${R2[_2.NUMERICIDENTIFIERLOOSE]})`);
    Z8("PRERELEASE", `(?:-(${R2[_2.PRERELEASEIDENTIFIER]}(?:\\.${R2[_2.PRERELEASEIDENTIFIER]})*))`);
    Z8("PRERELEASELOOSE", `(?:-?(${R2[_2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${R2[_2.PRERELEASEIDENTIFIERLOOSE]})*))`);
    Z8("BUILDIDENTIFIER", `${fh1}+`);
    Z8("BUILD", `(?:\\+(${R2[_2.BUILDIDENTIFIER]}(?:\\.${R2[_2.BUILDIDENTIFIER]})*))`);
    Z8("FULLPLAIN", `v?${R2[_2.MAINVERSION]}${R2[_2.PRERELEASE]}?${R2[_2.BUILD]}?`);
    Z8("FULL", `^${R2[_2.FULLPLAIN]}$`);
    Z8("LOOSEPLAIN", `[v=\\s]*${R2[_2.MAINVERSIONLOOSE]}${R2[_2.PRERELEASELOOSE]}?${R2[_2.BUILD]}?`);
    Z8("LOOSE", `^${R2[_2.LOOSEPLAIN]}$`);
    Z8("GTLT", "((?:<|>)?=?)");
    Z8("XRANGEIDENTIFIERLOOSE", `${R2[_2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    Z8("XRANGEIDENTIFIER", `${R2[_2.NUMERICIDENTIFIER]}|x|X|\\*`);
    Z8("XRANGEPLAIN", `[v=\\s]*(${R2[_2.XRANGEIDENTIFIER]})(?:\\.(${R2[_2.XRANGEIDENTIFIER]})(?:\\.(${R2[_2.XRANGEIDENTIFIER]})(?:${R2[_2.PRERELEASE]})?${R2[_2.BUILD]}?)?)?`);
    Z8("XRANGEPLAINLOOSE", `[v=\\s]*(${R2[_2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${R2[_2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${R2[_2.XRANGEIDENTIFIERLOOSE]})(?:${R2[_2.PRERELEASELOOSE]})?${R2[_2.BUILD]}?)?)?`);
    Z8("XRANGE", `^${R2[_2.GTLT]}\\s*${R2[_2.XRANGEPLAIN]}$`);
    Z8("XRANGELOOSE", `^${R2[_2.GTLT]}\\s*${R2[_2.XRANGEPLAINLOOSE]}$`);
    Z8("COERCEPLAIN", `(^|[^\\d])(\\d{1,${kh1}})(?:\\.(\\d{1,${kh1}}))?(?:\\.(\\d{1,${kh1}}))?`);
    Z8("COERCE", `${R2[_2.COERCEPLAIN]}(?:$|[^\\d])`);
    Z8("COERCEFULL", R2[_2.COERCEPLAIN] + `(?:${R2[_2.PRERELEASE]})?(?:${R2[_2.BUILD]})?(?:$|[^\\d])`);
    Z8("COERCERTL", R2[_2.COERCE], !0);
    Z8("COERCERTLFULL", R2[_2.COERCEFULL], !0);
    Z8("LONETILDE", "(?:~>?)");
    Z8("TILDETRIM", `(\\s*)${R2[_2.LONETILDE]}\\s+`, !0);
    fx.tildeTrimReplace = "$1~";
    Z8("TILDE", `^${R2[_2.LONETILDE]}${R2[_2.XRANGEPLAIN]}$`);
    Z8("TILDELOOSE", `^${R2[_2.LONETILDE]}${R2[_2.XRANGEPLAINLOOSE]}$`);
    Z8("LONECARET", "(?:\\^)");
    Z8("CARETTRIM", `(\\s*)${R2[_2.LONECARET]}\\s+`, !0);
    fx.caretTrimReplace = "$1^";
    Z8("CARET", `^${R2[_2.LONECARET]}${R2[_2.XRANGEPLAIN]}$`);
    Z8("CARETLOOSE", `^${R2[_2.LONECARET]}${R2[_2.XRANGEPLAINLOOSE]}$`);
    Z8("COMPARATORLOOSE", `^${R2[_2.GTLT]}\\s*(${R2[_2.LOOSEPLAIN]})$|^$`);
    Z8("COMPARATOR", `^${R2[_2.GTLT]}\\s*(${R2[_2.FULLPLAIN]})$|^$`);
    Z8("COMPARATORTRIM", `(\\s*)${R2[_2.GTLT]}\\s*(${R2[_2.LOOSEPLAIN]}|${R2[_2.XRANGEPLAIN]})`, !0);
    fx.comparatorTrimReplace = "$1$2$3";
    Z8("HYPHENRANGE", `^\\s*(${R2[_2.XRANGEPLAIN]})\\s+-\\s+(${R2[_2.XRANGEPLAIN]})\\s*$`);
    Z8("HYPHENRANGELOOSE", `^\\s*(${R2[_2.XRANGEPLAINLOOSE]})\\s+-\\s+(${R2[_2.XRANGEPLAINLOOSE]})\\s*$`);
    Z8("STAR", "(<|>)?=?\\s*\\*");
    Z8("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    Z8("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
});
