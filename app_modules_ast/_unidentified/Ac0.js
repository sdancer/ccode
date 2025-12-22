// Module: Ac0
// Type: L
// Lines: 15865-15929
//
var Ac0 = L(()=>{
    ed0();
});
import { constants as Jp9 } from "node:os";
var Xp9 = ()=>{
    let A = o$1();
    return Object.fromEntries(A.map(Ip9));
}, Ip9 = ({ name: A, number: Q, description: B, supported: G, action: Z, forced: Y, standard: J })=>[
        A,
        {
            name: A,
            number: Q,
            description: B,
            supported: G,
            action: Z,
            forced: Y,
            standard: J
        }
    ], Qc0, Wp9 = ()=>{
    let A = o$1(), Q = a$1 + 1, B = Array.from({
        length: Q
    }, (G, Z)=>Kp9(Z, A));
    return Object.assign({}, ...B);
}, Kp9 = (A, Q)=>{
    let B = Vp9(A, Q);
    if (B === void 0) return {};
    let { name: G, description: Z, supported: Y, action: J, forced: X, standard: I } = B;
    return {
        [A]: {
            name: G,
            number: A,
            description: Z,
            supported: Y,
            action: J,
            forced: X,
            standard: I
        }
    };
}, Vp9 = (A, Q)=>{
    let B = Q.find(({ name: G })=>Jp9.signals[G] === A);
    if (B !== void 0) return B;
    return Q.find((G)=>G.number === A);
}, C_7;
