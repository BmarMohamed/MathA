import VisualElement from "../visual_element.class";
import Events from "./event.js";
import Lib from "../../lib/lib.js";
const { findIndexOf } = Lib.Arrays;

const GradientEvents : Events = {
    setGradient(element : VisualElement, frame : number) {
        const gradient_start_position_change_frame = findIndexOf(frame, element. properties_change_record.get('gradient_start_position'));
        const gradient_end_position_change_frame = findIndexOf(frame, element. properties_change_record.get('gradient_start_position'));
        const gradient_colors_change_frame = findIndexOf(frame, element. properties_change_record.get('gradient_colors'));
        const apply_gradient_on_change_frame = findIndexOf(frame, element. properties_change_record.get('apply_gradient_on'));
    
        const gradient = element.ctx.createLinearGradient(
            ...element.getCoordinatesOf(...element.properties_values_record.get(gradient_start_position_change_frame).gradient_start_position! as [number, number]),
            ...element.getCoordinatesOf(...element.properties_values_record.get(gradient_end_position_change_frame).gradient_end_position! as [number, number])
        )
        for(const color in element.properties_values_record.get(gradient_colors_change_frame).gradient_colors) {
            gradient.addColorStop(element.properties_values_record.get(gradient_colors_change_frame).gradient_colors[color], color)
        }
        if(
            element.properties_values_record.get(apply_gradient_on_change_frame).apply_gradient_on == "stroke" ||
            element.properties_values_record.get(apply_gradient_on_change_frame).apply_gradient_on == "both"
        ) 
        element.addPropertyChangeToRecords(element, frame, 'stroke_color', gradient)
        if(
            element.properties_values_record.get(apply_gradient_on_change_frame).apply_gradient_on == "fill" || 
            element.properties_values_record.get(apply_gradient_on_change_frame).apply_gradient_on == "both"
        ) 
        element.addPropertyChangeToRecords(element, frame, 'fill_color', gradient)
    },
    changeGradientColors(element : VisualElement, frame : number, new_gradient_colors : Record<string, number>) {
        element.addPropertyChangeToRecords(element, frame, 'gradient_colors', new_gradient_colors);
        GradientEvents.setGradient(element);
    },
    changeGradientCoordinates(element : VisualElement, frame : number, new_start_position : [number, number], new_end_position : [number, number]) {
        element.addPropertyChangeToRecords(element, frame, 'gradient_start_position', new_start_position);
        element.addPropertyChangeToRecords(element, frame, 'gradient_end_position', new_end_position);
        GradientEvents.setGradient(element);
    },
    changeApplyGradientOn(element : VisualElement, frame : number, new_apply_on : "stroke" | "fill" | "both" | "none") {
        element.addPropertyChangeToRecords(element, frame, 'apply_gradient_on', new_apply_on);
        GradientEvents.setGradient(element);
    }
}

export const GradientEventsList = {
    ChangeGradientColors : 'changeGradientColors',
    ChangeGradientCoordinates : 'changeGradientCoordinates',
    ChangeApplyGradientOn : 'changeApplyGradientOn',
}

export default GradientEvents;