import VisualElement from "../visual_element.class.js";
import Events from "./event.js";

const LineEvents : Events = {
    // changeLineWidth(element : VisualElement, new_line_width : number, funcs? : string[], parameters? : any[][]) {
    //     element.properties.line_width = new_line_width;
    //     element.ctx.lineWidth = element.properties.line_width;
    //     if(funcs) for(let i = 0; i < funcs!.length; i++) element[funcs![i]](...parameters![i]);
    // },
    // linearChangeLineWidth(element : VisualElement, start_frame : number, duration : number, new_line_width : number) {
    //     VisualElement.linearChangeEvent(element, start_frame, duration, {"line_width" : [element.properties, new_line_width, "changeLineWidth"]})
    // },
}

export default LineEvents;
