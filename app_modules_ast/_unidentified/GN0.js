// Module: GN0
// Type: L
// Lines: 473301-473329
//
var createRenderState = L(()=>{
    ZO();
});
var $Q9 = ()=>{};
var UQ9 = ()=>{};
var wQ9 = ()=>{};
var qQ9 = ()=>{};
var NQ9 = ()=>{};
var LQ9 = ()=>{};
var OQ9 = ()=>{};
var MQ9 = ()=>{};
var RQ9 = ()=>{};
var _Q9 = ()=>{};
var jQ9 = ()=>{};
var TQ9 = ()=>{};
var PQ9 = ()=>{};
var UB7, SQ9 = (A, Q, B)=>{
    let G, Z = UB7[A];
    if (typeof Z === "string") G = Z;
    else if (Q === 1) G = Z.one;
    else G = Z.other.replace("{{count}}", Q.toString());
    if (B?.addSuffix) if (B.comparison && B.comparison > 0) return "in " + G;
    else return G + " ago";
    return G;
};
