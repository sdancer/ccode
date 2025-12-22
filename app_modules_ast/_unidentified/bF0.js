// Module: bF0
// Type: U
// Lines: 402658-402696
//
var bF0 = U((qlZ, iR2)=>{
    var wlZ = (iR2.exports = {
        nextSkippingChildren: EK5,
        nextAncestorSibling: fF0,
        next: zK5,
        previous: CK5,
        deepLastChild: lR2
    });
    function EK5(A, Q) {
        if (A === Q) return null;
        if (A.nextSibling !== null) return A.nextSibling;
        return fF0(A, Q);
    }
    function fF0(A, Q) {
        for(A = A.parentNode; A !== null; A = A.parentNode){
            if (A === Q) return null;
            if (A.nextSibling !== null) return A.nextSibling;
        }
        return null;
    }
    function zK5(A, Q) {
        var B = A.firstChild;
        if (B !== null) return B;
        if (A === Q) return null;
        if (((B = A.nextSibling), B !== null)) return B;
        return fF0(A, Q);
    }
    function lR2(A) {
        while(A.lastChild)A = A.lastChild;
        return A;
    }
    function CK5(A, Q) {
        var B = A.previousSibling;
        if (B !== null) return lR2(B);
        if (((B = A.parentNode), B === Q)) return null;
        return B;
    }
});
