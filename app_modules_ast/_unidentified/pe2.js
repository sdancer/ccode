// Module: pe2
// Type: L
// Lines: 465747-465786
//
var pe2 = L(()=>{
    bA();
    $2();
    XfA = l(React runtime(), 1);
});
function le2() {
    let [{ teamContext: A }] = IQ(), [Q, B] = wV1.useState(null);
    if ((wV1.useEffect(()=>{
        BHA().then(B);
    }, []), dF())) {
        let G = W_(), Z = process.env.CLAUDE_CODE_TEAM_NAME, Y = Br();
        if (G && Z) {
            let J = Y ? E$[Y] : "cyan_FOR_SUBAGENTS_ONLY";
            return {
                text: `${G}@${Z}`,
                bgColor: J
            };
        }
    } else if ((A?.teammates ? Object.keys(A.teammates).length : 0) > 0 && A?.teamName) {
        if (Q === !1) return {
            text: `View teammates: \`tmux -L ${ZL2()} a\``,
            bgColor: "cyan_FOR_SUBAGENTS_ONLY"
        };
        else if (Q === !0) return {
            text: `${rY1}@${A.teamName}`,
            bgColor: "cyan_FOR_SUBAGENTS_ONLY"
        };
    }
    return null;
}
var wV1;
