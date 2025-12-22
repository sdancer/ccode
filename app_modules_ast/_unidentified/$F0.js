// Module: $F0
// Type: U
// Lines: 401328-401356
//
var $F0 = U((KlZ, CR2)=>{
    var zR2 = lF(), rW5 = {
        nextElementSibling: {
            get: function() {
                if (this.parentNode) {
                    for(var A = this.nextSibling; A !== null; A = A.nextSibling)if (A.nodeType === zR2.ELEMENT_NODE) return A;
                }
                return null;
            }
        },
        previousElementSibling: {
            get: function() {
                if (this.parentNode) {
                    for(var A = this.previousSibling; A !== null; A = A.previousSibling)if (A.nodeType === zR2.ELEMENT_NODE) return A;
                }
                return null;
            }
        }
    };
    CR2.exports = rW5;
});
