// Module: tJ1
// Type: U
// Lines: 406078-406125
//
var tJ1 = U((hlZ, d_2)=>{
    d_2.exports = sJ1;
    var tK5 = lF(), m_2 = RF0(), eK5 = uJ1();
    function sJ1(A, Q, B, G) {
        (m_2.call(this), (this.nodeType = tK5.DOCUMENT_TYPE_NODE), (this.ownerDocument = A || null), (this.name = Q), (this.publicId = B || ""), (this.systemId = G || ""));
    }
    sJ1.prototype = Object.create(m_2.prototype, {
        nodeName: {
            get: function() {
                return this.name;
            }
        },
        nodeValue: {
            get: function() {
                return null;
            },
            set: function() {}
        },
        clone: {
            value: function() {
                return new sJ1(this.ownerDocument, this.name, this.publicId, this.systemId);
            }
        },
        isEqual: {
            value: function(Q) {
                return (this.name === Q.name && this.publicId === Q.publicId && this.systemId === Q.systemId);
            }
        }
    });
    Object.defineProperties(sJ1.prototype, eK5);
});
