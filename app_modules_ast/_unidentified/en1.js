// Module: en1
// Type: U
// Lines: 210772-210792
//
var en1 = U((RUG, mDB)=>{
    function tn1(A) {
        return A >= 48 && A <= 57;
    }
    function uDB(A) {
        return (A >= 65 && A <= 90) || (A >= 97 && A <= 122);
    }
    function ch8(A) {
        return uDB(A) || tn1(A);
    }
    function ph8(A) {
        return tn1(A) || (A >= 65 && A <= 70) || (A >= 97 && A <= 102);
    }
    mDB.exports = {
        isASCIIDigit: tn1,
        isASCIIAlpha: uDB,
        isASCIIAlphanumeric: ch8,
        isASCIIHex: ph8
    };
});
