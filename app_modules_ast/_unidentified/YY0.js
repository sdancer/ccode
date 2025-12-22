// Module: YY0
// Type: U
// Lines: 328375-328393
//
var YY0 = U((b82)=>{
    var gw = b82;
    gw.build = "minimal";
    gw.Writer = a51();
    gw.BufferWriter = N82();
    gw.Reader = escapeTextForBrowser();
    gw.BufferReader = read_string_buffer();
    gw.util = toNumber();
    gw.rpc = GY0();
    gw.roots = ZY0();
    gw.configure = f82;
    function f82() {
        (gw.util._configure(), gw.Writer._configure(gw.BufferWriter), gw.Reader._configure(gw.BufferReader));
    }
    f82();
});
