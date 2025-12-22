// Module: OAB
// Type: U
// Lines: 132793-132825
//
var OAB = U((NAB)=>{
    Object.defineProperty(NAB, "__esModule", {
        value: !0
    });
    NAB.ConsoleLogRecordExporter = void 0;
    var wAB = c3();
    class qAB {
        export(A, Q) {
            this._sendLogRecords(A, Q);
        }
        shutdown() {
            return Promise.resolve();
        }
        _exportInfo(A) {
            return {
                resource: {
                    attributes: A.resource.attributes
                },
                instrumentationScope: A.instrumentationScope,
                timestamp: (0, wAB.hrTimeToMicroseconds)(A.hrTime),
                traceId: A.spanContext?.traceId,
                spanId: A.spanContext?.spanId,
                traceFlags: A.spanContext?.traceFlags,
                severityText: A.severityText,
                severityNumber: A.severityNumber,
                body: A.body,
                attributes: A.attributes
            };
        }
        _sendLogRecords(A, Q) {
            for (let B of A)console.dir(this._exportInfo(B), {
                depth: 3
            });
            Q?.({
                code: wAB.ExportResultCode.SUCCESS
            });
        }
    }
    NAB.ConsoleLogRecordExporter = qAB;
});
