// Module: $92
// Type: U
// Lines: 325218-325251
//
var $92 = U((z92)=>{
    Object.defineProperty(z92, "__esModule", {
        value: !0
    });
    z92.ViewRegistry = void 0;
    class E92 {
        _registeredViews = [];
        addView(A) {
            this._registeredViews.push(A);
        }
        findViews(A, Q) {
            return this._registeredViews.filter((G)=>{
                return (this._matchInstrument(G.instrumentSelector, A) && this._matchMeter(G.meterSelector, Q));
            });
        }
        _matchInstrument(A, Q) {
            return ((A.getType() === void 0 || Q.type === A.getType()) && A.getNameFilter().match(Q.name) && A.getUnitFilter().match(Q.unit));
        }
        _matchMeter(A, Q) {
            return (A.getNameFilter().match(Q.name) && (Q.version === void 0 || A.getVersionFilter().match(Q.version)) && (Q.schemaUrl === void 0 || A.getSchemaUrlFilter().match(Q.schemaUrl)));
        }
    }
    z92.ViewRegistry = E92;
});
