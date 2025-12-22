// Module: F19
// Type: L
// Lines: 470240-470326
//
var F19 = L(()=>{
    z4();
    pushStartInstance();
    cAA();
    getViewTransitionClassName();
    Q9();
    aQ();
    X2();
    KB();
    xq0();
    (($q = l(React runtime(), 1)), (hQ7 = {
        minTimeBeforeFeedbackMs: 600000,
        minTimeBetweenGlobalFeedbackMs: 1e8,
        minUserTurnsBeforeFeedback: 5,
        minUserTurnsBetweenFeedback: 10,
        hideThanksAfterMs: 3000,
        onForModels: [
            "*"
        ],
        probability: 0.005
    }));
});
function dQ7(A, Q) {
    let B = A.findIndex((G)=>G.uuid === Q);
    if (B === -1) return !1;
    for(let G = B + 1; G < A.length; G++){
        let Z = A[G];
        if (Z && (Z.type === "user" || Z.type === "assistant")) return !0;
    }
    return !1;
}
function E19(A, Q) {
    let [B, G] = BO.useState(null), Z = BO.useRef(new Set()), Y = BO.useRef(null), J = BO.useCallback(async (H)=>{
        let D = await rZ1();
        r("tengu_post_compact_survey_event", {
            event_type: "appeared",
            appearance_id: H,
            session_memory_compaction_enabled: D
        });
    }, []), X = BO.useCallback(async (H, D)=>{
        let F = await rZ1();
        r("tengu_post_compact_survey_event", {
            event_type: "responded",
            appearance_id: H,
            response: D,
            session_memory_compaction_enabled: F
        });
    }, []), { state: I, open: W, handleSelect: K } = dV1({
        hideThanksAfterMs: gQ7,
        onOpen: J,
        onSelect: X
    });
    BO.useEffect(()=>{
        pX(uQ7).then(G);
    }, []);
    let V = BO.useMemo(()=>new Set(A.filter((H)=>ru(H)).map((H)=>H.uuid)), [
        A
    ]);
    return (BO.useEffect(()=>{
        if (I !== "closed" || Q) return;
        if (B !== !0) return;
        if (wV()) return;
        if (V0(process.env.CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY)) return;
        if (Y.current !== null) {
            if (dQ7(A, Y.current)) {
                if (((Y.current = null), Math.random() < mQ7)) W();
                return;
            }
        }
        let H = Array.from(V).filter((D)=>!Z.current.has(D));
        if (H.length > 0) ((Z.current = new Set(V)), (Y.current = H[H.length - 1]));
    }, [
        V,
        I,
        Q,
        B,
        A,
        W
    ]), {
        state: I,
        handleSelect: K
    });
}
var BO, gQ7 = 3000, uQ7 = "tengu_post_compact_survey", mQ7 = 0.2;
