// Module: H6B
// Type: L
// Lines: 169898-169909
//
var H6B = L(()=>{
    pZA = class pZA extends Dg {
        relatedTarget;
        constructor(A, Q = {}){
            let B = A === "focusin" || A === "focusout";
            super(A, {
                bubbles: B,
                cancelable: !1
            });
            this.relatedTarget = Q.relatedTarget ?? null;
        }
    };
});
var qc1;
