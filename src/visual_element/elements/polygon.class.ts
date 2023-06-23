import { IPolygonElement } from "../properties.interface.js";
import { DefaultPolygonProperties } from "../default_properties.object.js";
import VisualElement from "../visual_element.class.js";
import Animation from "../../animation.class.js";
import Lib from "../../lib/lib.js"

const { pi } = Lib.Constants;
const { cos, sin } = Lib.Funcs;
const { getTransformFrames } = Lib.Animation;
const { StringToRGBTuple, RGBTupleToString, RGBToHSL, RGBTransfromFrames, HSLToRGB, HSLTransfromFrames, isRGBColor } = Lib.Colors

class Polygon extends VisualElement {
    constructor(properties : IPolygonElement) {
        super();
        this.initializeProperties<IPolygonElement>(properties, DefaultPolygonProperties);
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
            if(this.properties.draw_type == "stroke" ) this.ctx.stroke()
            else this.ctx.fill()
            this.ctx.beginPath()      
    }
    private changeRadiusTo(new_radius : number) {
        this.properties.radius = new_radius;
        this.points = this.getPoints();
        this.draw();
    }
    private changeRotationTo(new_rotation : number) {
        this.properties.rotation = new_rotation;
        this.angles = this.getAngles();
        this.points = this.getPoints();
        this.draw();
    }
    private changeColor(color : string) {
        if(isRGBColor(color)) {
            this.properties.color = color;
            this.ctx.strokeStyle = color;
            this.clear();
            this.draw();
        }
    }
    private linearRadiusTo(start_frame : number, duration : number, new_radius : number) {
        const radiusChangeFrames = getTransformFrames(this.properties.radius!, new_radius, duration);
        let frame = Animation.at(start_frame);
        for(let i = 0; i <= duration; i++) {
            frame.doAction(this, "changeRadiusTo", radiusChangeFrames[i]);
            frame = frame.getNextFrame();
        }
    }
    private linearRotationBy(start_frame : number, duration : number, rotation : number) {
        const rotationChangeFrames = getTransformFrames(this.properties.rotation!, this.properties.rotation! + rotation, duration);
        let frame = Animation.at(start_frame);
        for(let i = 0; i <= duration; i++) {
            frame.doAction(this, "changeRotationTo", rotationChangeFrames[i]);
            frame = frame.getNextFrame();
        }
    }
    private linearChangeColorTo(start_frame : number,  duration : number, new_color : string, type : string = "RGB") {
        if(this.properties.gradient_enabled) return;
        let current_frame = Animation.at(start_frame).getNextFrame();
        let color_frames : [number, number, number][] = [];
        let old_color = "";
        if(this.properties.draw_type == "stroke" ) old_color = this.properties.stroke_color!;
        else old_color = this.properties.stroke_color!
        if(type == "RGB") {
            
            let start_color = StringToRGBTuple(old_color);
            let end_color = StringToRGBTuple(new_color);
            color_frames = RGBTransfromFrames(start_color, end_color, duration);
        }
        else if(type == "HSL") {
            let start_color = RGBToHSL(old_color);
            let end_color = RGBToHSL(new_color);
            color_frames = HSLTransfromFrames(start_color, end_color, duration);
            color_frames = color_frames.map(color_frame => HSLToRGB(...color_frame));
        }
        for(let color_frame of color_frames) {
            current_frame.doAction(this, 'changeColor', RGBTupleToString(color_frame));
            current_frame = current_frame.getNextFrame();
        }
    }
}

export default Polygon;