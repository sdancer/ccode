// Module: V6B
// Type: L
// Lines: 169867-169898
//
var V6B = L(()=>{
    PsA = class PsA extends Dg {
        key;
        code;
        sequence;
        parsedKey;
        constructor(A, Q){
            super(A, {
                bubbles: !0,
                cancelable: !0
            });
            ((this.parsedKey = Q), (this.key = Q.name || Q.sequence || ""), (this.code = Q.code || ""), (this.sequence = Q.sequence || ""));
        }
        get ctrlKey() {
            return this.parsedKey.ctrl;
        }
        get shiftKey() {
            return this.parsedKey.shift;
        }
        get metaKey() {
            return this.parsedKey.meta;
        }
        get altKey() {
            return this.parsedKey.option;
        }
        get fnKey() {
            return this.parsedKey.fn;
        }
    };
});
var pZA;
