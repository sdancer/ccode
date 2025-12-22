// Module: _v2
// Type: U
// Lines: 429742-429839
//
var _v2 = U((Rv2)=>{
    Object.defineProperty(Rv2, "__esModule", {
        value: !0
    });
    function Nv2(A, Q) {
        let B = 0;
        for(let G = A.length - 1; G >= 0; G--){
            let Z = A[G];
            if (Z === ".") A.splice(G, 1);
            else if (Z === "..") (A.splice(G, 1), B++);
            else if (B) (A.splice(G, 1), B--);
        }
        if (Q) for(; B--; B)A.unshift("..");
        return A;
    }
    var vU5 = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
    function Lv2(A) {
        let Q = A.length > 1024 ? `<truncated>${A.slice(-1024)}` : A, B = vU5.exec(Q);
        return B ? B.slice(1) : [];
    }
    function AC0(...A) {
        let Q = "", B = !1;
        for(let G = A.length - 1; G >= -1 && !B; G--){
            let Z = G >= 0 ? A[G] : "/";
            if (!Z) continue;
            ((Q = `${Z}/${Q}`), (B = Z.charAt(0) === "/"));
        }
        return ((Q = Nv2(Q.split("/").filter((G)=>!!G), !B).join("/")), (B ? "/" : "") + Q || ".");
    }
    function qv2(A) {
        let Q = 0;
        for(; Q < A.length; Q++)if (A[Q] !== "") break;
        let B = A.length - 1;
        for(; B >= 0; B--)if (A[B] !== "") break;
        if (Q > B) return [];
        return A.slice(Q, B - Q + 1);
    }
    function kU5(A, Q) {
        ((A = AC0(A).slice(1)), (Q = AC0(Q).slice(1)));
        let B = qv2(A.split("/")), G = qv2(Q.split("/")), Z = Math.min(B.length, G.length), Y = Z;
        for(let X = 0; X < Z; X++)if (B[X] !== G[X]) {
            Y = X;
            break;
        }
        let J = [];
        for(let X = Y; X < B.length; X++)J.push("..");
        return ((J = J.concat(G.slice(Y))), J.join("/"));
    }
    function Ov2(A) {
        let Q = Mv2(A), B = A.slice(-1) === "/", G = Nv2(A.split("/").filter((Z)=>!!Z), !Q).join("/");
        if (!G && !Q) G = ".";
        if (G && B) G += "/";
        return (Q ? "/" : "") + G;
    }
    function Mv2(A) {
        return A.charAt(0) === "/";
    }
    function fU5(...A) {
        return Ov2(A.join("/"));
    }
    function bU5(A) {
        let Q = Lv2(A), B = Q[0], G = Q[1];
        if (!B && !G) return ".";
        if (G) G = G.slice(0, G.length - 1);
        return B + G;
    }
    function hU5(A, Q) {
        let B = Lv2(A)[2];
        if (Q && B.slice(Q.length * -1) === Q) B = B.slice(0, B.length - Q.length);
        return B;
    }
    Rv2.basename = hU5;
    Rv2.dirname = bU5;
    Rv2.isAbsolute = Mv2;
    Rv2.join = fU5;
    Rv2.normalizePath = Ov2;
    Rv2.relative = kU5;
    Rv2.resolve = AC0;
});
