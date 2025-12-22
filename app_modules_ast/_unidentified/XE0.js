// Module: XE0
// Type: U
// Lines: 413482-413543
//
var XE0 = U((plZ, Lj2)=>{
    var jV5 = stopParsing(), TV5 = useActionState(), PV5 = Cj2(), txA = PI();
    Lj2.exports = XX1;
    function XX1(A) {
        ((this.document = A || new jV5(null).createHTMLDocument("")), (this.document._scripting_enabled = !0), (this.document.defaultView = this), (this.location = new PV5(this, this.document._address || "about:blank")));
    }
    XX1.prototype = Object.create(TV5.prototype, {
        console: {
            value: console
        },
        history: {
            value: {
                back: txA.nyi,
                forward: txA.nyi,
                go: txA.nyi
            }
        },
        navigator: {
            value: Uj2()
        },
        window: {
            get: function() {
                return this;
            }
        },
        self: {
            get: function() {
                return this;
            }
        },
        frames: {
            get: function() {
                return this;
            }
        },
        parent: {
            get: function() {
                return this;
            }
        },
        top: {
            get: function() {
                return this;
            }
        },
        length: {
            value: 0
        },
        frameElement: {
            value: null
        },
        opener: {
            value: null
        },
        onload: {
            get: function() {
                return this._getEventHandler("load");
            },
            set: function(A) {
                this._setEventHandler("load", A);
            }
        },
        getComputedStyle: {
            value: function(Q) {
                return Q.style;
            }
        }
    });
    txA.expose(qj2(), XX1);
    txA.expose(JE0(), XX1);
});
