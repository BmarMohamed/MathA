import { IPolygonSettings, DefaultPolygonSettings } from "../default_settings.interface.js";
import { IPolygonStyles, DefaultPolygonStyles } from "../default_styles.interface.js";
import VisualElement from "../visual_element.class.js";
import Animation from "../../animation.class.js";
import Lib from "../../lib/lib.js"

const { pi } = Lib.Constants;
const { cos, sin } = Lib.Funcs;
const { getTransformFrames } = Lib.Animation;
const { StringToRGBTuple, RGBTupleToString, RGBToHSL, RGBTransfromFrames, HSLToRGB, HSLTransfromFrames, isRGBColor } = Lib.Colors

class Polygon extends VisualElement {
    constructor(settings : IPolygonSettings, styles : IPolygonStyles) {
        super();
        this.initializeSettingsAndStyles<IPolygonSettings, IPolygonStyles>(
            settings,
            styles,
            DefaultPolygonSettings,
            DefaultPolygonStyles
        );
        this.setDrawStyles();
        this.angles = this.getAngles();
        this.points = this.getPoints()
    }

    private settings! : IPolygonSettings;
    private styles! : IPolygonStyles;
    private angles! : number[];
    private points! : [number,number][];

    private setDrawStyles() {
        this.ctx.strokeStyle = this.styles.color!;
        this.ctx.lineWidth = this.styles.line_width!;
    }
    private getAngles() {
        let angles : number[] = [this.settings.rotation!];
        if(typeof this.settings.angles === 'number') {
            const mod = 360 % this.settings.angles! as number;
            const div = Math.floor(360 / this.settings.angles! as number);
            for(let i = 0; i < div; i++) angles.push(this.settings.angles! as number)
            angles.push(mod);
        }
        else angles = angles.concat(this.settings.angle as number[]);
        for(let i = 1; i < angles.length; i++) angles[i] += angles[i - 1]
        for(let i = 0; i < angles.length; i++) angles[i] = angles[i] * pi / 180;
        return angles;
    }
    private getPoints() {
        const points : [number, number][] = [];
        for(let i = 0; i < this.angles.length; i++) {
            let angle = pi - this.angles[i];
            points.push([this.settings.origin![0] - this.settings.radius! * cos(angle), this.settings.origin![0] + this.settings.radius! * sin(angle)])
        }
        return points;
    }
    private draw() {
        this.clear()
        const coordinates : [number, number][] = [];
        for(let point of this.points) coordinates.push(this.getCoordinatesOf(...point) as [number, number])
        for(let i = 0; i < coordinates.length - 1; i++) {
            this.ctx.beginPath()
            this.ctx.moveTo(...coordinates[i])
            this.ctx.lineTo(...coordinates[i + 1])
            this.ctx.stroke()
        }
    }
    private changeRadiusTo(new_radius : number) {
        this.settings.radius = new_radius;
        this.points = this.getPoints();
    }
    private changeRotationTo(new_rotation : number) {
        this.settings.rotation = new_rotation;
        this.angles = this.getAngles();
        this.points = this.getPoints();
    }
    private changeColor(color : string) {
        if(isRGBColor(color)) {
            this.styles.color = color;
            this.ctx.strokeStyle = color;
            this.clear();
            this.draw();
        }
    }
    private linearRadiusTo(start_frame : number, duration : number, new_radius : number) {
        const radiusChangeFrames = getTransformFrames(this.settings.radius!, new_radius, duration);
        let frame = Animation.at(start_frame);
        for(let i = 0; i <= duration; i++) {
            frame.doAction(this, "changeRadiusTo", radiusChangeFrames[i]);
            frame.doAction(this, "draw");
            frame = frame.getNextFrame();
        }
    }
    private linearRotationBy(start_frame : number, duration : number, rotation : number) {
        const rotationChangeFrames = getTransformFrames(this.settings.rotation!, this.settings.rotation! + rotation, duration);
        let frame = Animation.at(start_frame);
        for(let i = 0; i <= duration; i++) {
            frame.doAction(this, "changeRotationTo", rotationChangeFrames[i]);
            frame.doAction(this, "draw");
            frame = frame.getNextFrame();
        }
    }
    private linearChangeColorTo(start_frame : number,  duration : number, new_color : string, type : string = "RGB") {
        let current_frame = Animation.at(start_frame).getNextFrame();
        let color_frames : [number, number, number][] = [];
        if(type == "RGB") {
            let start_color = StringToRGBTuple(this.styles.color!);
            let end_color = StringToRGBTuple(new_color);
            color_frames = RGBTransfromFrames(start_color, end_color, duration);
        }
        else if(type == "HSL") {
            let start_color = RGBToHSL(this.styles.color!);
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