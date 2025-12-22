// Module: hQ9
// Type: L
// Lines: 473437-473616
//
var hQ9 = L(()=>{
    ((OB7 = {
        narrow: [
            "B",
            "A"
        ],
        abbreviated: [
            "BC",
            "AD"
        ],
        wide: [
            "Before Christ",
            "Anno Domini"
        ]
    }), (MB7 = {
        narrow: [
            "1",
            "2",
            "3",
            "4"
        ],
        abbreviated: [
            "Q1",
            "Q2",
            "Q3",
            "Q4"
        ],
        wide: [
            "1st quarter",
            "2nd quarter",
            "3rd quarter",
            "4th quarter"
        ]
    }), (RB7 = {
        narrow: [
            "J",
            "F",
            "M",
            "A",
            "M",
            "J",
            "J",
            "A",
            "S",
            "O",
            "N",
            "D"
        ],
        abbreviated: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
    }), (_B7 = {
        narrow: [
            "S",
            "M",
            "T",
            "W",
            "T",
            "F",
            "S"
        ],
        short: [
            "Su",
            "Mo",
            "Tu",
            "We",
            "Th",
            "Fr",
            "Sa"
        ],
        abbreviated: [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ],
        wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ]
    }), (jB7 = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        },
        wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        }
    }), (TB7 = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        },
        wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        }
    }), (bQ9 = {
        ordinalNumber: PB7,
        era: hDA({
            values: OB7,
            defaultWidth: "wide"
        }),
        quarter: hDA({
            values: MB7,
            defaultWidth: "wide",
            argumentCallback: (A)=>A - 1
        }),
        month: hDA({
            values: RB7,
            defaultWidth: "wide"
        }),
        day: hDA({
            values: _B7,
            defaultWidth: "wide"
        }),
        dayPeriod: hDA({
            values: jB7,
            defaultWidth: "wide",
            formattingValues: TB7,
            defaultFormattingWidth: "wide"
        })
    }));
});
function gDA(A) {
    return (Q, B = {})=>{
        let G = B.width, Z = (G && A.matchPatterns[G]) || A.matchPatterns[A.defaultMatchWidth], Y = Q.match(Z);
        if (!Y) return null;
        let J = Y[0], X = (G && A.parsePatterns[G]) || A.parsePatterns[A.defaultParseWidth], I = Array.isArray(X) ? yB7(X, (V)=>V.test(J)) : SB7(X, (V)=>V.test(J)), W;
        ((W = A.valueCallback ? A.valueCallback(I) : I), (W = B.valueCallback ? B.valueCallback(W) : W));
        let K = Q.slice(J.length);
        return {
            value: W,
            rest: K
        };
    };
}
function SB7(A, Q) {
    for(let B in A)if (Object.prototype.hasOwnProperty.call(A, B) && Q(A[B])) return B;
    return;
}
function yB7(A, Q) {
    for(let B = 0; B < A.length; B++)if (Q(A[B])) return B;
    return;
}
function gQ9(A) {
    return (Q, B = {})=>{
        let G = Q.match(A.matchPattern);
        if (!G) return null;
        let Z = G[0], Y = Q.match(A.parsePattern);
        if (!Y) return null;
        let J = A.valueCallback ? A.valueCallback(Y[0]) : Y[0];
        J = B.valueCallback ? B.valueCallback(J) : J;
        let X = Q.slice(Z.length);
        return {
            value: J,
            rest: X
        };
    };
}
var xB7, vB7, kB7, fB7, bB7, hB7, gB7, uB7, mB7, dB7, cB7, pB7, uQ9;
