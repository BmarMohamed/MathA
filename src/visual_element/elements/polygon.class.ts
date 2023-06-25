import { IPolygonElement } from "../properties.interface.js";
import { DefaultPolygonProperties } from "../default_properties.object.js";
import VisualElement from "../visual_element.class.js";
import Animation from "../../animation.class.js";
import RenderEvents from "../events/render.event.js";
import DrawStyleEvents from "../events/draw_style.event.js";
import Lib from "../../lib/lib.js"

const { pi } = Lib.Constants;
const { cos, sin } = Lib.Funcs;
const { getTransformFrames } = Lib.Animation;
// const { StringToRGBTuple, RGBTupleToString, RGBToHSL, RGBTransfromFrames, HSLToRGB, HSLTransfromFrames, isRGBColor } = Lib.Colors

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
    private angles! : number[];
    private points! : [number,number][];

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
            points.push([this.properties.origin![0] - this.properties.radius! * cos(angle), this.properties.origin![0] + this.properties.radius! * sin(angle)])
        }
        return points;
    }
    private draw() {
        this.clear()
        const coordinates : [number, number][] = [];
        for(let point of this.points) coordinates.push(this.getCoordinatesOf(...point) as [number, number])
            this.ctx.beginPath();
            this.ctx.moveTo(...coordinates[0])
            for(let i = 1; i < coordinates.length - 1; i++) {
                this.ctx.lineTo(...coordinates[i])
            }
            if(this.properties.draw_style == "stroke" ) this.ctx.stroke()
            else this.ctx.fill()
            this.ctx.beginPath()      
    }
    private changeRadius(element : VisualElement, new_radius : number) {
        this.properties.radius = new_radius;
        this.points = this.getPoints();
        this.draw();
    }
    private changeRotationTo(element : VisualElement, new_rotation : number) {
        this.properties.rotation = new_rotation;
        this.angles = this.getAngles();
        this.points = this.getPoints();
        this.draw();
    } 
    private linearChangeRadius(element : VisualElement, start_frame : number, duration : number, new_radius : number) {
        VisualElement.linearChangeEvent(element, start_frame, duration, {"radius" : [element.properties, new_radius, "changeRadius"]})
    }
    private linearRotationBy(element : VisualElement, start_frame : number, duration : number, rotation : number) {
        const rotationChangeFrames = getTransformFrames(this.properties.rotation!, this.properties.rotation! + rotation, duration);
        let frame = Animation.at(start_frame);
        for(let i = 0; i <= duration; i++) {
            frame.doAction(this, "changeRotationTo", rotationChangeFrames[i]);
            frame = frame.getNextFrame();
        }
    }
}

export default Polygon;