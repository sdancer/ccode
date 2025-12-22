// Module: rx0
// Type: U
// Lines: 5824-5834
//
var rx0 = U((nx0)=>{
    Object.defineProperty(nx0, "__esModule", {
        value: !0
    });
    nx0.animationFrame = nx0.animationFrameScheduler = void 0;
    var pO9 = renderElement(), lO9 = renderElement();
    nx0.animationFrameScheduler = new lO9.AnimationFrameScheduler(pO9.AnimationFrameAction);
    nx0.animationFrame = nx0.animationFrameScheduler;
});
