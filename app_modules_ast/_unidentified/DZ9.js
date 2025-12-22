// Module: DZ9
// Type: U
// Lines: 497697-497768
//
var DZ9 = U((A0J, HZ9)=>{
    var X37 = js(), WO0 = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        " ",
        "$",
        "%",
        "*",
        "+",
        "-",
        ".",
        "/",
        ":"
    ];
    function ZFA(A) {
        ((this.mode = X37.ALPHANUMERIC), (this.data = A));
    }
    ZFA.getBitsLength = function(Q) {
        return 11 * Math.floor(Q / 2) + 6 * (Q % 2);
    };
    ZFA.prototype.getLength = function() {
        return this.data.length;
    };
    ZFA.prototype.getBitsLength = function() {
        return ZFA.getBitsLength(this.data.length);
    };
    ZFA.prototype.write = function(Q) {
        let B;
        for(B = 0; B + 2 <= this.data.length; B += 2){
            let G = WO0.indexOf(this.data[B]) * 45;
            ((G += WO0.indexOf(this.data[B + 1])), Q.put(G, 11));
        }
        if (this.data.length % 2) Q.put(WO0.indexOf(this.data[B]), 6);
    };
    HZ9.exports = ZFA;
});
