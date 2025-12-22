// Module: fQ9
// Type: L
// Lines: 473389-473437
//
var fQ9 = L(()=>{
    LB7 = {
        lastWeek: "'last' eeee 'at' p",
        yesterday: "'yesterday at' p",
        today: "'today at' p",
        tomorrow: "'tomorrow at' p",
        nextWeek: "eeee 'at' p",
        other: "P"
    };
});
function hDA(A) {
    return (Q, B)=>{
        let G = B?.context ? String(B.context) : "standalone", Z;
        if (G === "formatting" && A.formattingValues) {
            let J = A.defaultFormattingWidth || A.defaultWidth, X = B?.width ? String(B.width) : J;
            Z = A.formattingValues[X] || A.formattingValues[J];
        } else {
            let J = A.defaultWidth, X = B?.width ? String(B.width) : A.defaultWidth;
            Z = A.values[X] || A.values[J];
        }
        let Y = A.argumentCallback ? A.argumentCallback(Q) : Q;
        return Z[Y];
    };
}
var OB7, MB7, RB7, _B7, jB7, TB7, PB7 = (A, Q)=>{
    let B = Number(A), G = B % 100;
    if (G > 20 || G < 10) switch(G % 10){
        case 1:
            return B + "st";
        case 2:
            return B + "nd";
        case 3:
            return B + "rd";
    }
    return B + "th";
}, bQ9;
