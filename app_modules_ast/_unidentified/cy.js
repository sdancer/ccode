// Module: cy
// Type: L
// Lines: 64108-64154
//
var cy = L(()=>{
    n2();
    BCA();
    BJ();
    A2();
    aQ();
    DK();
    z4();
    z4();
    N4Q = [
        vdA
    ];
    ((nN1 = Y0((A)=>{
        let Q = [], B = A.includes("haiku"), G = l4(), Z = j84();
        if (!B) Q.push(z4Q);
        if (VB()) Q.push(fp);
        if (A.includes("[1m]")) Q.push(vdA);
        else if (A.includes("claude-sonnet-4-5")) {
            if (aZ("sonnet_45_1m_header", "enabled", !1)) Q.push(vdA);
        }
        if (!V0(process.env.DISABLE_INTERLEAVED_THINKING) && R84(A)) Q.push(C4Q);
        let Y = Z && aZ("preserve_thinking", "enabled", !1);
        if ((V0(process.env.USE_API_CONTEXT_MANAGEMENT) && !1) || Y) Q.push(kdA);
        let J = U7("tengu_tool_pear");
        if (iN1(A) && J) Q.push($4Q);
        if (Z && aZ("tool_use_examples", "enabled", !1)) Q.push(fdA);
        if (G === "vertex" && _84(A)) Q.push(QCA);
        if (G === "foundry") Q.push(QCA);
        if (process.env.ANTHROPIC_BETAS && !B) Q.push(...process.env.ANTHROPIC_BETAS.split(",").map((X)=>X.trim()).filter(Boolean));
        return Q;
    })), (GN = Y0((A)=>{
        let Q = nN1(A);
        if (l4() === "bedrock") return Q.filter((B)=>!lN1.has(B));
        return Q;
    })), (aN1 = Y0((A)=>{
        return nN1(A).filter((B)=>lN1.has(B));
    })));
});
