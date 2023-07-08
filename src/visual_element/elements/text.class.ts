import VisualElement from "../visual_element.class.js";
import { ITextElement } from "../properties.interface.js";
import { DefaultTextProperties } from "../default_properties.object.js";
import FontEvents, { FontEventsList } from "../events/font.event.js";
import RenderEvents, { RenderEventsList } from "../events/render.event.js";

class Text extends VisualElement {
    constructor(properties : ITextElement, initialize : boolean = true) {
        super(initialize);
        this.initializeProperties<ITextElement>(properties, DefaultTextProperties);
        this.initializeEvents([RenderEvents, FontEvents]);
        this.applyStyles();
        // this.ctx.textBaseline = 'bottom';
        // this.ctx.textAlign = 'center'
    }

    private properties! : ITextElement;
    private properties_change_record! : Map<string, number[]>;
    private properties_values_record! : Map<number, ITextElement>;
    public static readonly events = {
        ...RenderEventsList,
        ...FontEventsList,
        Draw : 'draw',
        ChangeText : 'changeText',
        ChangePosition : "changePosition",
        LinearChangePosition : "linearChangePosition",
    };
    private update(frame : number) {
        this.properties = this.getPropertiesAt(frame);
        this.applyStyles();
        this.draw();
    }
    private draw() {
        this.clear();
        const coordinates = this.getCoordinatesOf(this.properties.position![0], this.properties.position![1]);
        const max_width = this.getCoordinatesOf(this.properties.max_width! - this.properties.domain![0], 0);
        if(this.properties.draw_type == "stroke") this.ctx.strokeText(this.properties.text!, ...coordinates, max_width[0]);
        else this.ctx.fillText(this.properties.text!,...coordinates, max_width[0]);
    }
    changeText(element : VisualElement, frame : number, new_text : string) {
        element.addPropertyChangeToRecords(element, frame, 'text', new_text);
    }
    changePosition(element : VisualElement, frame : number, new_position : [number, number]) {
        element.addPropertyChangeToRecords(element, frame, 'position', new_position);
    }
    linearChangePosition(element : VisualElement, start_frame : number, duration : number, new_position : [number, number]) {
        VisualElement.linearChangeEvent(element, start_frame, duration, "position", new_position, "changePosition")
    }
}

export default Text;