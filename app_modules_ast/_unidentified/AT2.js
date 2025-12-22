// Module: AT2
// Type: L
// Lines: 414736-414755
//
var AT2 = L(()=>{
    bA();
    i4();
    SK();
    qI();
    A4();
    Jq = l(React runtime(), 1);
});
function zH5(A) {
    try {
        let Q = FD.inputSchema.safeParse(A);
        if (!Q.success) return `input:${A.toString()}`;
        let { url: B } = Q.data;
        return `domain:${new URL(B).hostname}`;
    } catch  {
        return `input:${A.toString()}`;
    }
}
var FH5, EH5, FD;
