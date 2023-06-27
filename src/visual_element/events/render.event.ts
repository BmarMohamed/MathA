import VisualElement from "../visual_element.class.js";
import Events from "./event.js";
import Lib from "../../lib/lib.js";
const { getTransformFrames } = Lib.Animation;
const { Multiply2By2Matrics } = Lib.Arrays;
import Animation from "../../animation.class.js";


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
    changeTransformMatrix(element : VisualElement, matrix : [[number, number], [number, number]]) {
        element.properties.transform_matrix = matrix;
        element.draw();
    },
    addTransformMatrix(element : VisualElement, matrix : [[number, number], [number, number]]) {
        element.properties.transform_matrix = Multiply2By2Matrics(matrix, element.properties.transform_matrix) as [[number, number], [number, number]];
        this.draw();
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
    linearChangeTransformMatrix(element : VisualElement, start_frame : number, duration : number, new_transform_matrix : [[number, number], [number, number]]) {
        const transform_matrix_i_transform_frames = getTransformFrames(element.properties.transform_matrix[0], new_transform_matrix[0], duration);
        const transform_matrix_j_transform_frames = getTransformFrames(element.properties.transform_matrix[1], new_transform_matrix[1], duration);
        let frame = Animation.at(start_frame);
        for(let i = 0; i <= duration; i++) {
            frame.doAction(element, "changeTransformMatrix", [transform_matrix_i_transform_frames[i], transform_matrix_j_transform_frames[i]], duration);
            frame = frame.getNextFrame();
        }
    },
    linearAddTransformMatrix(element : VisualElement, start_frame : number, duration : number, new_transform_matrix : [[number, number], [number, number]]) {
        const old_matrix = element.properties.transform_matrix;
        const new_matrix = Multiply2By2Matrics(new_transform_matrix, element.properties.transform_matrix) as [[number, number], [number, number]];
        const transform_matrix_i_transform_frames = getTransformFrames(old_matrix[0], new_matrix[0], duration);
        const transform_matrix_j_transform_frames = getTransformFrames(old_matrix[1], new_matrix[1], duration);
        let frame = Animation.at(start_frame);
        for(let i = 0; i <= duration; i++) {
            frame.doAction(element, "changeTransformMatrix", [transform_matrix_i_transform_frames[i], transform_matrix_j_transform_frames[i]], duration);
            frame = frame.getNextFrame();
        }
    },
}

export default RenderEvents;
