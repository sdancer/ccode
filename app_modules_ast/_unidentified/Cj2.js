// Module: Cj2
// Type: U
// Lines: 413392-413433
//
var Cj2 = U((mlZ, zj2)=>{
    var OV5 = lJ1(), MV5 = pushStartInstance();
    zj2.exports = ZE0;
    function ZE0(A, Q) {
        ((this._window = A), (this._href = Q));
    }
    ZE0.prototype = Object.create(MV5.prototype, {
        constructor: {
            value: ZE0
        },
        href: {
            get: function() {
                return this._href;
            },
            set: function(A) {
                this.assign(A);
            }
        },
        assign: {
            value: function(A) {
                var Q = new OV5(this._href), B = Q.resolve(A);
                this._href = B;
            }
        },
        replace: {
            value: function(A) {
                this.assign(A);
            }
        },
        reload: {
            value: function() {
                this.assign(this.href);
            }
        },
        toString: {
            value: function() {
                return this.href;
            }
        }
    });
});
