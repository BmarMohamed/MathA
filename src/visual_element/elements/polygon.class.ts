import { IPolygonElement } from "../properties.interface.js";
import { DefaultPolygonProperties } from "../default_properties.object.js";
import VisualElement from "../visual_element.class.js";
import RenderEvents, { RenderEventsList } from "../events/render.event.js";
import DrawStyleEvents, { DrawStyleEventsList } from "../events/draw_style.event.js";
import Animation from "../../animation.class.js";
import Lib from "../../lib/lib.js";
const { pi } = Lib.Constants;
const { cos, sin } = Lib.Funcs;
const { getFloorNumber } = Lib.Arrays;
const { getTransformFrames } = Lib.Animation;

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
        ...DrawStyleEventsList,
        Draw : 'draw',
        ChangeRadius : "changeRadius",
        ChangeAngles : "changeAngles",
        LinearChangeRadius : "linearChangeRadius",
        ChangeCenter : "changeCenter",
        LinearChangeCenter : "linearChangeCenter",
        ChangeStartAngle : "changeStartAngle"
    };
    private getAngles() {
        let angles : number[] = [this.properties.start_angle!];
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
            points.push([this.properties.center![0] - this.properties.radius! * cos(angle), this.properties.center![1] + this.properties.radius! * sin(angle)])
        }
        return points;
    }
    private update(frame : number) {
        this.properties = this.getPropertiesAt(frame);
        this.angles = this.getAngles();
        this.points = this.getPoints();
        this.draw();
    }
    private draw() {
        const coordinates : [number, number][] = [];
        for(let point of this.points) coordinates.push(this.getCoordinatesOf(...point) as [number, number])
        this.applyStyles();
        if(this.properties.draw_style == "fill" || this.properties.draw_style == "both") this.fill(coordinates);
        if(this.properties.draw_style == "stroke" || this.properties.draw_style == "both") this.stroke(coordinates);
    }
    private stroke(coordinates : [number, number][]) {
        Animation.ctx.beginPath();
        Animation.ctx.moveTo(...coordinates[0])
        for(let i = 1; i < coordinates.length - 1; i++) {
            Animation.ctx.lineTo(...coordinates[i])
        }
        Animation.ctx.stroke()
    }
    private fill(coordinates : [number, number][]) {
        Animation.ctx.beginPath();
        Animation.ctx.moveTo(...coordinates[0])
        for(let i = 1; i < coordinates.length - 1; i++) {
            Animation.ctx.lineTo(...coordinates[i])
        }
        Animation.ctx.fill()
    }
    private changeAngles(element : Polygon, frame : number, new_angles : number | number[]) {
        this.addPropertyChangeToRecords(element, frame, 'angles', new_angles);
    }
    private changeRadius(element : VisualElement, frame : number, new_radius : number) {
        this.addPropertyChangeToRecords(element, frame, 'radius', new_radius);
    }
    private changeCenter(element : VisualElement, frame : number, new_center : [number, number]) {
        this.addPropertyChangeToRecords(element, frame, 'center', new_center);
    }
    private changeStartAngle(element : Polygon, frame : number, new_start_angle : number) {
        this.addPropertyChangeToRecords(element, frame, 'start_angle', new_start_angle);
    }
    private linearChangeRadius(element : VisualElement, frame : number, duration : number, new_radius : number) {
        VisualElement.linearChangeEvent(element, frame, duration, 'radius', new_radius, "changeRadius");
    }
    private linearChangeCenter(element : VisualElement, start_frame : number, duration : number, new_center : [number, number]) {
        const change_frame = getFloorNumber(start_frame, element.properties_change_record.get('center'));
        const ChangeFrames = getTransformFrames(this.properties_values_record.get(change_frame)!.center!, new_center, duration);
        for(let i = 1; i <= duration; i++) {
            Animation.at(start_frame + i);
            Animation.do(element, "changeCenter", ChangeFrames[i]);
        }
    }

}

export default Polygon;