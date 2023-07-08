import VisualElement from "../visual_element.class.js";
import { IPathElement } from "../properties.interface.js";
import { DefaultPathProperties } from "../default_properties.object.js";
import RenderEvents, { RenderEventsList } from "../events/render.event.js";
import DrawStyleEvents, { DrawStyleEventsList } from "../events/draw_style.event.js";

class Path extends VisualElement {
    constructor(properties : IPathElement, initialize : boolean = true) {
        super(initialize);
        this.initializeProperties<IPathElement>(properties, DefaultPathProperties);
        this.initializeEvents([RenderEvents, DrawStyleEvents]);
        this.applyStyles();
    }
    private properties! : IPathElement;
    private properties_change_record! : Map<string, number[]>;
    private properties_values_record! : Map<number, IPathElement>;
    public static readonly events = {
        ...RenderEventsList,
        ...DrawStyleEventsList,
        Draw : 'draw',
        ChangePoints : 'changePoints'
    }
    private update(frame : number) {
        this.properties = this.getPropertiesAt(frame);
        this.applyStyles();
        this.draw();
    }
    private draw() {
        this.clear()
        this.ctx.beginPath();
        this.ctx.moveTo(
            ...this.getCoordinatesOf(...this.properties.points![0])
        );
        for(let i = 1; i < this.properties.points!.length; i++) {
            this.ctx.lineTo(
                ...this.getCoordinatesOf(...this.properties.points![i])
            );
        }
        this.ctx.lineTo(
            ...this.getCoordinatesOf(...this.properties.points![0])
        );
        if(this.properties.draw_style == "fill" || this.properties.draw_style == "both") this.fill();
        if(this.properties.draw_style == "stroke" || this.properties.draw_style == "both") this.stroke();
    }
    private stroke() {
        this.ctx.beginPath();
        this.ctx.moveTo(
            ...this.getCoordinatesOf(...this.properties.points![0])
        );
        for(let i = 1; i < this.properties.points!.length; i++) {
            this.ctx.lineTo(
                ...this.getCoordinatesOf(...this.properties.points![i])
            );
        }
        this.ctx.lineTo(
            ...this.getCoordinatesOf(...this.properties.points![0])
        );
        this.ctx.stroke()
    }
    private fill() {
        this.ctx.beginPath();
        this.ctx.moveTo(
            ...this.getCoordinatesOf(...this.properties.points![0])
        );
        for(let i = 1; i < this.properties.points!.length; i++) {
            this.ctx.lineTo(
                ...this.getCoordinatesOf(...this.properties.points![i])
            );
        }
        this.ctx.lineTo(
            ...this.getCoordinatesOf(...this.properties.points![0])
        );
        this.ctx.fill()
    }
    private changePoints(element : Path, frame : number, new_points : [number , number][]) {
        this.addPropertyChangeToRecords(element, frame, 'points', new_points);
    }
}

export default Path;