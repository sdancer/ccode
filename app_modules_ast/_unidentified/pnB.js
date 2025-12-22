// Module: pnB
// Type: U
// Lines: 282485-282541
//
var createRenderState = U((N9Z, cnB)=>{
    var QWA;
    try {
        QWA = renderElement();
    } catch (A) {
        QWA = qA("fs");
    }
    var W81 = renderElement(), { stringify: mnB, stripBom: dnB } = I81();
    async function mN3(A, Q = {}) {
        if (typeof Q === "string") Q = {
            encoding: Q
        };
        let B = Q.fs || QWA, G = "throws" in Q ? Q.throws : !0, Z = await W81.fromCallback(B.readFile)(A, Q);
        Z = dnB(Z);
        let Y;
        try {
            Y = JSON.parse(Z, Q ? Q.reviver : null);
        } catch (J) {
            if (G) throw ((J.message = `${A}: ${J.message}`), J);
            else return null;
        }
        return Y;
    }
    var dN3 = W81.fromPromise(mN3);
    function cN3(A, Q = {}) {
        if (typeof Q === "string") Q = {
            encoding: Q
        };
        let B = Q.fs || QWA, G = "throws" in Q ? Q.throws : !0;
        try {
            let Z = B.readFileSync(A, Q);
            return ((Z = dnB(Z)), JSON.parse(Z, Q.reviver));
        } catch (Z) {
            if (G) throw ((Z.message = `${A}: ${Z.message}`), Z);
            else return null;
        }
    }
    async function pN3(A, Q, B = {}) {
        let G = B.fs || QWA, Z = mnB(Q, B);
        await W81.fromCallback(G.writeFile)(A, Z, B);
    }
    var lN3 = W81.fromPromise(pN3);
    function iN3(A, Q, B = {}) {
        let G = B.fs || QWA, Z = mnB(Q, B);
        return G.writeFileSync(A, Z, B);
    }
    var nN3 = {
        readFile: dN3,
        readFileSync: cN3,
        writeFile: lN3,
        writeFileSync: iN3
    };
    cnB.exports = nN3;
});
