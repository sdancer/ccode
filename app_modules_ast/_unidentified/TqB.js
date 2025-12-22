// Module: TqB
// Type: L
// Lines: 224973-225010
//
var TqB = L(()=>{
    dT();
});
import * as bJA from "node:os";
import * as z01 from "node:process";
function PqB() {
    return "User-Agent";
}
async function SqB(A) {
    if (z01 && z01.versions) {
        let Q = z01.versions;
        if (Q.bun) A.set("Bun", Q.bun);
        else if (Q.deno) A.set("Deno", Q.deno);
        else if (Q.node) A.set("Node", Q.node);
    }
    A.set("OS", `(${bJA.arch()}-${bJA.type()}-${bJA.release()})`);
}
var yqB = ()=>{};
var C01 = "1.21.0", xqB = 3;
function xa8(A) {
    let Q = [];
    for (let [B, G] of A){
        let Z = G ? `${B}/${G}` : B;
        Q.push(Z);
    }
    return Q.join(" ");
}
function vqB() {
    return PqB();
}
async function $01(A) {
    let Q = new Map();
    (Q.set("core-rest-pipeline", C01), await SqB(Q));
    let B = xa8(Q);
    return A ? `${A} ${B}` : B;
}
