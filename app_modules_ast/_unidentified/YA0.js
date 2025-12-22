// Module: YA0
// Type: L
// Lines: 240310-240333
//
var YA0 = L(()=>{
    YTB();
});
import XTB from "node:process";
import zB3 from "node:os";
import CB3 from "node:fs";
var JTB = ()=>{
    if (XTB.platform !== "linux") return !1;
    if (zB3.release().toLowerCase().includes("microsoft")) {
        if ($XA()) return !1;
        return !0;
    }
    try {
        return CB3.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft") ? !$XA() : !1;
    } catch  {
        return !1;
    }
}, cn;
