import VisualElement from "../visual_element.class.js";
import Events from "./event.js";
import Animation from "../../animation.class.js";

import Lib from "../../lib/lib.js";
const { getTransformFrames } = Lib.Animation;
const { Multiply2By2Matrics, getFloorNumber } = Lib.Arrays;
const { pi } = Lib.Constants

const RenderEvents : Events = {
    show(element : VisualElement, frame : number) {
        element.addPropertyChangeToRecords(element, frame, 'visible', true);
        if(element.elements) 
            for(const [K, V] of element.elements) 
                if(V['show'])
                    RenderEvents.show(V, frame);
    },
    hide(element : VisualElement, frame : number) {
        element.addPropertyChangeToRecords(element, frame, 'visible', false);
        if(element.elements) 
            for(const [K, V] of element.elements) 
                if(V['hide'])
                    RenderEvents.hide(V, frame);
    },
    changeWidth(element : VisualElement, frame : number, new_width : number) {
        element.addPropertyChangeToRecords(element, frame, 'width', new_width);
        if(element.elements) 
            for(const [K, V] of element.elements) 
                if(V['changeWidth'])
                    RenderEvents.changeWidth(V, frame, new_width);
    },
    changeHeight(element : VisualElement, frame : number, new_height : number) {
        element.addPropertyChangeToRecords(element, frame, 'height', new_height);
        if(element.elements) 
            for(const [K, V] of element.elements)
                if(V['changeHeight'])
                    RenderEvents.changeHeight(V, frame, new_height);
    },
    changeDomain(element : VisualElement,frame : number,  new_domain : [number, number]) {
        element.addPropertyChangeToRecords(element, frame, 'domain', new_domain);
        if(element.elements) 
            for(const [K, V] of element.elements) 
                if(V['changeDomain'])
                    RenderEvents.changeDomain(V, frame, new_domain);
    },
    changeRange(element : VisualElement, frame : number, new_range : [number, number]) {
        element.addPropertyChangeToRecords(element, frame, 'range', new_range);
        if(element.elements) 
            for(const [K, V] of element.elements) 
                if(V['changeRange'])
                    RenderEvents.changeRange(V, frame, new_range);
    },
    changeMatrix(element : VisualElement, frame : number, new_matrix : [[number, number], [number, number]]) {
        element.addPropertyChangeToRecords(element, frame, 'matrix', new_matrix);
        if(element.elements) 
            for(const [K, V] of element.elements)
                if(V['changeMatrix']) 
                    RenderEvents.changeMatrix(V, frame, new_matrix);
    },
    addMatrix(element : VisualElement, frame : number, matrix : [[number, number], [number, number]]) {
        const change_frame = getFloorNumber(frame, element.properties_change_record.get('matrix'))
        element.addPropertyChangeToRecords(element, frame, 'matrix', 
            Multiply2By2Matrics(matrix, element.properties_values_record.get(change_frame).matrix
        ) as [[number, number], [number, number]]);
        if(element.elements) 
            for(const [K, V] of element.elements)
                if(V['addMatrix'])
                    RenderEvents.addMatrix(V, frame, matrix);
    },
    rotate(element : VisualElement, frame : number, angle : number, unit : "deg" | "rad" | "grd" = "deg") {
        if(unit == "deg") angle *= (pi / 180);
        else if(unit == "grd") angle *= (pi / 200);
        RenderEvents.addMatrix(element, frame, [[Math.cos(angle), Math.sin(angle)], [Math.sin(-angle), Math.cos(angle)]]);
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
    linearChangeMatrix(element : VisualElement, frame : number, duration : number, new_matrix : [[number, number], [number, number]]) {
        const change_frame = getFloorNumber(frame, element.properties_change_record.get('matrix'))
        const matrix_i_transform_frames = getTransformFrames(element.properties_values_record.get(change_frame).matrix[0], new_matrix[0], duration);
        const matrix_j_transform_frames = getTransformFrames(element.properties_values_record.get(change_frame).matrix[1], new_matrix[1], duration);
        for(let i = 1; i <= duration; i++){
            Animation.at(frame + i);
            Animation.do(element, "changeMatrix", [matrix_i_transform_frames[i], matrix_j_transform_frames[i]]);
        } 
    },
    linearAddMatrix(element : VisualElement, frame : number, duration : number, new_matrix : [[number, number], [number, number]]) {
        const change_frame = getFloorNumber(frame, element.properties_change_record.get('matrix'))
        const matrix = Multiply2By2Matrics(new_matrix, element.properties.matrix) as [[number, number], [number, number]];
        const transform_matrix_i_transform_frames = getTransformFrames(element.properties_values_record.get(change_frame).matrix[0], matrix[0], duration);
        const transform_matrix_j_transform_frames = getTransformFrames(element.properties_values_record.get(change_frame).matrix[1], matrix[1], duration); 
        for(let i = 1; i <= duration; i++) {
            Animation.at(frame + i);
            Animation.do(element, "changeMatrix", [transform_matrix_i_transform_frames[i], transform_matrix_j_transform_frames[i]]);
        }
    },
    linearRotate(element : VisualElement, frame : number, duration : number, rotation_angle : number, unit : "deg" | "rad" | "grd" = "deg") {
        for(let i = 1; i <= duration; i++) {
            Animation.at(frame + i);
            Animation.do(element, "rotate", rotation_angle / duration, unit);
        }
    }
}

export const RenderEventsList =  {
    Show : "show",
    Hide : "hide",
    ChangeWidth : "changeWidth",
    ChangeHeight : "changeHeight",
    ChangeDomain : "changeDomain",
    ChangeRange : "changeRange",
    ChangeMatrix : "changeMatrix",
    AddMatrix : "addMatrix",
    Rotate : "rotate",
    LinearChangeWidth : "linearChangeWidth",
    LinearChangeHeight : "linearChangeHeight",
    LinearChangeDomain : "linearChangeDomain",
    LinearChangeRange : "linearChangeRange",
    LinearChangeMatrix : "linearChangeMatrix",
    LinearAddMatrix : "linearAddMatrix",
    LinearRotate : "linearRotate"
}

export default RenderEvents;
