import VisualElement from "../visual_element.class.js";
import Events from "./event.js";

const RenderEvents : Events = {
    changeWidth(element : VisualElement, new_width : number, funcs? : string[], parameters? : any[][]) {
        element.properties.width = new_width;
        if(funcs) for(let i = 0; i < funcs!.length; i++) element[funcs![i]](...parameters![i]);
        element.draw();
    },
    changeHeight(element : VisualElement, new_height : number, funcs? : string[], parameters? : any[][]) {
        element.properties.height = new_height;
        if(funcs) for(let i = 0; i < funcs!.length; i++) element[funcs![i]](...parameters![i]);
        element.draw();
    },
    changeDomain(element : VisualElement, new_domain : [number, number], funcs? : string[], parameters? : any[][]) {
        element.properties.domain = new_domain;
        if(funcs) for(let i = 0; i < funcs!.length; i++) element[funcs![i]](...parameters![i]);
        element.draw();
    },
    changeRange(element : VisualElement, new_range : [number, number], funcs? : string[], parameters? : any[][]) {
        element.properties.range = new_range;
        if(funcs) for(let i = 0; i < funcs!.length; i++) element[funcs![i]](...parameters![i]);
        element.draw();
    },
    changePosition(element : VisualElement, new_position : [number, number], funcs? : string[], parameters? : any[][]) {
        element.properties.range = new_position;
        if(funcs) for(let i = 0; i < funcs!.length; i++) element[funcs![i]](...parameters![i]);
        element.draw();
    },
    changeOrigin(element : VisualElement, new_origin : [number, number], funcs? : string[], parameters? : any[][]) {
        element.properties.range = new_origin;
        if(funcs) for(let i = 0; i < funcs!.length; i++) element[funcs![i]](...parameters![i]);
        element.draw();
    },
    linearChangeWidth(element : VisualElement, start_frame : number, duration : number, new_width : number) {
        VisualElement.linearChangeEvent(element, start_frame, duration, {"width" : [element.properties, new_width, "changeWidth"]})
    },
    linearChangeHeight(element : VisualElement, start_frame : number, duration : number, new_height : number) {
        VisualElement.linearChangeEvent(element, start_frame, duration, {"height" : [element.properties, new_height, "changeHeight"]})
    },
    linearChangeDomain(element : VisualElement, start_frame : number, duration : number, new_domain : [number, number]) {
        VisualElement.linearChangeEvent(element, start_frame, duration, {"domain" : [element.properties, new_domain, "changeDomain"]})
    },
    linearChangeRange(element : VisualElement, start_frame : number, duration : number, new_range : [number, number]) {
        VisualElement.linearChangeEvent(element, start_frame, duration, {"range" : [element.properties, new_range, "changeRange"]})
    },
    linearChangePosition(element : VisualElement, start_frame : number, duration : number, new_position : [number, number]) {
        VisualElement.linearChangeEvent(element, start_frame, duration, {"position" : [element.properties, new_position, "changePosition"]})
    },
    linearChangeOrigin(element : VisualElement, start_frame : number, duration : number, new_origin : [number, number]) {
        VisualElement.linearChangeEvent(element, start_frame, duration, {"origin" : [element.properties, new_origin, "changeOrigin"]})
    },
}

export default RenderEvents;
