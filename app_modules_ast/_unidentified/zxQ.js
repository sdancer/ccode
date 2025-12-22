// Module: zxQ
// Type: U
// Lines: 117822-117837
//
var zxQ = U((uo7, ExQ)=>{
    var Zo6 = {
        pronoun: "it",
        is: "is",
        was: "was",
        this: "this"
    }, Yo6 = {
        pronoun: "they",
        is: "are",
        was: "were",
        this: "these"
    };
    ExQ.exports = class {
        constructor(Q, B){
            ((this.singular = Q), (this.plural = B));
        }
        pluralize(Q) {
            let B = Q === 1, G = B ? Zo6 : Yo6, Z = B ? this.singular : this.plural;
            return {
                ...G,
                count: Q,
                noun: Z
            };
        }
    };
});
