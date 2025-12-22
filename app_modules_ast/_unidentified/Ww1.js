// Module: Ww1
// Type: U
// Lines: 50467-50476
//
var renderElement = U((Qx7, rt0)=>{
    rt0.exports = JA4;
    function JA4(A) {
        (Object.keys(A.jobs).forEach(XA4.bind(A)), (A.jobs = {}));
    }
    function XA4(A) {
        if (typeof this.jobs[A] == "function") this.jobs[A]();
    }
});
