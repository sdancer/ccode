// Module: zw0
// Type: U
// Lines: 452505-452529
//
var zw0 = U((oe5)=>{
    var E4A = 256, dK1 = [], mK1;
    while(E4A--)dK1[E4A] = (E4A + 256).toString(16).substring(1);
    function ae5() {
        var A = 0, Q, B = "";
        if (!mK1 || E4A + 16 > 256) {
            mK1 = Array((A = 256));
            while(A--)mK1[A] = (256 * Math.random()) | 0;
            A = E4A = 0;
        }
        for(; A < 16; A++){
            if (((Q = mK1[E4A + A]), A == 6)) B += dK1[(Q & 15) | 64];
            else if (A == 8) B += dK1[(Q & 63) | 128];
            else B += dK1[Q];
            if (A & 1 && A > 1 && A < 11) B += "-";
        }
        return (E4A++, B);
    }
    oe5.v4 = ae5;
});
