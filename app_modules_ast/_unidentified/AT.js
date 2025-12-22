// Module: AT
// Type: U
// Lines: 126310-126409
//
var AT = U((rt7, AgQ)=>{
    var ah1 = bGA(), thQ = LwA(), m08 = createRenderState(), ehQ = bh1(), d08 = dAA(), c08 = ObQ(), p08 = RbQ(), l08 = createRenderState(), i08 = ybQ(), n08 = vbQ(), a08 = fbQ(), o08 = hbQ(), r08 = ubQ(), s08 = jM(), t08 = pbQ(), e08 = ibQ(), AQ8 = baA(), QQ8 = rbQ(), BQ8 = tbQ(), GQ8 = MwA(), ZQ8 = haA(), YQ8 = hh1(), JQ8 = gh1(), XQ8 = gaA(), IQ8 = uaA(), WQ8 = describeObjectForErrorMessage(), KQ8 = createRenderState(), VQ8 = _wA(), HQ8 = createRenderState(), DQ8 = TwA(), FQ8 = LhQ(), EQ8 = MhQ(), zQ8 = _hQ(), CQ8 = PhQ(), $Q8 = yhQ(), UQ8 = paA(), wQ8 = hhQ(), qQ8 = uhQ(), NQ8 = chQ(), LQ8 = createRenderState(), OQ8 = shQ();
    AgQ.exports = {
        parse: d08,
        valid: c08,
        clean: p08,
        inc: l08,
        diff: i08,
        major: n08,
        minor: a08,
        patch: o08,
        prerelease: r08,
        compare: s08,
        rcompare: t08,
        compareLoose: e08,
        compareBuild: AQ8,
        sort: QQ8,
        rsort: BQ8,
        gt: GQ8,
        lt: ZQ8,
        eq: YQ8,
        neq: JQ8,
        gte: XQ8,
        lte: IQ8,
        cmp: WQ8,
        coerce: KQ8,
        Comparator: VQ8,
        Range: HQ8,
        satisfies: DQ8,
        toComparators: FQ8,
        maxSatisfying: EQ8,
        minSatisfying: zQ8,
        minVersion: CQ8,
        validRange: $Q8,
        outside: UQ8,
        gtr: wQ8,
        ltr: qQ8,
        intersects: NQ8,
        simplifyRange: LQ8,
        subset: OQ8,
        SemVer: m08,
        re: ah1.re,
        src: ah1.src,
        tokens: ah1.t,
        SEMVER_SPEC_VERSION: thQ.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: thQ.RELEASE_TYPES,
        compareIdentifiers: ehQ.compareIdentifiers,
        rcompareIdentifiers: ehQ.rcompareIdentifiers
    };
});
function wV() {
    return (V0(process.env.CLAUDE_CODE_USE_BEDROCK) || V0(process.env.CLAUDE_CODE_USE_VERTEX) || V0(process.env.CLAUDE_CODE_USE_FOUNDRY) || !!process.env.DISABLE_TELEMETRY || !!process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC);
}
