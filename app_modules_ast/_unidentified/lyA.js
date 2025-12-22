// Module: lyA
// Type: L
// Lines: 386000-386028
//
var lyA = L(()=>{
    s1();
    pushStartInstance();
    i0();
    ((fY1 = process.env.CLAUDE_CODE_PROFILE_STARTUP === "1"), (_N2 = Math.random() < gZ5), (RH0 = fY1 || _N2));
});
function hY1(A) {
    jN2.push(A);
}
async function TN2(A, Q, B, G, Z, Y) {
    let J = {
        messages: A,
        systemPrompt: Q,
        userContext: B,
        systemContext: G,
        toolUseContext: Z,
        querySource: Y
    };
    for (let X of jN2)try {
        await X(J);
    } catch (I) {
        t(I instanceof Error ? I : Error(`Post-sampling hook failed: ${I}`));
    }
}
var jN2;
