import { IPolygonElement } from "../properties.interface.js";
import { DefaultPolygonProperties } from "../default_properties.object.js";
import VisualElement from "../visual_element.class.js";
import RenderEvents, { RenderEventsList } from "../events/render.event.js";
import DrawStyleEvents from "../events/draw_style.event.js";

import Lib from "../../lib/lib.js";
const { pi } = Lib.Constants;
const { cos, sin } = Lib.Funcs;

class Polygon extends VisualElement {
    constructor(properties : IPolygonElement) {
        super();
        this.initializeProperties<IPolygonElement>(properties, DefaultPolygonProperties);
        this.initializeEvents([RenderEvents, DrawStyleEvents]);
        this.applyStyles();
        this.angles = this.getAngles();
        this.points = this.getPoints()
    }
    private properties! : IPolygonElement;
    private properties_change_record! : Map<string, number[]>;
    private properties_values_record! : Map<number, IPolygonElement>;
    private angles! : number[];
    private points! : [number,number][];
    public static readonly events = {
        ...RenderEventsList,
        ChangeRadius : "changeRadius",
        ChangeAngles : "changeAngles",
        LinearChangeRadius : "linearChangeRadius",
    };
    private getAngles() {
        let angles : number[] = [this.properties.rotation!];
        if(typeof this.properties.angles === 'number') {
            const mod = 360 % this.properties.angles! as number;
            const div = Math.floor(360 / this.properties.angles! as number);
            for(let i = 0; i < div; i++) angles.push(this.properties.angles! as number)
            angles.push(mod);
        }
        else angles = angles.concat(this.properties.angle as number[]);
        for(let i = 1; i < angles.length; i++) angles[i] += angles[i - 1]
        for(let i = 0; i < angles.length; i++) angles[i] = angles[i] * pi / 180;
        return angles;
    }
    private getPoints() {
        const points : [number, number][] = [];
        for(let i = 0; i < this.angles.length; i++) {
            let angle = pi - this.angles[i];
            points.push([this.properties.center![0] - this.properties.radius! * cos(angle), this.properties.center![0] + this.properties.radius! * sin(angle)])
        }
        return points;
    }
    private update(frame : number) {
        this.properties = this.getPropertiesAt(frame);
        this.applyStyles();
        this.angles = this.getAngles();
        this.points = this.getPoints();
        this.draw();
    }
    private draw() {
        this.clear()
        const coordinates : [number, number][] = [];
        for(let point of this.points) coordinates.push(this.getCoordinatesOf(...point) as [number, number])
        if(this.properties.draw_style == "fill" || this.properties.draw_style == "both") this.fill(coordinates);
        if(this.properties.draw_style == "stroke" || this.properties.draw_style == "both") this.stroke(coordinates);
    }
    private stroke(coordinates : [number, number][]) {
        this.ctx.beginPath();
        this.ctx.moveTo(...coordinates[0])
        for(let i = 1; i < coordinates.length - 1; i++) {
            this.ctx.lineTo(...coordinates[i])
        }
        this.ctx.stroke()
    }
    private fill(coordinates : [number, number][]) {
        this.ctx.beginPath();
        this.ctx.moveTo(...coordinates[0])
        for(let i = 1; i < coordinates.length - 1; i++) {
            this.ctx.lineTo(...coordinates[i])
        }
        this.ctx.fill()
    }
    private changeAngles(element : Polygon, frame : number, new_angles : number | number[]) {
        this.addPropertyChangeToRecords(element, frame, 'angles', new_angles);
    }
    private changeRadius(element : VisualElement, frame : number, new_radius : number) {
        this.addPropertyChangeToRecords(element, frame, 'radius', new_radius);
    }
    private linearChangeRadius(element : VisualElement, frame : number, duration : number, new_radius : number) {
        VisualElement.linearChangeEvent(element, frame, duration, 'radius', new_radius, "changeRadius");
    }
    // private changeRotationTo(element : VisualElement, new_rotation : number) {
    //     this.properties.rotation = new_rotation;
    //     this.angles = this.getAngles();
    //     this.points = this.getPoints();
    // } 

    // private linearRotationBy(element : VisualElement, start_frame : number, duration : number, rotation : number) {
    //     const rotationChangeFrames = getTransformFrames(this.properties.rotation!, this.properties.rotation! + rotation, duration);
    //     let frame = Animation.at(start_frame);
    //     for(let i = 0; i <= duration; i++) {
    //         frame.doAction(this, "changeRotationTo", rotationChangeFrames[i]);
    //         frame = frame.getNextFrame();
    //     }
    // }
}

export default Polygon;