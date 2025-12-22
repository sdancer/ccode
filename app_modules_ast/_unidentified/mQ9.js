// Module: mQ9
// Type: L
// Lines: 473616-473732
//
var mQ9 = L(()=>{
    ((xB7 = /^(\d+)(th|st|nd|rd)?/i), (vB7 = /\d+/i), (kB7 = {
        narrow: /^(b|a)/i,
        abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
        wide: /^(before christ|before common era|anno domini|common era)/i
    }), (fB7 = {
        any: [
            /^b/i,
            /^(a|c)/i
        ]
    }), (bB7 = {
        narrow: /^[1234]/i,
        abbreviated: /^q[1234]/i,
        wide: /^[1234](th|st|nd|rd)? quarter/i
    }), (hB7 = {
        any: [
            /1/i,
            /2/i,
            /3/i,
            /4/i
        ]
    }), (gB7 = {
        narrow: /^[jfmasond]/i,
        abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
        wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
    }), (uB7 = {
        narrow: [
            /^j/i,
            /^f/i,
            /^m/i,
            /^a/i,
            /^m/i,
            /^j/i,
            /^j/i,
            /^a/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i
        ],
        any: [
            /^ja/i,
            /^f/i,
            /^mar/i,
            /^ap/i,
            /^may/i,
            /^jun/i,
            /^jul/i,
            /^au/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i
        ]
    }), (mB7 = {
        narrow: /^[smtwf]/i,
        short: /^(su|mo|tu|we|th|fr|sa)/i,
        abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
        wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
    }), (dB7 = {
        narrow: [
            /^s/i,
            /^m/i,
            /^t/i,
            /^w/i,
            /^t/i,
            /^f/i,
            /^s/i
        ],
        any: [
            /^su/i,
            /^m/i,
            /^tu/i,
            /^w/i,
            /^th/i,
            /^f/i,
            /^sa/i
        ]
    }), (cB7 = {
        narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
        any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
    }), (pB7 = {
        any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i
        }
    }), (uQ9 = {
        ordinalNumber: gQ9({
            matchPattern: xB7,
            parsePattern: vB7,
            valueCallback: (A)=>parseInt(A, 10)
        }),
        era: gDA({
            matchPatterns: kB7,
            defaultMatchWidth: "wide",
            parsePatterns: fB7,
            defaultParseWidth: "any"
        }),
        quarter: gDA({
            matchPatterns: bB7,
            defaultMatchWidth: "wide",
            parsePatterns: hB7,
            defaultParseWidth: "any",
            valueCallback: (A)=>A + 1
        }),
        month: gDA({
            matchPatterns: gB7,
            defaultMatchWidth: "wide",
            parsePatterns: uB7,
            defaultParseWidth: "any"
        }),
        day: gDA({
            matchPatterns: mB7,
            defaultMatchWidth: "wide",
            parsePatterns: dB7,
            defaultParseWidth: "any"
        }),
        dayPeriod: gDA({
            matchPatterns: cB7,
            defaultMatchWidth: "any",
            parsePatterns: pB7,
            defaultParseWidth: "any"
        })
    }));
});
var ZN0;
