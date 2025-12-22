// Module: xw0
// Type: L
// Lines: 454651-454680
//
var main = L(()=>{
    bA();
    KB();
    vd = l(React runtime(), 1);
});
function tr2({ addMargin: A, param: { text: Q } }) {
    let B = Z9(Q, "command-message"), G = Z9(Q, "command-args");
    if (!B) return null;
    k(`UserCommandMessage rendering: "${B}" (args: "${G || "none"}")`);
    let Z = B.startsWith("The "), Y = Z ? "" : "/";
    return (k(`  isSkillFormat: ${Z}, prefix: "${Y}"`), hkA.createElement(T, {
        flexDirection: "column",
        marginTop: A ? 1 : 0,
        width: "100%"
    }, hkA.createElement(C, {
        backgroundColor: "userMessageBackground",
        color: "text"
    }, "> ", Y, [
        B,
        G
    ].filter(Boolean).join(" "), " ")));
}
var hkA;
