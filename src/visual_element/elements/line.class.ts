import { ILineElement } from "../properties.interface.js";
import { DefaultLineProperties } from "../default_properties.object.js";
import RenderEvents, { RenderEventsList } from "../events/render.event.js";
import StrokeEvents, { StrokeEventsList } from "../events/stroke.event.js";
import VisualElement from "../visual_element.class.js";
import Animation from "../../animation.class.js";

import Lib from "../../lib/lib.js";
const {getTransformFrames} = Lib.Animation;
const { getFloorNumber: findIndexOf } = Lib.Arrays;

class Line extends VisualElement {
    constructor(properties : ILineElement, initialize : boolean = true) {
        super(initialize);
        this.initializeProperties<ILineElement>(properties, DefaultLineProperties);
        this.initializeEvents([RenderEvents, StrokeEvents]);
        this.applyStyles();
        this.points = this.getPoints();
    }
    private properties! : ILineElement;
    private properties_change_record! : Map<string, number[]>;
    private properties_values_record! : Map<number, ILineElement>;
    private points! : [[number, number], [number, number]];
    public static readonly events = {
        ...RenderEventsList,
        ...StrokeEventsList,
        Draw : 'draw',
        ChangeCoordinates : "ChangeCoordinates",
        ChangeFrom : 'changeFrom',
        ChangeTo : 'changeTo',
        LinearChangeCoordinates : "linearChangeCoordinates"
    };
    private getPoints() : [[number, number], [number, number]] {
        return [
            this.getCoordinatesOf(...this.properties.from!) as [number, number],
            this.getCoordinatesOf(...this.properties.to!) as [number, number]
        ]
    }
    private update(frame : number) {
        this.properties = this.getPropertiesAt(frame);
        this.applyStyles();
        this.points = this.getPoints();
        this.draw();
    }
    private draw() {
        if(this.initialized) this.clear()
        this.ctx.beginPath();
        this.ctx.moveTo(...this.points[0]);
        this.ctx.lineTo(...this.points[1]);
        this.ctx.stroke();
    }
    private changeCoordinates(element : VisualElement, frame : number, from : [number, number], to : [number, number]) {
        this.changeFrom(element, frame, from);
        this.changeTo(element, frame, to);
    }
    private changeFrom(element : VisualElement, frame : number, from : [number, number]) {
        this.addPropertyChangeToRecords(element, frame, 'from', from);
    }
    private changeTo(element : VisualElement, frame : number, to : [number, number]) {
        this.addPropertyChangeToRecords(element, frame, 'to', to);
    }
    private linearChangeCoordinates(element : VisualElement, frame : number, duration : number, new_from : [number, number], new_to : [number, number]) {
        const from_change_frame = findIndexOf(frame, element.properties_change_record.get('from'));
        const to_change_frame = findIndexOf(frame, element.properties_change_record.get('to'));
        const FromChangeFrames = getTransformFrames(this.properties_values_record.get(from_change_frame)!.from!, new_from, duration);
        const ToChangeFrames = getTransformFrames(this.properties_values_record.get(to_change_frame)!.to!, new_to, duration);
        for(let i = 1; i <= duration; i++) {
            Animation.at(frame + i);
            Animation.do(element, "changeFrom", FromChangeFrames[i]);
            Animation.do(element, "changeTo", ToChangeFrames[i]);
        }
    }
}

export default Line;