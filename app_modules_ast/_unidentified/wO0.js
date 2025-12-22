// Module: wO0
// Type: U
// Lines: 498357-498397
//
var wO0 = U((f37)=>{
    var Ps = [
        {
            x: [
                0
            ],
            y: [
                0
            ]
        },
        {
            x: [
                4
            ],
            y: [
                0
            ]
        },
        {
            x: [
                0,
                4
            ],
            y: [
                4
            ]
        },
        {
            x: [
                2,
                6
            ],
            y: [
                0,
                4
            ]
        },
        {
            x: [
                0,
                2,
                4,
                6
            ],
            y: [
                2,
                6
            ]
        },
        {
            x: [
                1,
                3,
                5,
                7
            ],
            y: [
                0,
                2,
                4,
                6
            ]
        },
        {
            x: [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7
            ],
            y: [
                1,
                3,
                5,
                7
            ]
        }
    ];
    f37.getImagePasses = function(A, Q) {
        let B = [], G = A % 8, Z = Q % 8, Y = (A - G) / 8, J = (Q - Z) / 8;
        for(let X = 0; X < Ps.length; X++){
            let I = Ps[X], W = Y * I.x.length, K = J * I.y.length;
            for(let V = 0; V < I.x.length; V++)if (I.x[V] < G) W++;
            else break;
            for(let V = 0; V < I.y.length; V++)if (I.y[V] < Z) K++;
            else break;
            if (W > 0 && K > 0) B.push({
                width: W,
                height: K,
                index: X
            });
        }
        return B;
    };
    f37.getInterlaceIterator = function(A) {
        return function(Q, B, G) {
            let Z = Q % Ps[G].x.length, Y = ((Q - Z) / Ps[G].x.length) * 8 + Ps[G].x[Z], J = B % Ps[G].y.length, X = ((B - J) / Ps[G].y.length) * 8 + Ps[G].y[J];
            return Y * 4 + X * A * 4;
        };
    };
});
