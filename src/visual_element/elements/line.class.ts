import { ILineElement } from "../properties.interface.js";
import { DefaultLineProperties } from "../default_properties.object.js";
import VisualElement from "../visual_element.class.js";
import Animation from "../../animation.class.js";

import Lib from "../../lib/lib.js";
const {getTransformFrames} = Lib.Animation;
const {isRGBColor, StringToRGBTuple, RGBToHSL, HSLTransfromFrames, RGBTupleToString, HSLToRGB, RGBTransfromFrames} = Lib.Colors;

class Line extends VisualElement {
    constructor(properties : ILineElement) {
        super();
        this.initializeProperties<ILineElement>(properties, DefaultLineProperties);
        this.applyStyles();
        this.points = this.getPoints()
        
    }

    private properties! : ILineElement;
    private points! : [[number, number], [number, number]];

    private getPoints() : [[number, number], [number, number]] {
        return [
            this.getCoordinatesOf(...this.properties.from!) as [number, number],
            this.getCoordinatesOf(...this.properties.to!) as [number, number]
        ]
    }
    private draw() {
        this.clear()
            this.ctx.beginPath();
            this.ctx.moveTo(...this.points[0]);
            this.ctx.lineTo(...this.points[1]);
            this.ctx.stroke();
    }
    private changeCoordinates(from : [number, number], to : [number, number]) {
        this.properties.from = from;
        this.properties.to = to;
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
    private linearChangeCoordinates(start_frame : number, duration : number, new_from : [number, number], new_to : [number, number]) {
        const xFromChangeFrames = getTransformFrames(this.properties.from![0], new_from[0], duration);
        const yFromChangeFrames = getTransformFrames(this.properties.from![1], new_from[1], duration);
        const xToChangeFrames = getTransformFrames(this.properties.to![0], new_to[0], duration);
        const yToChangeFrames = getTransformFrames(this.properties.to![1], new_to[1], duration);
        let frame = Animation.at(start_frame);
        for(let i = 0; i <= duration; i++) {
            frame.doAction(this, "changeCoordinates", [xFromChangeFrames[i], yFromChangeFrames[i]], [xToChangeFrames[i], yToChangeFrames[i]]);
            frame.doAction(this, "draw");
            frame = frame.getNextFrame();
        }
    }
    private linearChangeColorTo(start_frame : number,  duration : number, new_color : string, type : string = "RGB") {
        if(this.properties.gradient_enabled) return;
        let current_frame = Animation.at(start_frame).getNextFrame();
        let color_frames : [number, number, number][] = [];
        if(type == "RGB") {
            let start_color = StringToRGBTuple(this.properties.stroke_color!);
            let end_color = StringToRGBTuple(new_color);
            color_frames = RGBTransfromFrames(start_color, end_color, duration);
        }
        else if(type == "HSL") {
            let start_color = RGBToHSL(this.properties.stroke_color!);
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

export default Line;