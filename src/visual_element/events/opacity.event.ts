import VisualElement from "../visual_element.class.js";
import Events from "./event.js";

const OpacityEvents : Events = {
    // changeOpacity(element : VisualElement, new_opacity : number, funcs? : string[], parameters? : any[][]) {
    //     element.properties.opacity = new_opacity;
    //     element.ctx.globalAlpha = new_opacity;
    //     if(funcs) for(let i = 0; i < funcs!.length; i++) element[funcs![i]](...parameters![i]);
    // },
    // linearChangeOpacity(element : VisualElement, start_frame : number, duration : number, new_opacity : number) {
    //     VisualElement.linearChangeEvent(element, start_frame, duration, {"opacity" : [element.properties, new_opacity, "changeOpacity"]})
    // },
}

export default OpacityEvents;
