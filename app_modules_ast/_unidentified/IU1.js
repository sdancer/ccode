// Module: IU1
// Type: L
// Lines: 16476-16507
//
var IU1 = L(()=>{
    tEA();
    ((yp9 = new TextEncoder()), (hp9 = {
        init: Pp9,
        convertChunk: {
            string: Sp9,
            buffer: Nc0,
            arrayBuffer: Nc0,
            dataView: Lc0,
            typedArray: Lc0,
            others: OuA
        },
        getSize: MuA,
        truncateChunk: xp9,
        addChunk: vp9,
        getFinalChunk: YU1,
        finalize: bp9
    }));
});
async function RuA(A, Q) {
    if (!("Buffer" in globalThis)) throw Error("getStreamAsBuffer() is only supported in Node.js");
    try {
        return _c0(await XU1(A, Q));
    } catch (B) {
        if (B.bufferedData !== void 0) B.bufferedData = _c0(B.bufferedData);
        throw B;
    }
}
var _c0 = (A)=>globalThis.Buffer.from(A);
