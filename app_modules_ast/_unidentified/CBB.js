// Module: CBB
// Type: L
// Lines: 139047-139090
//
var createRenderState = L(()=>{
    zBB();
});
function Pm1(A, { include: Q, exclude: B } = {}) {
    let G = (Z)=>{
        let Y = (J)=>(typeof J === "string" ? Z === J : J.test(Z));
        if (Q) return Q.some(Y);
        if (B) return !B.some(Y);
        return !0;
    };
    for (let [Z, Y] of AE8(A.constructor.prototype)){
        if (Y === "constructor" || !G(Y)) continue;
        let J = Reflect.getOwnPropertyDescriptor(Z, Y);
        if (J && typeof J.value === "function") A[Y] = A[Y].bind(A);
    }
    return A;
}
var AE8 = (A)=>{
    let Q = new Set();
    do for (let B of Reflect.ownKeys(A))Q.add([
        A,
        B
    ]);
    while ((A = Reflect.getPrototypeOf(A)) && A !== Object.prototype)
    return Q;
};
import { PassThrough as $BB } from "node:stream";
var UBB, Sm1, QE8 = (A)=>{
    let Q = new $BB(), B = new $BB();
    ((Q.write = (Z)=>{
        A("stdout", Z);
    }), (B.write = (Z)=>{
        A("stderr", Z);
    }));
    let G = new console.Console(Q, B);
    for (let Z of UBB)((Sm1[Z] = console[Z]), (console[Z] = G[Z]));
    return ()=>{
        for (let Z of UBB)console[Z] = Sm1[Z];
        Sm1 = {};
    };
}, wBB;
