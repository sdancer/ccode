// Module: od0
// Type: L
// Lines: 15538-15564
//
var od0 = L(()=>{
    id0();
    UuA = new WeakMap();
    nd0.callCount = (A)=>{
        if (!UuA.has(A)) throw Error(`The given function \`${A.name}\` is not wrapped by the \`onetime\` package`);
        return UuA.get(A);
    };
    ad0 = nd0;
});
var rd0 = ()=>{
    let A = a$1 - sd0 + 1;
    return Array.from({
        length: A
    }, Gp9);
}, Gp9 = (A, Q)=>({
        name: `SIGRT${Q + 1}`,
        number: sd0 + Q,
        action: "terminate",
        description: "Application-specific signal (realtime)",
        standard: "posix"
    }), sd0 = 34, a$1 = 64;
var td0;
