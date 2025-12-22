// Module: sHB
// Type: L
// Lines: 200537-200547
//
var sHB = L(()=>{
    A11();
});
var B11 = (A)=>{
    if (typeof globalThis.process < "u") return globalThis.process.env?.[A]?.trim() ?? void 0;
    if (typeof globalThis.Deno < "u") return globalThis.Deno.env?.get?.(A)?.trim();
    return;
};
