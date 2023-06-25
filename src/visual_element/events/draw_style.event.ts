import VisualElement from "../visual_element.class.js";
import StrokeEvents from "./stroke.event.js";
import FillEvents from "./fill.event.js";
import Events from "./event.js";

const DrawStyleEvents : Events = {
    ...StrokeEvents,
    ...FillEvents,
    changeDrawStyle(element : VisualElement, draw_style : "stroke" | "fill") {
        if(element.properties.draw_style == draw_style) return;
        console.log(element.properties)
        element.properties.draw_style = draw_style;
        element.draw();
    }
}

export default DrawStyleEvents;
