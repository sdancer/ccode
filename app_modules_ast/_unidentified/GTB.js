// Module: GTB
// Type: L
// Lines: 240219-240310
//
var byteLengthOfChunk = L(()=>{
    (function(A) {
        ((A.AutoDiscoverRegion = "AutoDiscoverRegion"), (A.USWest = "westus"), (A.USWest2 = "westus2"), (A.USCentral = "centralus"), (A.USEast = "eastus"), (A.USEast2 = "eastus2"), (A.USNorthCentral = "northcentralus"), (A.USSouthCentral = "southcentralus"), (A.USWestCentral = "westcentralus"), (A.CanadaCentral = "canadacentral"), (A.CanadaEast = "canadaeast"), (A.BrazilSouth = "brazilsouth"), (A.EuropeNorth = "northeurope"), (A.EuropeWest = "westeurope"), (A.UKSouth = "uksouth"), (A.UKWest = "ukwest"), (A.FranceCentral = "francecentral"), (A.FranceSouth = "francesouth"), (A.SwitzerlandNorth = "switzerlandnorth"), (A.SwitzerlandWest = "switzerlandwest"), (A.GermanyNorth = "germanynorth"), (A.GermanyWestCentral = "germanywestcentral"), (A.NorwayWest = "norwaywest"), (A.NorwayEast = "norwayeast"), (A.AsiaEast = "eastasia"), (A.AsiaSouthEast = "southeastasia"), (A.JapanEast = "japaneast"), (A.JapanWest = "japanwest"), (A.AustraliaEast = "australiaeast"), (A.AustraliaSouthEast = "australiasoutheast"), (A.AustraliaCentral = "australiacentral"), (A.AustraliaCentral2 = "australiacentral2"), (A.IndiaCentral = "centralindia"), (A.IndiaSouth = "southindia"), (A.IndiaWest = "westindia"), (A.KoreaSouth = "koreasouth"), (A.KoreaCentral = "koreacentral"), (A.UAECentral = "uaecentral"), (A.UAENorth = "uaenorth"), (A.SouthAfricaNorth = "southafricanorth"), (A.SouthAfricaWest = "southafricawest"), (A.ChinaNorth = "chinanorth"), (A.ChinaEast = "chinaeast"), (A.ChinaNorth2 = "chinanorth2"), (A.ChinaEast2 = "chinaeast2"), (A.GermanyCentral = "germanycentral"), (A.GermanyNorthEast = "germanynortheast"), (A.GovernmentUSVirginia = "usgovvirginia"), (A.GovernmentUSIowa = "usgoviowa"), (A.GovernmentUSArizona = "usgovarizona"), (A.GovernmentUSTexas = "usgovtexas"), (A.GovernmentUSDodEast = "usdodeast"), (A.GovernmentUSDodCentral = "usdodcentral"));
    })(QA0 || (QA0 = {}));
});
import ZTB from "node:fs";
function HB3() {
    try {
        return (ZTB.statSync("/.dockerenv"), !0);
    } catch  {
        return !1;
    }
}
function DB3() {
    try {
        return ZTB.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
    } catch  {
        return !1;
    }
}
function GA0() {
    if (BA0 === void 0) BA0 = HB3() || DB3();
    return BA0;
}
var BA0;
var YTB = ()=>{};
import FB3 from "node:fs";
function $XA() {
    if (ZA0 === void 0) ZA0 = EB3() || GA0();
    return ZA0;
}
var ZA0, EB3 = ()=>{
    try {
        return (FB3.statSync("/run/.containerenv"), !0);
    } catch  {
        return !1;
    }
};
