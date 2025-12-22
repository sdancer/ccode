// Module: FXA
// Type: U
// Lines: 235036-235171
//
var FXA = U((vv, dMB)=>{
    var { MAX_SAFE_COMPONENT_LENGTH: we1, MAX_SAFE_BUILD_LENGTH: Pt8, MAX_LENGTH: St8 } = iMA(), yt8 = renderChildrenArray();
    vv = dMB.exports = {};
    var xt8 = (vv.re = []), vt8 = (vv.safeRe = []), P2 = (vv.src = []), kt8 = (vv.safeSrc = []), S2 = (vv.t = {}), ft8 = 0, qe1 = "[a-zA-Z0-9-]", bt8 = [
        [
            "\\s",
            1
        ],
        [
            "\\d",
            St8
        ],
        [
            qe1,
            Pt8
        ]
    ], ht8 = (A)=>{
        for (let [Q, B] of bt8)A = A.split(`${Q}*`).join(`${Q}{0,${B}}`).split(`${Q}+`).join(`${Q}{1,${B}}`);
        return A;
    }, I8 = (A, Q, B)=>{
        let G = ht8(Q), Z = ft8++;
        (yt8(A, Z, Q), (S2[A] = Z), (P2[Z] = Q), (kt8[Z] = G), (xt8[Z] = new RegExp(Q, B ? "g" : void 0)), (vt8[Z] = new RegExp(G, B ? "g" : void 0)));
    };
    I8("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    I8("NUMERICIDENTIFIERLOOSE", "\\d+");
    I8("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${qe1}*`);
    I8("MAINVERSION", `(${P2[S2.NUMERICIDENTIFIER]})\\.(${P2[S2.NUMERICIDENTIFIER]})\\.(${P2[S2.NUMERICIDENTIFIER]})`);
    I8("MAINVERSIONLOOSE", `(${P2[S2.NUMERICIDENTIFIERLOOSE]})\\.(${P2[S2.NUMERICIDENTIFIERLOOSE]})\\.(${P2[S2.NUMERICIDENTIFIERLOOSE]})`);
    I8("PRERELEASEIDENTIFIER", `(?:${P2[S2.NUMERICIDENTIFIER]}|${P2[S2.NONNUMERICIDENTIFIER]})`);
    I8("PRERELEASEIDENTIFIERLOOSE", `(?:${P2[S2.NUMERICIDENTIFIERLOOSE]}|${P2[S2.NONNUMERICIDENTIFIER]})`);
    I8("PRERELEASE", `(?:-(${P2[S2.PRERELEASEIDENTIFIER]}(?:\\.${P2[S2.PRERELEASEIDENTIFIER]})*))`);
    I8("PRERELEASELOOSE", `(?:-?(${P2[S2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${P2[S2.PRERELEASEIDENTIFIERLOOSE]})*))`);
    I8("BUILDIDENTIFIER", `${qe1}+`);
    I8("BUILD", `(?:\\+(${P2[S2.BUILDIDENTIFIER]}(?:\\.${P2[S2.BUILDIDENTIFIER]})*))`);
    I8("FULLPLAIN", `v?${P2[S2.MAINVERSION]}${P2[S2.PRERELEASE]}?${P2[S2.BUILD]}?`);
    I8("FULL", `^${P2[S2.FULLPLAIN]}$`);
    I8("LOOSEPLAIN", `[v=\\s]*${P2[S2.MAINVERSIONLOOSE]}${P2[S2.PRERELEASELOOSE]}?${P2[S2.BUILD]}?`);
    I8("LOOSE", `^${P2[S2.LOOSEPLAIN]}$`);
    I8("GTLT", "((?:<|>)?=?)");
    I8("XRANGEIDENTIFIERLOOSE", `${P2[S2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    I8("XRANGEIDENTIFIER", `${P2[S2.NUMERICIDENTIFIER]}|x|X|\\*`);
    I8("XRANGEPLAIN", `[v=\\s]*(${P2[S2.XRANGEIDENTIFIER]})(?:\\.(${P2[S2.XRANGEIDENTIFIER]})(?:\\.(${P2[S2.XRANGEIDENTIFIER]})(?:${P2[S2.PRERELEASE]})?${P2[S2.BUILD]}?)?)?`);
    I8("XRANGEPLAINLOOSE", `[v=\\s]*(${P2[S2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${P2[S2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${P2[S2.XRANGEIDENTIFIERLOOSE]})(?:${P2[S2.PRERELEASELOOSE]})?${P2[S2.BUILD]}?)?)?`);
    I8("XRANGE", `^${P2[S2.GTLT]}\\s*${P2[S2.XRANGEPLAIN]}$`);
    I8("XRANGELOOSE", `^${P2[S2.GTLT]}\\s*${P2[S2.XRANGEPLAINLOOSE]}$`);
    I8("COERCEPLAIN", `(^|[^\\d])(\\d{1,${we1}})(?:\\.(\\d{1,${we1}}))?(?:\\.(\\d{1,${we1}}))?`);
    I8("COERCE", `${P2[S2.COERCEPLAIN]}(?:$|[^\\d])`);
    I8("COERCEFULL", P2[S2.COERCEPLAIN] + `(?:${P2[S2.PRERELEASE]})?(?:${P2[S2.BUILD]})?(?:$|[^\\d])`);
    I8("COERCERTL", P2[S2.COERCE], !0);
    I8("COERCERTLFULL", P2[S2.COERCEFULL], !0);
    I8("LONETILDE", "(?:~>?)");
    I8("TILDETRIM", `(\\s*)${P2[S2.LONETILDE]}\\s+`, !0);
    vv.tildeTrimReplace = "$1~";
    I8("TILDE", `^${P2[S2.LONETILDE]}${P2[S2.XRANGEPLAIN]}$`);
    I8("TILDELOOSE", `^${P2[S2.LONETILDE]}${P2[S2.XRANGEPLAINLOOSE]}$`);
    I8("LONECARET", "(?:\\^)");
    I8("CARETTRIM", `(\\s*)${P2[S2.LONECARET]}\\s+`, !0);
    vv.caretTrimReplace = "$1^";
    I8("CARET", `^${P2[S2.LONECARET]}${P2[S2.XRANGEPLAIN]}$`);
    I8("CARETLOOSE", `^${P2[S2.LONECARET]}${P2[S2.XRANGEPLAINLOOSE]}$`);
    I8("COMPARATORLOOSE", `^${P2[S2.GTLT]}\\s*(${P2[S2.LOOSEPLAIN]})$|^$`);
    I8("COMPARATOR", `^${P2[S2.GTLT]}\\s*(${P2[S2.FULLPLAIN]})$|^$`);
    I8("COMPARATORTRIM", `(\\s*)${P2[S2.GTLT]}\\s*(${P2[S2.LOOSEPLAIN]}|${P2[S2.XRANGEPLAIN]})`, !0);
    vv.comparatorTrimReplace = "$1$2$3";
    I8("HYPHENRANGE", `^\\s*(${P2[S2.XRANGEPLAIN]})\\s+-\\s+(${P2[S2.XRANGEPLAIN]})\\s*$`);
    I8("HYPHENRANGELOOSE", `^\\s*(${P2[S2.XRANGEPLAINLOOSE]})\\s+-\\s+(${P2[S2.XRANGEPLAINLOOSE]})\\s*$`);
    I8("STAR", "(<|>)?=?\\s*\\*");
    I8("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    I8("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
});
