// Module: vQ9
// Type: L
// Lines: 473362-473389
//
var vQ9 = L(()=>{
    ((wB7 = {
        full: "EEEE, MMMM do, y",
        long: "MMMM do, y",
        medium: "MMM d, y",
        short: "MM/dd/yyyy"
    }), (qB7 = {
        full: "h:mm:ss a zzzz",
        long: "h:mm:ss a z",
        medium: "h:mm:ss a",
        short: "h:mm a"
    }), (NB7 = {
        full: "{{date}} 'at' {{time}}",
        long: "{{date}} 'at' {{time}}",
        medium: "{{date}}, {{time}}",
        short: "{{date}}, {{time}}"
    }), (xQ9 = {
        date: QH1({
            formats: wB7,
            defaultWidth: "full"
        }),
        time: QH1({
            formats: qB7,
            defaultWidth: "full"
        }),
        dateTime: QH1({
            formats: NB7,
            defaultWidth: "full"
        })
    }));
});
var LB7, kQ9 = (A, Q, B, G)=>LB7[A];
