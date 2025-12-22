// Module: xGA
// Type: L
// Lines: 124011-124148
//
var xGA = L(()=>{
    DK();
    ((VwA = {
        firstParty: "claude-3-7-sonnet-20250219",
        bedrock: "us.anthropic.claude-3-7-sonnet-20250219-v1:0",
        vertex: "claude-3-7-sonnet@20250219",
        foundry: "claude-3-7-sonnet"
    }), (HwA = {
        firstParty: "claude-3-5-sonnet-20241022",
        bedrock: "anthropic.claude-3-5-sonnet-20241022-v2:0",
        vertex: "claude-3-5-sonnet-v2@20241022",
        foundry: "claude-3-5-sonnet"
    }), (DwA = {
        firstParty: "claude-3-5-haiku-20241022",
        bedrock: "us.anthropic.claude-3-5-haiku-20241022-v1:0",
        vertex: "claude-3-5-haiku@20241022",
        foundry: "claude-3-5-haiku"
    }), (FwA = {
        firstParty: "claude-haiku-4-5-20251001",
        bedrock: "us.anthropic.claude-haiku-4-5-20251001-v1:0",
        vertex: "claude-haiku-4-5@20251001",
        foundry: "claude-haiku-4-5"
    }), (gAA = {
        firstParty: "claude-sonnet-4-20250514",
        bedrock: "us.anthropic.claude-sonnet-4-20250514-v1:0",
        vertex: "claude-sonnet-4@20250514",
        foundry: "claude-sonnet-4"
    }), (Ph1 = {
        firstParty: "claude-sonnet-4-5-20250929",
        bedrock: "us.anthropic.claude-sonnet-4-5-20250929-v1:0",
        vertex: "claude-sonnet-4-5@20250929",
        foundry: "claude-sonnet-4-5"
    }), (EwA = {
        firstParty: "claude-opus-4-20250514",
        bedrock: "us.anthropic.claude-opus-4-20250514-v1:0",
        vertex: "claude-opus-4@20250514",
        foundry: "claude-opus-4"
    }), (zwA = {
        firstParty: "claude-opus-4-1-20250805",
        bedrock: "us.anthropic.claude-opus-4-1-20250805-v1:0",
        vertex: "claude-opus-4-1@20250805",
        foundry: "claude-opus-4-1"
    }), (uAA = {
        firstParty: "claude-opus-4-5-20251101",
        bedrock: "us.anthropic.claude-opus-4-5-20251101-v1:0",
        vertex: "claude-opus-4-5@20251101",
        foundry: "claude-opus-4-5"
    }));
});
function nl(A) {
    let Q = [], B = !1;
    async function G() {
        if (B) return;
        if (Q.length === 0) return;
        B = !0;
        while(Q.length > 0){
            let { args: Z, resolve: Y, reject: J, context: X } = Q.shift();
            try {
                let I = await A.apply(X, Z);
                Y(I);
            } catch (I) {
                J(I);
            }
        }
        if (((B = !1), Q.length > 0)) G();
    }
    return function(...Z) {
        return new Promise((Y, J)=>{
            (Q.push({
                args: Z,
                resolve: Y,
                reject: J,
                context: this
            }), G());
        });
    };
}
function _aA(A) {
    return {
        haiku35: DwA[A],
        haiku45: FwA[A],
        sonnet35: HwA[A],
        sonnet37: VwA[A],
        sonnet40: gAA[A],
        sonnet45: Ph1[A],
        opus40: EwA[A],
        opus41: zwA[A],
        opus45: uAA[A]
    };
}
async function UA8() {
    let A;
    try {
        A = await lfQ();
    } catch (K) {
        return (t(K), _aA("bedrock"));
    }
    if (!A?.length) return _aA("bedrock");
    let Q = vx(A, "claude-3-5-haiku-20241022"), B = vx(A, "claude-haiku-4-5-20251001"), G = vx(A, "claude-3-5-sonnet-20241022"), Z = vx(A, "claude-3-7-sonnet-20250219"), Y = vx(A, "claude-sonnet-4-20250514"), J = vx(A, "claude-sonnet-4-5-20250929"), X = vx(A, "claude-opus-4-20250514"), I = vx(A, "claude-opus-4-1-20250805"), W = vx(A, "claude-opus-4-5-20251101");
    return {
        haiku35: Q || DwA.bedrock,
        haiku45: B || FwA.bedrock,
        sonnet35: G || HwA.bedrock,
        sonnet37: Z || VwA.bedrock,
        sonnet40: Y || gAA.bedrock,
        sonnet45: J || Ph1.bedrock,
        opus40: X || EwA.bedrock,
        opus41: I || zwA.bedrock,
        opus45: W || uAA.bedrock
    };
}
function qA8() {
    if (ZgA() !== null) return;
    if (l4() !== "bedrock") {
        OE1(_aA(l4()));
        return;
    }
    wA8();
}
function aJ() {
    let A = ZgA();
    if (A === null) return (qA8(), _aA(l4()));
    return A;
}
var wA8;
