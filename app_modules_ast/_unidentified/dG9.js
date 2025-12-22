// Module: dG9
// Type: U
// Lines: 497215-497243
//
var dG9 = U((I87)=>{
    var X87 = Rs().getSymbolSize;
    I87.getRowColCoords = function(Q) {
        if (Q === 1) return [];
        let B = Math.floor(Q / 7) + 2, G = X87(Q), Z = G === 145 ? 26 : Math.ceil((G - 13) / (2 * B - 2)) * 2, Y = [
            G - 7
        ];
        for(let J = 1; J < B - 1; J++)Y[J] = Y[J - 1] - Z;
        return (Y.push(6), Y.reverse());
    };
    I87.getPositions = function(Q) {
        let B = [], G = I87.getRowColCoords(Q), Z = G.length;
        for(let Y = 0; Y < Z; Y++)for(let J = 0; J < Z; J++){
            if ((Y === 0 && J === 0) || (Y === 0 && J === Z - 1) || (Y === Z - 1 && J === 0)) continue;
            B.push([
                G[Y],
                G[J]
            ]);
        }
        return B;
    };
});
