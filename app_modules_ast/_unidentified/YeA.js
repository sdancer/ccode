// Module: YeA
// Type: L
// Lines: 184507-184588
//
var YeA = L(()=>{
    Gl1();
    KZB = Og;
});
function oB(A, Q) {
    let B = UYA(), G = SNA({
        issueData: Q,
        data: A.data,
        path: A.path,
        errorMaps: [
            A.common.contextualErrorMap,
            A.schemaErrorMap,
            B,
            B === Og ? void 0 : Og
        ].filter((Z)=>!!Z)
    });
    A.common.issues.push(G);
}
class KF {
    constructor(){
        this.value = "valid";
    }
    dirty() {
        if (this.value === "valid") this.value = "dirty";
    }
    abort() {
        if (this.value !== "aborted") this.value = "aborted";
    }
    static mergeArray(A, Q) {
        let B = [];
        for (let G of Q){
            if (G.status === "aborted") return P4;
            if (G.status === "dirty") A.dirty();
            B.push(G.value);
        }
        return {
            status: A.value,
            value: B
        };
    }
    static async mergeObjectAsync(A, Q) {
        let B = [];
        for (let G of Q){
            let Z = await G.key, Y = await G.value;
            B.push({
                key: Z,
                value: Y
            });
        }
        return KF.mergeObjectSync(A, B);
    }
    static mergeObjectSync(A, Q) {
        let B = {};
        for (let G of Q){
            let { key: Z, value: Y } = G;
            if (Z.status === "aborted") return P4;
            if (Y.status === "aborted") return P4;
            if (Z.status === "dirty") A.dirty();
            if (Y.status === "dirty") A.dirty();
            if (Z.value !== "__proto__" && (typeof Y.value < "u" || G.alwaysSet)) B[Z.value] = Y.value;
        }
        return {
            status: A.value,
            value: B
        };
    }
}
var SNA = (A)=>{
    let { data: Q, path: B, errorMaps: G, issueData: Z } = A, Y = [
        ...B,
        ...(Z.path || [])
    ], J = {
        ...Z,
        path: Y
    };
    if (Z.message !== void 0) return {
        ...Z,
        path: Y,
        message: Z.message
    };
    let X = "", I = G.filter((W)=>!!W).slice().reverse();
    for (let W of I)X = W(J, {
        data: Q,
        defaultError: X
    }).message;
    return {
        ...Z,
        path: Y,
        message: X
    };
}, UR8, P4, i1A = (A)=>({
        status: "dirty",
        value: A
    }), aE = (A)=>({
        status: "valid",
        value: A
    }), JeA = (A)=>A.status === "aborted", XeA = (A)=>A.status === "dirty", fi = (A)=>A.status === "valid", wYA = (A)=>typeof Promise < "u" && A instanceof Promise;
