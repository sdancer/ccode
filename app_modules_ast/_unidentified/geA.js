// Module: geA
// Type: L
// Lines: 191242-191287
//
var geA = L(()=>{
    jg();
    sl1();
    K0A = class K0A extends Promise {
        constructor(A, Q, B = heA){
            super((G)=>{
                G(null);
            });
            ((this.responsePromise = Q), (this.parseResponse = B), JLA.set(this, void 0), C2(this, JLA, A, "f"));
        }
        _thenUnwrap(A) {
            return new K0A(d0(this, JLA, "f"), this.responsePromise, async (Q, B)=>rl1(A(await this.parseResponse(Q, B), B), B.response));
        }
        asResponse() {
            return this.responsePromise.then((A)=>A.response);
        }
        async withResponse() {
            let [A, Q] = await Promise.all([
                this.parse(),
                this.asResponse()
            ]);
            return {
                data: A,
                response: Q,
                request_id: Q.headers.get("request-id")
            };
        }
        parse() {
            if (!this.parsedPromise) this.parsedPromise = this.responsePromise.then((A)=>this.parseResponse(d0(this, JLA, "f"), A));
            return this.parsedPromise;
        }
        then(A, Q) {
            return this.parse().then(A, Q);
        }
        catch(A) {
            return this.parse().catch(A);
        }
        finally(A) {
            return this.parse().finally(A);
        }
    };
    JLA = new WeakMap();
});
var ueA, tl1, meA, RT, XLA;
