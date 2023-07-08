import VisualElement from "../visual_element.class.js";
import Events from "./event.js";

const LineEvents : Events = {
    changeLineWidth(element : VisualElement, frame : number, new_line_width : number) {
        element.addPropertyChangeToRecords(element, frame, 'line_width', new_line_width)
        if(element.elements) 
            for(const [K, V] of element.elements) 
                if(V['changeLineWidth'])
                    LineEvents.changeLineWidth(V, frame, new_line_width);
    },
    linearChangeLineWidth(element : VisualElement, start_frame : number, duration : number, new_line_width : number) {
        VisualElement.linearChangeEvent(element, start_frame, duration, "line_width" , new_line_width, "changeLineWidth")
    },
}

export const LineEventsList = {
    ChangeLineWidth : 'changeLineWidth',
    LinearChangeLineWidth : 'linearChangeLineWidth',
}

export default LineEvents;
