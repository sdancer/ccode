// Module: tEA
// Type: L
// Lines: 16427-16445
//
var tEA = L(()=>{
    ({ toString: Uc0 } = Object.prototype);
    GU1 = class GU1 extends Error {
        name = "MaxBufferError";
        constructor(){
            super("maxBuffer exceeded");
        }
    };
});
var ZU1 = (A)=>A, YU1 = ()=>{
    return;
}, JU1 = ({ contents: A })=>A, OuA = (A)=>{
    throw Error(`Streams in object mode are not supported: ${String(A)}`);
}, MuA = (A)=>A.length;
