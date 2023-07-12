import VisualElement from "../visual_element.class.js";
import { IPointsElement } from "../properties.interface.js";
import RenderEvents, { RenderEventsList } from "../events/render.event.js";
import DrawStyleEvents, { DrawStyleEventsList } from "../events/draw_style.event.js";
import Animation from "../../animation.class.js";
import Lib from "../../lib/lib.js";
import { DefaultPointsProperties } from "../default_properties.object.js";
const { pi } = Lib.Constants;
const { getTransformFrames } = Lib.Animation;

class Points extends VisualElement {
    constructor(properties : IPointsElement) {
        super();
        this.initializeProperties<IPointsElement>(properties, DefaultPointsProperties);
        this.initializeEvents([RenderEvents, DrawStyleEvents]);
        this.applyStyles();
        this.points = this.properties.points!;
    }
    private properties! : IPointsElement;
    private properties_change_record! : Map<string, number[]>;
    private properties_values_record! : Map<number, IPointsElement>;
    private points! : [number, number][];
    public static readonly events = {
        ...RenderEventsList,
        ...DrawStyleEventsList,
        Draw : 'draw',
        ChangeRadius : "changeRadius",
        LinearChangeRadius : "linearChangeRadius",
    };
    private update(frame : number) {
        this.properties = this.getPropertiesAt(frame);
        this.draw();
    }
    private draw() {
        this.applyStyles();
        for(let point of this.points) this.drawPoint(...point);
    }
    public drawInComplexElement() {
        for(let point of this.points) this.drawPoint(...point);
    }
    private drawPoint(x : number, y : number) {
        const position = this.getCoordinatesOf(x, y);
        Animation.ctx.beginPath();
        Animation.ctx.arc(...position, this.properties.radius!, 0, pi * 2);
        if(this.properties.draw_style == "fill" || this.properties.draw_style == "both") Animation.ctx.fill();
        if(this.properties.draw_style == "stroke" || this.properties.draw_style == "both") Animation.ctx.stroke();
    }
    private changeRadius(element : VisualElement, frame : number, new_radius : number) {
        this.addPropertyChangeToRecords(element, frame, 'radius', new_radius);
    }
    private linearChangeRadius(element : VisualElement, frame : number, duration : number, new_radius : number) {
        VisualElement.linearChangeEvent(element, frame, duration, 'radius', new_radius, "changeRadius");
    }
}

export default Points;