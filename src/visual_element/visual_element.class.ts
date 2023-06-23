import Animation from "../animation.class.js";
import { Render } from "./default_properties.object.js";

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
            transform: scale(1, -1);
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
    protected getCoordinatesOf(x : number, y : number) : [number, number] {
        return [
            (x - this.properties.domain[0]) * this.properties.width / (this.properties.domain[1] - this.properties.domain[0]),
            (y - this.properties.range[0]) * this.properties.height / (this.properties.range[1] - this.properties.range[0]),
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