import VisualElement from "../visual_element.class.js";
import StrokeEvents from "./stroke.event.js";
import FillEvents from "./fill.event.js";
import Events from "./event.js";
import { AddEvents } from "./event.js";

const DrawStyleEvents : Events = {
    // changeDrawStyle(element : VisualElement, draw_style : "stroke" | "fill" | "both") {
    //     if(element.properties.draw_style == draw_style) return;
    //     element.properties.draw_style = draw_style;
    // }
}

AddEvents(DrawStyleEvents, StrokeEvents);
AddEvents(DrawStyleEvents, FillEvents);

export default DrawStyleEvents;
