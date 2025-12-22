// Module: xd0
// Type: U
// Lines: 15307-15322
//
var xd0 = U((aR7, yd0)=>{
    var u$1 = qA("fs"), vc9 = Sd0();
    function kc9(A) {
        let B = Buffer.alloc(150), G;
        try {
            ((G = u$1.openSync(A, "r")), u$1.readSync(G, B, 0, 150, 0), u$1.closeSync(G));
        } catch (Z) {}
        return vc9(B.toString());
    }
    yd0.exports = kc9;
});
