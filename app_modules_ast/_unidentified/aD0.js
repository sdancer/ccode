// Module: aD0
// Type: U
// Lines: 398972-398987
//
var aD0 = U((ipZ, LM2)=>{
    var NM2 = HHA();
    LM2.exports = nD0;
    function nD0() {
        (NM2.call(this), (this.view = null), (this.detail = 0));
    }
    nD0.prototype = Object.create(NM2.prototype, {
        constructor: {
            value: nD0
        },
        initUIEvent: {
            value: function(A, Q, B, G, Z) {
                (this.initEvent(A, Q, B), (this.view = G), (this.detail = Z));
            }
        }
    });
});
