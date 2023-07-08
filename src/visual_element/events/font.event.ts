import Events from "./event";
import DrawStyleEvents, { DrawStyleEventsList } from "./draw_style.event.js";
import { AddEvents } from "./event.js";
import VisualElement from "../visual_element.class.js";

const FontEvents : Events = {
    changeFontSize(element : VisualElement, frame : number, new_font_size : number) {
        element.addPropertyChangeToRecords(element, frame, 'font_size', new_font_size);
        if(element.elements)
            for(const [K, V] of element.elements) 
                if(V['changeFontSize'])
                    FontEvents.changeFontSize(V, frame, new_font_size);
    },
    changeMaxWidth(element : VisualElement, frame : number, new_max_width : number) {
        element.addPropertyChangeToRecords(element, frame, 'max_width', new_max_width);
        if(element.elements)
            for(const [K, V] of element.elements) 
                if(V['changeMaxWidth'])
                    FontEvents.changeMaxWidth(V, frame, new_max_width);
    },
    changeFontFamily(element : VisualElement, frame : number, new_font_family : string) {
        element.addPropertyChangeToRecords(element, frame, 'font_family', new_font_family);
        if(element.elements)
            for(const [K, V] of element.elements) 
                if(V['changeFontFamily'])
                    FontEvents.changeFontFamily(V, frame, new_font_family);
    },
    changeTextDirection(element : VisualElement, frame : number, new_text_direction : "rtl" | "ltr") {
        element.addPropertyChangeToRecords(element, frame, 'text_direction', new_text_direction);
        if(element.elements)
            for(const [K, V] of element.elements) 
                if(V['changeTextDirection'])
                    FontEvents.changeTextDirection(V, frame, new_text_direction);
    },
    changeFontWeight(element : VisualElement, frame : number, new_font_weight : string) {
        element.addPropertyChangeToRecords(element, frame, 'font_weight', new_font_weight);
        if(element.elements)
            for(const [K, V] of element.elements) 
                if(V['changeFontWeight'])
                    FontEvents.changeFontWeight(V, frame, new_font_weight);
    },
    linearChangeFontSize(element : VisualElement, start_frame : number, duration : number, new_font_size : number) {
        VisualElement.linearChangeEvent(element, start_frame, duration, "font_size" , new_font_size, "changeFontSize")
    },
    linearChangeMaxWidth(element : VisualElement, start_frame : number, duration : number, new_max_width : number) {
        VisualElement.linearChangeEvent(element, start_frame, duration, "max_width" , new_max_width, "changeMaxWidth")
    },
}

AddEvents(FontEvents, DrawStyleEvents);

export const FontEventsList = {
    ...DrawStyleEventsList,
    ChangeFontSize : 'changeFontSize',
    ChangeMaxWidth : 'changeMaxWidth',
    ChangeFontFamily : 'changeFontFamily',
    ChangeTextDirection : 'changeTextDirection',
    ChangeFontWeight : 'changeFontWeight',
    LinearChangeFontSize : 'linearChangeFontSize',
    LinearChangeMaxWidth : 'linearChangeMaxWidth'
}

export default FontEvents;