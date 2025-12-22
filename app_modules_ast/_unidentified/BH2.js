// Module: BH2
// Type: U
// Lines: 363202-363241
//
var BH2 = U((AH2)=>{
    Object.defineProperty(AH2, "__esModule", {
        value: !0
    });
    AH2.ConsoleSpanExporter = void 0;
    var SI0 = c3();
    class eV2 {
        export(A, Q) {
            return this._sendSpans(A, Q);
        }
        shutdown() {
            return (this._sendSpans([]), this.forceFlush());
        }
        forceFlush() {
            return Promise.resolve();
        }
        _exportInfo(A) {
            return {
                resource: {
                    attributes: A.resource.attributes
                },
                instrumentationScope: A.instrumentationScope,
                traceId: A.spanContext().traceId,
                parentSpanContext: A.parentSpanContext,
                traceState: A.spanContext().traceState?.serialize(),
                name: A.name,
                id: A.spanContext().spanId,
                kind: A.kind,
                timestamp: (0, SI0.hrTimeToMicroseconds)(A.startTime),
                duration: (0, SI0.hrTimeToMicroseconds)(A.duration),
                attributes: A.attributes,
                status: A.status,
                events: A.events,
                links: A.links
            };
        }
        _sendSpans(A, Q) {
            for (let B of A)console.dir(this._exportInfo(B), {
                depth: 3
            });
            if (Q) return Q({
                code: SI0.ExportResultCode.SUCCESS
            });
        }
    }
    AH2.ConsoleSpanExporter = eV2;
});
