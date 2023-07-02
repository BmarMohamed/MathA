import VisualElement from "../visual_element.class.js";
import Events from "./event.js";
import Animation from "../../animation.class.js";

import Lib from "../../lib/lib.js";
const { getTransformFrames } = Lib.Animation;
const { Multiply2By2Matrics, findIndexOf } = Lib.Arrays;

const RenderEvents : Events = {
    changeWidth(element : VisualElement, frame : number, new_width : number) {
        element.addPropertyChangeToRecords(element, frame, 'width', new_width);
    },
    changeHeight(element : VisualElement, frame : number, new_height : number) {
        element.addPropertyChangeToRecords(element, frame, 'height', new_height);
    },
    changeDomain(element : VisualElement,frame : number,  new_domain : [number, number]) {
        element.addPropertyChangeToRecords(element, frame, 'domain', new_domain);
    },
    changeRange(element : VisualElement, frame : number, new_range : [number, number]) {
        element.addPropertyChangeToRecords(element, frame, 'range', new_range);
    },
    changePosition(element : VisualElement, frame : number, new_position : [number, number]) {
        element.addPropertyChangeToRecords(element, frame, 'position', new_position);
    },
    changeMatrix(element : VisualElement, frame : number, new_matrix : [[number, number], [number, number]]) {
        element.addPropertyChangeToRecords(element, frame, 'matrix', new_matrix);
    },
    addMatrix(element : VisualElement, frame : number, matrix : [[number, number], [number, number]]) {
        element.addPropertyChangeToRecords(element, frame, 'matrix', 
            Multiply2By2Matrics(matrix, element.properties.matrix
        ) as [[number, number], [number, number]]);
    },
    linearChangeWidth(element : VisualElement, start_frame : number, duration : number, new_width : number) {
        VisualElement.linearChangeEvent(element, start_frame, duration, "width" , new_width, "changeWidth")
    },
    linearChangeHeight(element : VisualElement, start_frame : number, duration : number, new_height : number) {
        VisualElement.linearChangeEvent(element, start_frame, duration, "height", new_height, "changeHeight")
    },
    linearChangeDomain(element : VisualElement, start_frame : number, duration : number, new_domain : [number, number]) {
        VisualElement.linearChangeEvent(element, start_frame, duration, "domain", new_domain, "changeDomain")
    },
    linearChangeRange(element : VisualElement, start_frame : number, duration : number, new_range : [number, number]) {
        VisualElement.linearChangeEvent(element, start_frame, duration, "range", new_range, "changeRange")
    },
    linearChangePosition(element : VisualElement, start_frame : number, duration : number, new_position : [number, number]) {
        VisualElement.linearChangeEvent(element, start_frame, duration, "position", new_position, "changePosition")
    },
    linearChangeMatrix(element : VisualElement, frame : number, duration : number, new_matrix : [[number, number], [number, number]]) {
        const change_frame = findIndexOf(frame, element. properties_change_record.get('matrix'))
        const matrix_i_transform_frames = getTransformFrames(element.properties_values_record.get(change_frame).matrix[0], new_matrix[0], duration);
        const matrix_j_transform_frames = getTransformFrames(element.properties_values_record.get(change_frame).matrix[1], new_matrix[1], duration);
        for(let i = 1; i <= duration; i++){
            Animation.at(frame + i);
            Animation.do(element, "changeMatrix", [matrix_i_transform_frames[i], matrix_j_transform_frames[i]]);
        } 
    },
    linearAddMatrix(element : VisualElement, frame : number, duration : number, new_matrix : [[number, number], [number, number]]) {
        const change_frame = findIndexOf(frame, element. properties_change_record.get('matrix'))
        const matrix = Multiply2By2Matrics(new_matrix, element.properties.matrix) as [[number, number], [number, number]];
        const transform_matrix_i_transform_frames = getTransformFrames(element.properties_values_record.get(change_frame).matrix[0], matrix[0], duration);
        const transform_matrix_j_transform_frames = getTransformFrames(element.properties_values_record.get(change_frame).matrix[1], matrix[1], duration); 
        for(let i = 1; i <= duration; i++) {
            Animation.at(frame + i);
            Animation.do(element, "changeMatrix", [transform_matrix_i_transform_frames[i], transform_matrix_j_transform_frames[i]]);
        }
    },
}
export const RenderEventsList =  {
    ChangeWidth : "changeWidth",
    ChangeHeight : "changeHeight",
    ChangeDomain : "changeDomain",
    ChangeRange : "changeRange",
    ChangePosition : "changePosition",
    ChangeMatrix : "changeMatrix",
    AddMatrix : "addMatrix",
    LinearChangeWidth : "linearChangeWidth",
    LinearChangeHeight : "linearChangeHeight",
    LinearChangeDomain : "linearChangeDomain",
    LinearChangeRange : "linearChangeRange",
    LinearChangePosition : "linearChangePosition",
    LinearChangeMatrix : "linearChangeMatrix",
    LinearAddMatrix : "linearAddMatrix",
}

export default RenderEvents;
