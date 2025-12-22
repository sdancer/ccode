// Module: CO2
// Type: L
// Lines: 392028-392073
//
var pushViewTransitionAttributes = L(()=>{
    bA();
    startFakeNavigation();
    createRenderState();
    A4();
    pushStartInstance();
    aB();
    ((LxA = l(React runtime(), 1)), (SJ5 = {
        getConfig: (A)=>EJ1(A.file_path, A.old_string, A.new_string, A.replace_all),
        applyChanges: (A, Q)=>{
            let B = Q[0];
            if (B) return {
                ...A,
                old_string: B.old_string,
                new_string: B.new_string,
                replace_all: B.replace_all
            };
            return A;
        }
    }));
});
function Sr(A, { assistantMessage: { message: { id: Q } } }, B, G) {
    KX({
        completion_type: A,
        event: B,
        metadata: {
            language_name: "none",
            message_id: Q,
            platform: JQ.platform,
            hasFeedback: G ?? !1
        }
    });
}
