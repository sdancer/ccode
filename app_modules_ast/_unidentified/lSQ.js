// Module: lSQ
// Type: U
// Lines: 116321-116347
//
var lSQ = U((Ro7, pSQ)=>{
    var kn6 = WUA(), fn6 = SnA();
    class cSQ extends kn6 {
        #A = null;
        #Q = null;
        constructor(A, Q = {}){
            super(Q);
            ((this.#A = A), (this.#Q = Q));
        }
        dispatch(A, Q) {
            let B = new fn6({
                ...A,
                retryOptions: this.#Q
            }, {
                dispatch: this.#A.dispatch.bind(this.#A),
                handler: Q
            });
            return this.#A.dispatch(A, B);
        }
        close() {
            return this.#A.close();
        }
        destroy() {
            return this.#A.destroy();
        }
    }
    pSQ.exports = cSQ;
});
