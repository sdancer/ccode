// Module: rD0
// Type: U
// Lines: 398987-399049
//
var rD0 = U((npZ, MM2)=>{
    var OM2 = aD0();
    MM2.exports = oD0;
    function oD0() {
        (OM2.call(this), (this.screenX = this.screenY = this.clientX = this.clientY = 0), (this.ctrlKey = this.altKey = this.shiftKey = this.metaKey = !1), (this.button = 0), (this.buttons = 1), (this.relatedTarget = null));
    }
    oD0.prototype = Object.create(OM2.prototype, {
        constructor: {
            value: oD0
        },
        initMouseEvent: {
            value: function(A, Q, B, G, Z, Y, J, X, I, W, K, V, H, D, F) {
                switch((this.initEvent(A, Q, B, G, Z), (this.screenX = Y), (this.screenY = J), (this.clientX = X), (this.clientY = I), (this.ctrlKey = W), (this.altKey = K), (this.shiftKey = V), (this.metaKey = H), (this.button = D), D)){
                    case 0:
                        this.buttons = 1;
                        break;
                    case 1:
                        this.buttons = 4;
                        break;
                    case 2:
                        this.buttons = 2;
                        break;
                    default:
                        this.buttons = 0;
                        break;
                }
                this.relatedTarget = F;
            }
        },
        getModifierState: {
            value: function(A) {
                switch(A){
                    case "Alt":
                        return this.altKey;
                    case "Control":
                        return this.ctrlKey;
                    case "Shift":
                        return this.shiftKey;
                    case "Meta":
                        return this.metaKey;
                    default:
                        return !1;
                }
            }
        }
    });
});
