// Module: k31
// Type: U
// Lines: 312562-312596
//
var k31 = U((WYZ, E12)=>{
    var bS3 = Ck();
    class F12 extends bS3 {
        constructor(A, Q){
            super(A);
            ((this.posTracker = null), (this.onParseError = Q.onParseError));
        }
        _setErrorLocation(A) {
            ((A.startLine = A.endLine = this.posTracker.line), (A.startCol = A.endCol = this.posTracker.col), (A.startOffset = A.endOffset = this.posTracker.offset));
        }
        _reportError(A) {
            let Q = {
                code: A,
                startLine: -1,
                startCol: -1,
                startOffset: -1,
                endLine: -1,
                endCol: -1,
                endOffset: -1
            };
            (this._setErrorLocation(Q), this.onParseError(Q));
        }
        _getOverriddenMethods(A) {
            return {
                _err (Q) {
                    A._reportError(Q);
                }
            };
        }
    }
    E12.exports = F12;
});
