// Module: qi1
// Type: L
// Lines: 192944-192987
//
var qi1 = L(()=>{
    renderElement();
    tM();
    Wi1();
    createRenderState();
    ai();
    NLA = class NLA extends bX {
        create(A, Q) {
            return this._client.post("/v1/messages/batches", {
                body: A,
                ...Q
            });
        }
        retrieve(A, Q) {
            return this._client.get(QX`/v1/messages/batches/${A}`, Q);
        }
        list(A = {}, Q) {
            return this._client.getAPIList("/v1/messages/batches", RT, {
                query: A,
                ...Q
            });
        }
        delete(A, Q) {
            return this._client.delete(QX`/v1/messages/batches/${A}`, Q);
        }
        cancel(A, Q) {
            return this._client.post(QX`/v1/messages/batches/${A}/cancel`, Q);
        }
        async results(A, Q) {
            let B = await this.retrieve(A);
            if (!B.results_url) throw new F2(`No batch \`results_url\`; Has it finished processing? ${B.processing_status} - ${B.id}`);
            return this._client.get(B.results_url, {
                ...Q,
                headers: y6([
                    {
                        Accept: "application/binary"
                    },
                    Q?.headers
                ]),
                stream: !0,
                __binaryResponse: !0
            })._thenUnwrap((G, Z)=>pYA.fromResponse(Z.response, Z.controller));
        }
    };
});
var lN, qJB;
