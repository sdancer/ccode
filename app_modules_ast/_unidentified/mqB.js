// Module: mqB
// Type: L
// Lines: 225097-225113
//
var renderChildrenArray = L(()=>{
    uqB();
});
function gJA(A) {
    if (M0A(A)) return A.message;
    else {
        let Q;
        try {
            if (typeof A === "object" && A) Q = JSON.stringify(A);
            else Q = String(A);
        } catch (B) {
            Q = "[unable to stringify input]";
        }
        return `Unknown error ${Q}`;
    }
}
