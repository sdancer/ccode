// Module: tf2
// Type: U
// Lines: 433784-433793
//
var tf2 = U((sf2)=>{
    Object.defineProperty(sf2, "__esModule", {
        value: !0
    });
    var IP5 = iI1();
    function WP5(A, Q, B) {
        let G = IP5.getActiveTransaction();
        if (G) G.setMeasurement(A, Q, B);
    }
    sf2.setMeasurement = WP5;
});
