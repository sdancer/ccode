// Module: iM2
// Type: U
// Lines: 400139-400150
//
var iM2 = U((QlZ, lM2)=>{
    lM2.exports = class extends Array {
        constructor(Q){
            super((Q && Q.length) || 0);
            if (Q) for(var B in Q)this[B] = Q[B];
        }
        item(Q) {
            return this[Q] || null;
        }
    };
});
