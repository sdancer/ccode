// Module: dwB
// Type: L
// Lines: 223976-224001
//
var dwB = L(()=>{
    X01();
    WOA();
    Pr1();
    createRenderState();
    HOA();
    hn8 = {};
    Sr1 = class Sr1 extends bn8 {
        _transform(A, Q, B) {
            (this.push(A), (this.loadedBytes += A.length));
            try {
                (this.progressCallback({
                    loadedBytes: this.loadedBytes
                }), B());
            } catch (G) {
                B(G);
            }
        }
        constructor(A){
            super();
            ((this.loadedBytes = 0), (this.progressCallback = A));
        }
    };
});
function yr1() {
    return mwB();
}
