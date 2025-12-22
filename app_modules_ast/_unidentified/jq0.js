// Module: jq0
// Type: L
// Lines: 468730-468764
//
var jq0 = L(()=>{
    X2();
    hK();
    pushViewTransitionAttributes();
    prepareToHydrateHostInstance();
    PTA();
    s1();
    g1();
    fV1 = l(React runtime(), 1);
});
function rA9(A, Q, B, G, Z) {
    let Y = oA9.useContext(cU);
    _1(async (J, X)=>{
        if (X.ctrl && J === "o") {
            if ((Q((I)=>(I === "transcript" ? "prompt" : "transcript")), B((I)=>I + 1), G(!1), !Y)) await Z();
        }
        if (X.ctrl && J === "e" && A === "transcript") {
            if ((G((I)=>!I), B((I)=>I + 1), !Y)) await Z();
        }
        if ((X.ctrl && J === "c" && A === "transcript") || (X.escape && A === "transcript")) {
            if ((Q("prompt"), B((I)=>I + 1), G(!1), !Y)) await Z();
        }
    });
}
var oA9;
