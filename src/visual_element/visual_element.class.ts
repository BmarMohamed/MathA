import Animation from "../animation.class.js";
import { Render } from "./default_properties.object.js";
import { IStroke, } from "./properties.interface.js";

class VisualElement {
    [key : string] : any;
    constructor() {
        this.id = VisualElement.visual_element_id++;
        this.initialize();
    }

    private static visual_element_id = 0;
    protected id! : number; 
    protected canvas! :  HTMLCanvasElement;
    protected ctx! : CanvasRenderingContext2D;
    protected isVisible! : boolean;

    private initialize() {
        this.canvas = document.createElement("canvas");
        this.canvas.id = `@__VisualElement${this.id}__@`;
        this.canvas.style.cssText = `
            display : inline-block;
            position : absolute;
        `;
        this.canvas.width = Animation.getProperties().resolution[0];
        this.canvas.height = Animation.getProperties().resolution[1];
        this.ctx = this.canvas.getContext('2d')!;
        this.show();
        document.getElementById("@__MathAnimation__@")!.appendChild(this.canvas);
    }
    protected initializeProperties<IPropertiesType>(properties : IPropertiesType, default_properties : IPropertiesType) {
        this.properties = { ...default_properties }
        this.properties.height = Render.height;
        this.properties.width = Render.width;
        for(let property in properties) this.properties[property] = properties[property];
    }
    protected applyStyles() {
        if(this.properties.stroke_color) this.ctx.strokeStyle = this.properties.stroke_color!;
        if(this.properties.fill_color) this.ctx.fillStyle = this.properties.fill_color!;
        if(this.properties.line_width) this.ctx.lineWidth = this.properties.line_width!;
        if(this.properties.position) this.ctx.translate(this.properties.position![0], this.properties.position![1]);
        if(this.properties.gradient_enabled) {
            const gradient = this.ctx.createLinearGradient(
                ...this.getCoordinatesOf(...this.properties.gradient_start_position! as [number, number]),
                ...this.getCoordinatesOf(...this.properties.gradient_end_position! as [number, number])
            )
            for(const color in this.properties.gradient_colors!) {
                gradient.addColorStop(this.properties.gradient_colors![color], color)
            }
            this.ctx.strokeStyle = gradient;
            this.ctx.fillStyle = gradient;
        }
        if(this.properties.opacity) this.ctx.globalAlpha = this.properties.opacity!;
        if(this.properties.text) {
            this.ctx.font = `${this.properties.font_weight!} ${this.properties.font_size!}px ${this.properties.font_family!}`;
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.direction = this.properties.text_direction!;
        }
    }
    protected getCoordinatesOf(x : number, y : number) : [number, number] {
        return [
            (x - this.properties.domain[0]) * this.properties.width / (this.properties.domain[1] - this.properties.domain[0]),
            (this.properties.range[1] - y) * this.properties.height / (this.properties.range[1] - this.properties.range[0]),
        ]
    }   
    protected show() {
        this.canvas.style.display = "inline_block";
        this.isVisible = true;
    }
    protected hide() {
        this.canvas.style.display = "none";
        this.isVisible = false;
    }
    protected clear() {
        this.ctx.clearRect(0, 0, this.properties.width, this.properties.height);
    }
}

export default VisualElement;