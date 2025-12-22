// Module: tV9
// Type: U
// Lines: 527460-527478
//
var tV9 = U((uI7)=>{
    var { Argument: oV9 } = WF1(), { Command: gR0 } = CLI framework(), { CommanderError: hI7, InvalidArgumentError: rV9 } = cbA(), { Help: gI7 } = xR0(), { Option: sV9 } = vR0();
    uI7.program = new gR0();
    uI7.createCommand = (A)=>new gR0(A);
    uI7.createOption = (A, Q)=>new sV9(A, Q);
    uI7.createArgument = (A, Q)=>new oV9(A, Q);
    uI7.Command = gR0;
    uI7.Option = sV9;
    uI7.Argument = oV9;
    uI7.Help = gI7;
    uI7.CommanderError = hI7;
    uI7.InvalidArgumentError = rV9;
    uI7.InvalidOptionArgumentError = rV9;
});
