// Module: XY9
// Type: U
// Lines: 499569-499588
//
var XY9 = U((P57)=>{
    var j57 = SO0(), T57 = NO0();
    P57.process = function(A, Q) {
        let B = [], G = new j57(A);
        return (new T57(Q, {
            read: G.read.bind(G),
            write: function(Y) {
                B.push(Y);
            },
            complete: function() {}
        }).start(), G.process(), Buffer.concat(B));
    };
});
