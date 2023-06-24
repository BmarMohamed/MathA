import VisualElement from "../visual_element.class.js";
import Events from "./event.js";

const RenderEvents : Events = {
    changeWidth(element : VisualElement, new_width : number) {
        element.properties.width = new_width;
        element.draw();
    },
    changeHeight(element : VisualElement, new_height : number) {
        element.properties.height = new_height;
        element.draw();
    },
    changeDomain(element : VisualElement, new_domain : [number, number]) {
        element.properties.domain = new_domain;
        element.draw();
    },
    changeRange(element : VisualElement, new_range : [number, number]) {
        element.properties.range = new_range;
        element.draw();
    },
    changePosition(element : VisualElement, new_position : [number, number]) {
        element.properties.range = new_position;
        element.draw();
    },
    changeOrigin(element : VisualElement, new_origin : [number, number]) {
        element.properties.range = new_origin;
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
