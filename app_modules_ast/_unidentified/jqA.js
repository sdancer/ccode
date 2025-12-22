// Module: jqA
// Type: L
// Lines: 150889-151028
//
var createRenderState = L(()=>{
    createRenderState();
    lBB();
    frA();
    Xd1();
    n2();
    preload();
    ((w2B = Y0(async ()=>{
        Dd1 = await bBB();
    })), (mrA = new Map()));
});
var hE8 = (A, Q)=>{
    if ("position" in Q) A.setPositionType(Q.position === "absolute" ? qZA.Absolute : qZA.Relative);
}, gE8 = (A, Q)=>{
    if ("margin" in Q) A.setMargin(j3.All, Q.margin ?? 0);
    if ("marginX" in Q) A.setMargin(j3.Horizontal, Q.marginX ?? 0);
    if ("marginY" in Q) A.setMargin(j3.Vertical, Q.marginY ?? 0);
    if ("marginLeft" in Q) A.setMargin(j3.Start, Q.marginLeft || 0);
    if ("marginRight" in Q) A.setMargin(j3.End, Q.marginRight || 0);
    if ("marginTop" in Q) A.setMargin(j3.Top, Q.marginTop || 0);
    if ("marginBottom" in Q) A.setMargin(j3.Bottom, Q.marginBottom || 0);
}, uE8 = (A, Q)=>{
    if ("padding" in Q) A.setPadding(j3.All, Q.padding ?? 0);
    if ("paddingX" in Q) A.setPadding(j3.Horizontal, Q.paddingX ?? 0);
    if ("paddingY" in Q) A.setPadding(j3.Vertical, Q.paddingY ?? 0);
    if ("paddingLeft" in Q) A.setPadding(j3.Left, Q.paddingLeft || 0);
    if ("paddingRight" in Q) A.setPadding(j3.Right, Q.paddingRight || 0);
    if ("paddingTop" in Q) A.setPadding(j3.Top, Q.paddingTop || 0);
    if ("paddingBottom" in Q) A.setPadding(j3.Bottom, Q.paddingBottom || 0);
}, mE8 = (A, Q)=>{
    if ("flexGrow" in Q) A.setFlexGrow(Q.flexGrow ?? 0);
    if ("flexShrink" in Q) A.setFlexShrink(typeof Q.flexShrink === "number" ? Q.flexShrink : 1);
    if ("flexWrap" in Q) {
        if (Q.flexWrap === "nowrap") A.setFlexWrap(w1A.NoWrap);
        if (Q.flexWrap === "wrap") A.setFlexWrap(w1A.Wrap);
        if (Q.flexWrap === "wrap-reverse") A.setFlexWrap(w1A.WrapReverse);
    }
    if ("flexDirection" in Q) {
        if (Q.flexDirection === "row") A.setFlexDirection(Jg.Row);
        if (Q.flexDirection === "row-reverse") A.setFlexDirection(Jg.RowReverse);
        if (Q.flexDirection === "column") A.setFlexDirection(Jg.Column);
        if (Q.flexDirection === "column-reverse") A.setFlexDirection(Jg.ColumnReverse);
    }
    if ("flexBasis" in Q) if (typeof Q.flexBasis === "number") A.setFlexBasis(Q.flexBasis);
    else if (typeof Q.flexBasis === "string") A.setFlexBasisPercent(Number.parseInt(Q.flexBasis, 10));
    else A.setFlexBasis(Number.NaN);
    if ("alignItems" in Q) {
        if (Q.alignItems === "stretch" || !Q.alignItems) A.setAlignItems(PH.Stretch);
        if (Q.alignItems === "flex-start") A.setAlignItems(PH.FlexStart);
        if (Q.alignItems === "center") A.setAlignItems(PH.Center);
        if (Q.alignItems === "flex-end") A.setAlignItems(PH.FlexEnd);
    }
    if ("alignSelf" in Q) {
        if (Q.alignSelf === "auto" || !Q.alignSelf) A.setAlignSelf(PH.Auto);
        if (Q.alignSelf === "flex-start") A.setAlignSelf(PH.FlexStart);
        if (Q.alignSelf === "center") A.setAlignSelf(PH.Center);
        if (Q.alignSelf === "flex-end") A.setAlignSelf(PH.FlexEnd);
    }
    if ("justifyContent" in Q) {
        if (Q.justifyContent === "flex-start" || !Q.justifyContent) A.setJustifyContent(TN.FlexStart);
        if (Q.justifyContent === "center") A.setJustifyContent(TN.Center);
        if (Q.justifyContent === "flex-end") A.setJustifyContent(TN.FlexEnd);
        if (Q.justifyContent === "space-between") A.setJustifyContent(TN.SpaceBetween);
        if (Q.justifyContent === "space-around") A.setJustifyContent(TN.SpaceAround);
        if (Q.justifyContent === "space-evenly") A.setJustifyContent(TN.SpaceEvenly);
    }
}, dE8 = (A, Q)=>{
    if ("width" in Q) if (typeof Q.width === "number") A.setWidth(Q.width);
    else if (typeof Q.width === "string") A.setWidthPercent(Number.parseInt(Q.width, 10));
    else A.setWidthAuto();
    if ("height" in Q) if (typeof Q.height === "number") A.setHeight(Q.height);
    else if (typeof Q.height === "string") A.setHeightPercent(Number.parseInt(Q.height, 10));
    else A.setHeightAuto();
    if ("minWidth" in Q) if (typeof Q.minWidth === "string") A.setMinWidthPercent(Number.parseInt(Q.minWidth, 10));
    else A.setMinWidth(Q.minWidth ?? 0);
    if ("minHeight" in Q) if (typeof Q.minHeight === "string") A.setMinHeightPercent(Number.parseInt(Q.minHeight, 10));
    else A.setMinHeight(Q.minHeight ?? 0);
    if ("maxWidth" in Q) if (typeof Q.maxWidth === "string") A.setMaxWidthPercent(Number.parseInt(Q.maxWidth, 10));
    else A.setMaxWidth(Q.maxWidth ?? 0);
    if ("maxHeight" in Q) if (typeof Q.maxHeight === "string") A.setMaxHeightPercent(Number.parseInt(Q.maxHeight, 10));
    else A.setMaxHeight(Q.maxHeight ?? 0);
}, cE8 = (A, Q)=>{
    if ("display" in Q) A.setDisplay(Q.display === "flex" ? YT.Flex : YT.None);
}, pE8 = (A, Q)=>{
    if ("borderStyle" in Q) {
        let B = Q.borderStyle ? 1 : 0;
        if (Q.borderTop !== !1) A.setBorder(j3.Top, B);
        if (Q.borderBottom !== !1) A.setBorder(j3.Bottom, B);
        if (Q.borderLeft !== !1) A.setBorder(j3.Left, B);
        if (Q.borderRight !== !1) A.setBorder(j3.Right, B);
    }
}, lE8 = (A, Q)=>{
    if ("gap" in Q) A.setGap(U1A.All, Q.gap ?? 0);
    if ("columnGap" in Q) A.setGap(U1A.Column, Q.columnGap ?? 0);
    if ("rowGap" in Q) A.setGap(U1A.Row, Q.rowGap ?? 0);
}, iE8 = (A, Q = {})=>{
    (hE8(A, Q), gE8(A, Q), uE8(A, Q), mE8(A, Q), dE8(A, Q), cE8(A, Q), pE8(A, Q), lE8(A, Q));
}, $d1;
