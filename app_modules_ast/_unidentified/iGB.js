// Module: iGB
// Type: L
// Lines: 183669-183721
//
var iGB = L(()=>{
    CYA();
    mGB = l(VdA(), 1);
    dGB = `_${Math.random().toString(36).slice(2, 11)}_SBX`;
});
class TNA {
    constructor(){
        ((this.violations = []), (this.totalCount = 0), (this.maxSize = 100), (this.listeners = new Set()));
    }
    addViolation(A) {
        if ((this.violations.push(A), this.totalCount++, this.violations.length > this.maxSize)) this.violations = this.violations.slice(-this.maxSize);
        this.notifyListeners();
    }
    getViolations(A) {
        if (A === void 0) return [
            ...this.violations
        ];
        return this.violations.slice(-A);
    }
    getCount() {
        return this.violations.length;
    }
    getTotalCount() {
        return this.totalCount;
    }
    getViolationsForCommand(A) {
        let Q = etA(A);
        return this.violations.filter((B)=>B.encodedCommand === Q);
    }
    clear() {
        ((this.violations = []), this.notifyListeners());
    }
    subscribe(A) {
        return (this.listeners.add(A), A(this.getViolations()), ()=>{
            this.listeners.delete(A);
        });
    }
    notifyListeners() {
        let A = this.getViolations();
        this.listeners.forEach((Q)=>Q(A));
    }
}
