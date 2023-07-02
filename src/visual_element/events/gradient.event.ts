import VisualElement from "../visual_element.class";
import Events from "./event.js";

const GradientEvents : Events = {
    // setGradient(element : VisualElement) {
    //     const gradient = element.ctx.createLinearGradient(
    //         ...element.getCoordinatesOf(...element.properties.gradient_start_position! as [number, number]),
    //         ...element.getCoordinatesOf(...element.properties.gradient_end_position! as [number, number])
    //     )
    //     for(const color in element.properties.gradient_colors) {
    //         gradient.addColorStop(element.properties.gradient_colors[color], color)
    //     }
    //     if(element.properties.apply_gradient_on == "stroke" || element.properties.apply_gradient_on == "both") element.ctx.strokeStyle = gradient;
    //     if(element.properties.apply_gradient_on == "fill" || element.properties.apply_gradient_on == "both") element.ctx.fillStyle = gradient;
    // },
    // changeGradientColors(element : VisualElement, new_gradient_colors : Record<string, number>) {
    //     element.properties.gradient_colors = new_gradient_colors;
    //     GradientEvents.setGradient(element);
    // },
    // changeGradientCoordinates(element : VisualElement, new_start_position : [number, number], new_end_position : [number, number]) {
    //     element.properties.gradient_start_position = new_start_position;
    //     element.properties.gradient_end_position = new_end_position;
    //     GradientEvents.setGradient(element);
    // },
    // changeApplyGradientOn(element : VisualElement, new_apply_on : "stroke" | "fill" | "both" | "none") {
    //     element.properties.apply_gradient_on = new_apply_on
    //     GradientEvents.setGradient(element);
    // }
}

export default GradientEvents;