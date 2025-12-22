// Module: XNA
// Type: U
// Lines: 173664-173799
//
var XNA = U((Bv, s8B)=>{
    var { MAX_SAFE_COMPONENT_LENGTH: ic1, MAX_SAFE_BUILD_LENGTH: Bw8, MAX_LENGTH: Gw8 } = tsA(), Zw8 = describeObjectForErrorMessage();
    Bv = s8B.exports = {};
    var Yw8 = (Bv.re = []), Jw8 = (Bv.safeRe = []), j2 = (Bv.src = []), Xw8 = (Bv.safeSrc = []), T2 = (Bv.t = {}), Iw8 = 0, nc1 = "[a-zA-Z0-9-]", Ww8 = [
        [
            "\\s",
            1
        ],
        [
            "\\d",
            Gw8
        ],
        [
            nc1,
            Bw8
        ]
    ], Kw8 = (A)=>{
        for (let [Q, B] of Ww8)A = A.split(`${Q}*`).join(`${Q}{0,${B}}`).split(`${Q}+`).join(`${Q}{1,${B}}`);
        return A;
    }, Y8 = (A, Q, B)=>{
        let G = Kw8(Q), Z = Iw8++;
        (Zw8(A, Z, Q), (T2[A] = Z), (j2[Z] = Q), (Xw8[Z] = G), (Yw8[Z] = new RegExp(Q, B ? "g" : void 0)), (Jw8[Z] = new RegExp(G, B ? "g" : void 0)));
    };
    Y8("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    Y8("NUMERICIDENTIFIERLOOSE", "\\d+");
    Y8("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${nc1}*`);
    Y8("MAINVERSION", `(${j2[T2.NUMERICIDENTIFIER]})\\.(${j2[T2.NUMERICIDENTIFIER]})\\.(${j2[T2.NUMERICIDENTIFIER]})`);
    Y8("MAINVERSIONLOOSE", `(${j2[T2.NUMERICIDENTIFIERLOOSE]})\\.(${j2[T2.NUMERICIDENTIFIERLOOSE]})\\.(${j2[T2.NUMERICIDENTIFIERLOOSE]})`);
    Y8("PRERELEASEIDENTIFIER", `(?:${j2[T2.NUMERICIDENTIFIER]}|${j2[T2.NONNUMERICIDENTIFIER]})`);
    Y8("PRERELEASEIDENTIFIERLOOSE", `(?:${j2[T2.NUMERICIDENTIFIERLOOSE]}|${j2[T2.NONNUMERICIDENTIFIER]})`);
    Y8("PRERELEASE", `(?:-(${j2[T2.PRERELEASEIDENTIFIER]}(?:\\.${j2[T2.PRERELEASEIDENTIFIER]})*))`);
    Y8("PRERELEASELOOSE", `(?:-?(${j2[T2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${j2[T2.PRERELEASEIDENTIFIERLOOSE]})*))`);
    Y8("BUILDIDENTIFIER", `${nc1}+`);
    Y8("BUILD", `(?:\\+(${j2[T2.BUILDIDENTIFIER]}(?:\\.${j2[T2.BUILDIDENTIFIER]})*))`);
    Y8("FULLPLAIN", `v?${j2[T2.MAINVERSION]}${j2[T2.PRERELEASE]}?${j2[T2.BUILD]}?`);
    Y8("FULL", `^${j2[T2.FULLPLAIN]}$`);
    Y8("LOOSEPLAIN", `[v=\\s]*${j2[T2.MAINVERSIONLOOSE]}${j2[T2.PRERELEASELOOSE]}?${j2[T2.BUILD]}?`);
    Y8("LOOSE", `^${j2[T2.LOOSEPLAIN]}$`);
    Y8("GTLT", "((?:<|>)?=?)");
    Y8("XRANGEIDENTIFIERLOOSE", `${j2[T2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    Y8("XRANGEIDENTIFIER", `${j2[T2.NUMERICIDENTIFIER]}|x|X|\\*`);
    Y8("XRANGEPLAIN", `[v=\\s]*(${j2[T2.XRANGEIDENTIFIER]})(?:\\.(${j2[T2.XRANGEIDENTIFIER]})(?:\\.(${j2[T2.XRANGEIDENTIFIER]})(?:${j2[T2.PRERELEASE]})?${j2[T2.BUILD]}?)?)?`);
    Y8("XRANGEPLAINLOOSE", `[v=\\s]*(${j2[T2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${j2[T2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${j2[T2.XRANGEIDENTIFIERLOOSE]})(?:${j2[T2.PRERELEASELOOSE]})?${j2[T2.BUILD]}?)?)?`);
    Y8("XRANGE", `^${j2[T2.GTLT]}\\s*${j2[T2.XRANGEPLAIN]}$`);
    Y8("XRANGELOOSE", `^${j2[T2.GTLT]}\\s*${j2[T2.XRANGEPLAINLOOSE]}$`);
    Y8("COERCEPLAIN", `(^|[^\\d])(\\d{1,${ic1}})(?:\\.(\\d{1,${ic1}}))?(?:\\.(\\d{1,${ic1}}))?`);
    Y8("COERCE", `${j2[T2.COERCEPLAIN]}(?:$|[^\\d])`);
    Y8("COERCEFULL", j2[T2.COERCEPLAIN] + `(?:${j2[T2.PRERELEASE]})?(?:${j2[T2.BUILD]})?(?:$|[^\\d])`);
    Y8("COERCERTL", j2[T2.COERCE], !0);
    Y8("COERCERTLFULL", j2[T2.COERCEFULL], !0);
    Y8("LONETILDE", "(?:~>?)");
    Y8("TILDETRIM", `(\\s*)${j2[T2.LONETILDE]}\\s+`, !0);
    Bv.tildeTrimReplace = "$1~";
    Y8("TILDE", `^${j2[T2.LONETILDE]}${j2[T2.XRANGEPLAIN]}$`);
    Y8("TILDELOOSE", `^${j2[T2.LONETILDE]}${j2[T2.XRANGEPLAINLOOSE]}$`);
    Y8("LONECARET", "(?:\\^)");
    Y8("CARETTRIM", `(\\s*)${j2[T2.LONECARET]}\\s+`, !0);
    Bv.caretTrimReplace = "$1^";
    Y8("CARET", `^${j2[T2.LONECARET]}${j2[T2.XRANGEPLAIN]}$`);
    Y8("CARETLOOSE", `^${j2[T2.LONECARET]}${j2[T2.XRANGEPLAINLOOSE]}$`);
    Y8("COMPARATORLOOSE", `^${j2[T2.GTLT]}\\s*(${j2[T2.LOOSEPLAIN]})$|^$`);
    Y8("COMPARATOR", `^${j2[T2.GTLT]}\\s*(${j2[T2.FULLPLAIN]})$|^$`);
    Y8("COMPARATORTRIM", `(\\s*)${j2[T2.GTLT]}\\s*(${j2[T2.LOOSEPLAIN]}|${j2[T2.XRANGEPLAIN]})`, !0);
    Bv.comparatorTrimReplace = "$1$2$3";
    Y8("HYPHENRANGE", `^\\s*(${j2[T2.XRANGEPLAIN]})\\s+-\\s+(${j2[T2.XRANGEPLAIN]})\\s*$`);
    Y8("HYPHENRANGELOOSE", `^\\s*(${j2[T2.XRANGEPLAINLOOSE]})\\s+-\\s+(${j2[T2.XRANGEPLAINLOOSE]})\\s*$`);
    Y8("STAR", "(<|>)?=?\\s*\\*");
    Y8("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    Y8("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
});
