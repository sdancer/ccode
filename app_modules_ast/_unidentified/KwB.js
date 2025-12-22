// Module: KwB
// Type: L
// Lines: 222849-222904
//
var KwB = L(()=>{
    PJA();
    WwB = {
        generatePluginConfiguration: $n8
    };
});
import { EOL as Un8 } from "node:os";
import wn8 from "node:util";
import * as VwB from "node:process";
function HwB(A, ...Q) {
    VwB.stderr.write(`${wn8.format(A, ...Q)}${Un8}`);
}
var DwB = ()=>{};
function Er1(A) {
    ((EwB = A), (Dr1 = []), (Fr1 = []));
    let Q = /\*/g, B = A.split(",").map((G)=>G.trim().replace(Q, ".*?"));
    for (let G of B)if (G.startsWith("-")) Fr1.push(new RegExp(`^${G.substr(1)}$`));
    else Dr1.push(new RegExp(`^${G}$`));
    for (let G of e11)G.enabled = zr1(G.namespace);
}
function zr1(A) {
    if (A.endsWith("*")) return !0;
    for (let Q of Fr1)if (Q.test(A)) return !1;
    for (let Q of Dr1)if (Q.test(A)) return !0;
    return !1;
}
function qn8() {
    let A = EwB || "";
    return (Er1(""), A);
}
function CwB(A) {
    let Q = Object.assign(B, {
        enabled: zr1(A),
        destroy: Nn8,
        log: zwB.log,
        namespace: A,
        extend: Ln8
    });
    function B(...G) {
        if (!Q.enabled) return;
        if (G.length > 0) G[0] = `${A} ${G[0]}`;
        Q.log(...G);
    }
    return (e11.push(Q), Q);
}
function Nn8() {
    let A = e11.indexOf(this);
    if (A >= 0) return (e11.splice(A, 1), !0);
    return !1;
}
function Ln8(A) {
    let Q = CwB(`${this.namespace}:${A}`);
    return ((Q.log = this.log), Q);
}
var FwB, EwB, Dr1, Fr1, e11, zwB, SJA;
