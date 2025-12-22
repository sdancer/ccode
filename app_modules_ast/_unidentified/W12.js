// Module: W12
// Type: U
// Lines: 312381-312405
//
var W12 = U((XYZ, I12)=>{
    var xS3 = Ck();
    class X12 extends xS3 {
        constructor(A, Q){
            super(A);
            this.onItemPop = Q.onItemPop;
        }
        _getOverriddenMethods(A, Q) {
            return {
                pop () {
                    (A.onItemPop(this.current), Q.pop.call(this));
                },
                popAllUpToHtmlElement () {
                    for(let B = this.stackTop; B > 0; B--)A.onItemPop(this.items[B]);
                    Q.popAllUpToHtmlElement.call(this);
                },
                remove (B) {
                    (A.onItemPop(this.current), Q.remove.call(this, B));
                }
            };
        }
    }
    I12.exports = X12;
});
