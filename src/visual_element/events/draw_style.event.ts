import VisualElement from "../visual_element.class.js";
import StrokeEvents from "./stroke.event.js";
import FillEvents from "./fill.event.js";
import Events from "./event.js";

const DrawStyleEvents : Events = {
    ...StrokeEvents,
    ...FillEvents,
}

export default DrawStyleEvents;
