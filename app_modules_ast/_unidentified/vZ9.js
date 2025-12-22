// Module: vZ9
// Type: U
// Lines: 498519-498540
//
var completeURLElicitation = U((K0J, xZ9)=>{
    var m37 = qA("util"), yZ9 = prepareToHydrateHostInstance(), d37 = NO0(), c37 = (xZ9.exports = function(A) {
        yZ9.call(this);
        let Q = [], B = this;
        ((this._filter = new d37(A, {
            read: this.read.bind(this),
            write: function(G) {
                Q.push(G);
            },
            complete: function() {
                B.emit("complete", Buffer.concat(Q));
            }
        })), this._filter.start());
    });
    m37.inherits(c37, yZ9);
});
