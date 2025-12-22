// Module: z5B
// Type: U
// Lines: 176175-176227
//
var z5B = U((dXG, E5B)=>{
    var KtA = color conversion();
    function mq8() {
        let A = {}, Q = Object.keys(KtA);
        for(let B = Q.length, G = 0; G < B; G++)A[Q[G]] = {
            distance: -1,
            parent: null
        };
        return A;
    }
    function dq8(A) {
        let Q = mq8(), B = [
            A
        ];
        Q[A].distance = 0;
        while(B.length){
            let G = B.pop(), Z = Object.keys(KtA[G]);
            for(let Y = Z.length, J = 0; J < Y; J++){
                let X = Z[J], I = Q[X];
                if (I.distance === -1) ((I.distance = Q[G].distance + 1), (I.parent = G), B.unshift(X));
            }
        }
        return Q;
    }
    function cq8(A, Q) {
        return function(B) {
            return Q(A(B));
        };
    }
    function pq8(A, Q) {
        let B = [
            Q[A].parent,
            A
        ], G = KtA[Q[A].parent][A], Z = Q[A].parent;
        while(Q[Z].parent)(B.unshift(Q[Z].parent), (G = cq8(KtA[Q[Z].parent][Z], G)), (Z = Q[Z].parent));
        return ((G.conversion = B), G);
    }
    E5B.exports = function(A) {
        let Q = dq8(A), B = {}, G = Object.keys(Q);
        for(let Z = G.length, Y = 0; Y < Z; Y++){
            let J = G[Y];
            if (Q[J].parent === null) continue;
            B[J] = pq8(J, Q);
        }
        return B;
    };
});
