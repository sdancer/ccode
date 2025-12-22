// Module: zJ1
// Type: L
// Lines: 392667-393016
//
var parsePattern = L(()=>{
    pushStartInstance();
    ((zD0 = /\$\(.*<</), (yJ5 = [
        {
            pattern: /<\(/,
            message: "process substitution <()"
        },
        {
            pattern: />\(/,
            message: "process substitution >()"
        },
        {
            pattern: /\$\(/,
            message: "$() command substitution"
        },
        {
            pattern: /\$\{/,
            message: "${} parameter substitution"
        },
        {
            pattern: /~\[/,
            message: "Zsh-style parameter expansion"
        },
        {
            pattern: /\(e:/,
            message: "Zsh-style glob qualifiers"
        },
        {
            pattern: /<#/,
            message: "PowerShell comment syntax"
        }
    ]), (OJ = {
        INCOMPLETE_COMMANDS: 1,
        JQ_SYSTEM_FUNCTION: 2,
        JQ_FILE_ARGUMENTS: 3,
        OBFUSCATED_FLAGS: 4,
        SHELL_METACHARACTERS: 5,
        DANGEROUS_VARIABLES: 6,
        NEWLINES: 7,
        DANGEROUS_PATTERNS_COMMAND_SUBSTITUTION: 8,
        DANGEROUS_PATTERNS_INPUT_REDIRECTION: 9,
        DANGEROUS_PATTERNS_OUTPUT_REDIRECTION: 10,
        IFS_INJECTION: 11,
        GIT_COMMIT_SUBSTITUTION: 12,
        PROC_ENVIRON_ACCESS: 13
    }));
});
function IHA(A) {
    if (A !== xr) throw Error("Illegal constructor");
}
function MxA(A) {
    return !!A && typeof A.row === "number" && typeof A.column === "number";
}
function wO2(A) {
    U1 = A;
}
function qD0(A, Q, B, G) {
    let Z = B - Q, Y = A.textCallback(Q, G);
    if (Y) {
        Q += Y.length;
        while(Q < B){
            let J = A.textCallback(Q, G);
            if (J && J.length > 0) ((Q += J.length), (Y += J));
            else break;
        }
        if (Q > B) Y = Y.slice(0, Z);
    }
    return Y ?? "";
}
function wD0(A, Q, B, G, Z) {
    for(let Y = 0, J = Z.length; Y < J; Y++){
        let X = U1.getValue(B, "i32");
        B += Y9;
        let I = VX(Q, B);
        ((B += Bq), (Z[Y] = {
            patternIndex: G,
            name: A.captureNames[X],
            node: I
        }));
    }
    return B;
}
function D8(A, Q = 0) {
    let B = m2 + Q * Bq;
    (U1.setValue(B, A.id, "i32"), (B += Y9), U1.setValue(B, A.startIndex, "i32"), (B += Y9), U1.setValue(B, A.startPosition.row, "i32"), (B += Y9), U1.setValue(B, A.startPosition.column, "i32"), (B += Y9), U1.setValue(B, A[0], "i32"));
}
function VX(A, Q = m2) {
    let B = U1.getValue(Q, "i32");
    if (((Q += Y9), B === 0)) return null;
    let G = U1.getValue(Q, "i32");
    Q += Y9;
    let Z = U1.getValue(Q, "i32");
    Q += Y9;
    let Y = U1.getValue(Q, "i32");
    Q += Y9;
    let J = U1.getValue(Q, "i32");
    return new AX5(xr, {
        id: B,
        tree: A,
        startIndex: G,
        startPosition: {
            row: Z,
            column: Y
        },
        other: J
    });
}
function DY(A, Q = m2) {
    (U1.setValue(Q + 0 * Y9, A[0], "i32"), U1.setValue(Q + 1 * Y9, A[1], "i32"), U1.setValue(Q + 2 * Y9, A[2], "i32"), U1.setValue(Q + 3 * Y9, A[3], "i32"));
}
function bL(A) {
    ((A[0] = U1.getValue(m2 + 0 * Y9, "i32")), (A[1] = U1.getValue(m2 + 1 * Y9, "i32")), (A[2] = U1.getValue(m2 + 2 * Y9, "i32")), (A[3] = U1.getValue(m2 + 3 * Y9, "i32")));
}
function C_(A, Q) {
    (U1.setValue(A, Q.row, "i32"), U1.setValue(A + Y9, Q.column, "i32"));
}
function E9A(A) {
    return {
        row: U1.getValue(A, "i32") >>> 0,
        column: U1.getValue(A + Y9, "i32") >>> 0
    };
}
function qO2(A, Q) {
    (C_(A, Q.startPosition), (A += If), C_(A, Q.endPosition), (A += If), U1.setValue(A, Q.startIndex, "i32"), (A += Y9), U1.setValue(A, Q.endIndex, "i32"), (A += Y9));
}
function $J1(A) {
    let Q = {};
    return ((Q.startPosition = E9A(A)), (A += If), (Q.endPosition = E9A(A)), (A += If), (Q.startIndex = U1.getValue(A, "i32") >>> 0), (A += Y9), (Q.endIndex = U1.getValue(A, "i32") >>> 0), Q);
}
function NO2(A, Q = m2) {
    (C_(Q, A.startPosition), (Q += If), C_(Q, A.oldEndPosition), (Q += If), C_(Q, A.newEndPosition), (Q += If), U1.setValue(Q, A.startIndex, "i32"), (Q += Y9), U1.setValue(Q, A.oldEndIndex, "i32"), (Q += Y9), U1.setValue(Q, A.newEndIndex, "i32"), (Q += Y9));
}
function LO2(A) {
    let Q = {};
    return ((Q.major_version = U1.getValue(A, "i32")), (A += Y9), (Q.minor_version = U1.getValue(A, "i32")), (A += Y9), (Q.field_count = U1.getValue(A, "i32")), Q);
}
function OO2(A, Q, B, G) {
    if (A.length !== 3) throw Error(`Wrong number of arguments to \`#${B}\` predicate. Expected 2, got ${A.length - 1}`);
    if (!UO2(A[1])) throw Error(`First argument of \`#${B}\` predicate must be a capture. Got "${A[1].value}"`);
    let Z = B === "eq?" || B === "any-eq?", Y = !B.startsWith("any-");
    if (UO2(A[2])) {
        let J = A[1].name, X = A[2].name;
        G[Q].push((I)=>{
            let W = [], K = [];
            for (let H of I){
                if (H.name === J) W.push(H.node);
                if (H.name === X) K.push(H.node);
            }
            let V = j0((H, D, F)=>{
                return F ? H.text === D.text : H.text !== D.text;
            }, "compare");
            return Y ? W.every((H)=>K.some((D)=>V(H, D, Z))) : W.some((H)=>K.some((D)=>V(H, D, Z)));
        });
    } else {
        let J = A[1].name, X = A[2].value, I = j0((K)=>K.text === X, "matches"), W = j0((K)=>K.text !== X, "doesNotMatch");
        G[Q].push((K)=>{
            let V = [];
            for (let D of K)if (D.name === J) V.push(D.node);
            let H = Z ? I : W;
            return Y ? V.every(H) : V.some(H);
        });
    }
}
function MO2(A, Q, B, G) {
    if (A.length !== 3) throw Error(`Wrong number of arguments to \`#${B}\` predicate. Expected 2, got ${A.length - 1}.`);
    if (A[1].type !== "capture") throw Error(`First argument of \`#${B}\` predicate must be a capture. Got "${A[1].value}".`);
    if (A[2].type !== "string") throw Error(`Second argument of \`#${B}\` predicate must be a string. Got @${A[2].name}.`);
    let Z = B === "match?" || B === "any-match?", Y = !B.startsWith("any-"), J = A[1].name, X = new RegExp(A[2].value);
    G[Q].push((I)=>{
        let W = [];
        for (let V of I)if (V.name === J) W.push(V.node.text);
        let K = j0((V, H)=>{
            return H ? X.test(V) : !X.test(V);
        }, "test");
        if (W.length === 0) return !Z;
        return Y ? W.every((V)=>K(V, Z)) : W.some((V)=>K(V, Z));
    });
}
function RO2(A, Q, B, G) {
    if (A.length < 2) throw Error(`Wrong number of arguments to \`#${B}\` predicate. Expected at least 1. Got ${A.length - 1}.`);
    if (A[1].type !== "capture") throw Error(`First argument of \`#${B}\` predicate must be a capture. Got "${A[1].value}".`);
    let Z = B === "any-of?", Y = A[1].name, J = A.slice(2);
    if (!J.every(ND0)) throw Error(`Arguments to \`#${B}\` predicate must be strings.".`);
    let X = J.map((I)=>I.value);
    G[Q].push((I)=>{
        let W = [];
        for (let K of I)if (K.name === Y) W.push(K.node.text);
        if (W.length === 0) return !Z;
        return W.every((K)=>X.includes(K)) === Z;
    });
}
function _O2(A, Q, B, G, Z) {
    if (A.length < 2 || A.length > 3) throw Error(`Wrong number of arguments to \`#${B}\` predicate. Expected 1 or 2. Got ${A.length - 1}.`);
    if (!A.every(ND0)) throw Error(`Arguments to \`#${B}\` predicate must be strings.".`);
    let Y = B === "is?" ? G : Z;
    if (!Y[Q]) Y[Q] = {};
    Y[Q][A[1].value] = A[2]?.value ?? null;
}
function jO2(A, Q, B) {
    if (A.length < 2 || A.length > 3) throw Error(`Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${A.length - 1}.`);
    if (!A.every(ND0)) throw Error('Arguments to `#set!` predicate must be strings.".');
    if (!B[Q]) B[Q] = {};
    B[Q][A[1].value] = A[2]?.value ?? null;
}
function TO2(A, Q, B, G, Z, Y, J, X, I, W, K) {
    if (Q === QX5) {
        let V = G[B];
        Y.push({
            type: "capture",
            name: V
        });
    } else if (Q === BX5) Y.push({
        type: "string",
        value: Z[B]
    });
    else if (Y.length > 0) {
        if (Y[0].type !== "string") throw Error("Predicates must begin with a literal value");
        let V = Y[0].value;
        switch(V){
            case "any-not-eq?":
            case "not-eq?":
            case "any-eq?":
            case "eq?":
                OO2(Y, A, V, J);
                break;
            case "any-not-match?":
            case "not-match?":
            case "any-match?":
            case "match?":
                MO2(Y, A, V, J);
                break;
            case "not-any-of?":
            case "any-of?":
                RO2(Y, A, V, J);
                break;
            case "is?":
            case "is-not?":
                _O2(Y, A, V, W, K);
                break;
            case "set!":
                jO2(Y, A, I);
                break;
            default:
                X[A].push({
                    operator: V,
                    operands: Y.slice(1)
                });
        }
        Y.length = 0;
    }
}
async function PO2(A) {
    if (!CJ1) CJ1 = await XX5(A);
    return CJ1;
}
function SO2() {
    return !!CJ1;
}
var rJ5, j0 = (A, Q)=>rJ5(A, "name", {
        value: Q,
        configurable: !0
    }), $O2 = 2, Y9 = 4, CD0, Bq, If, RxA, yr, xr, U1, sJ5, tJ5, eJ5, AX5, QX5 = 1, BX5 = 2, GX5, LdZ, UO2, ND0, VS, OxA, ZX5, YX5, UJ1, JX5, XX5, CJ1 = null, m2, $D0, UD0, _xA;
