import Animation from "../animation.class.js";
import { DefaultVisualElementSettings } from "./default_settings.interface.js";

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
    protected initializeSettingsAndStyles<Tsettings, Tstyles>(settings : Tsettings, styles : Tstyles, default_settings : Tsettings, default_styles : Tstyles) {
        this.settings = default_settings;
        this.styles = default_styles;
        for(let setting in settings) this.settings[setting] = settings[setting];
        for(let style in styles) this.styles[style] = styles[style];
    }
    protected getCoordinatesOf(x : number, y : number) {
        return [
            (x - this.settings.domain[0]) * this.settings.width / (this.settings.domain[1] - this.settings.domain[0]),
            (y - this.settings.range[0]) * this.settings.height / (this.settings.range[1] - this.settings.range[0]),
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
}

export default VisualElement;