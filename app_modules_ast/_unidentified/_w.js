// Module: _w
// Type: U
// Lines: 281361-281387
//
var renderElement = U((Iq3)=>{
    Iq3.fromCallback = function(A) {
        return Object.defineProperty(function(...Q) {
            if (typeof Q[Q.length - 1] === "function") A.apply(this, Q);
            else return new Promise((B, G)=>{
                (Q.push((Z, Y)=>(Z != null ? G(Z) : B(Y))), A.apply(this, Q));
            });
        }, "name", {
            value: A.name
        });
    };
    Iq3.fromPromise = function(A) {
        return Object.defineProperty(function(...Q) {
            let B = Q[Q.length - 1];
            if (typeof B !== "function") return A.apply(this, Q);
            else (Q.pop(), A.apply(this, Q).then((G)=>B(null, G), B));
        }, "name", {
            value: A.name
        });
    };
});
