import VisualElement from "../visual_element.class.js";
import StrokeEvents, { StrokeEventsList } from "./stroke.event.js";
import FillEvents, { FillEventsList } from "./fill.event.js";
import Events from "./event.js";
import { AddEvents } from "./event.js";

const DrawStyleEvents : Events = {
    changeDrawStyle(element : VisualElement, frame : number, draw_style : "stroke" | "fill" | "both") {
        element.addPropertyChangeToRecords(element, frame, 'draw_style', draw_style);
    }
}

AddEvents(DrawStyleEvents, StrokeEvents);
AddEvents(DrawStyleEvents, FillEvents);

export const DrawStyleEventsList = {
    ...FillEventsList,
    ...StrokeEventsList,
    ChangeDrawStyle : 'changeDrawStyle',
}

export default DrawStyleEvents;
