// Module: UF0
// Type: U
// Lines: 401356-401393
//
var UF0 = U((VlZ, UR2)=>{
    UR2.exports = $R2;
    var CHA = PI();
    function $R2(A) {
        this.element = A;
    }
    Object.defineProperties($R2.prototype, {
        length: {
            get: CHA.shouldOverride
        },
        item: {
            value: CHA.shouldOverride
        },
        getNamedItem: {
            value: function(Q) {
                return this.element.getAttributeNode(Q);
            }
        },
        getNamedItemNS: {
            value: function(Q, B) {
                return this.element.getAttributeNodeNS(Q, B);
            }
        },
        setNamedItem: {
            value: CHA.nyi
        },
        setNamedItemNS: {
            value: CHA.nyi
        },
        removeNamedItem: {
            value: function(Q) {
                var B = this.element.getAttributeNode(Q);
                if (B) return (this.element.removeAttribute(Q), B);
                CHA.NotFoundError();
            }
        },
        removeNamedItemNS: {
            value: function(Q, B) {
                var G = this.element.getAttributeNodeNS(Q, B);
                if (G) return (this.element.removeAttributeNS(Q, B), G);
                CHA.NotFoundError();
            }
        }
    });
});
