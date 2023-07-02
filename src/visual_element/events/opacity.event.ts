import VisualElement from "../visual_element.class.js";
import Events from "./event.js";

const OpacityEvents : Events = {
    changeOpacity(element : VisualElement, frame : number, new_opacity : number) {
        element.addPropertyChangeToRecords(element, frame, 'opacity', new_opacity);
    },
    linearChangeOpacity(element : VisualElement, start_frame : number, duration : number, new_opacity : number) {
        VisualElement.linearChangeEvent(element, start_frame, duration, "opacity" ,new_opacity, "changeOpacity")
    },
}

export const OpacityEventsList = {
    ChangeOpacity : 'changeOpacity',
    LinearChangeOpacity : 'linearChangeOpacity',
}

export default OpacityEvents;
