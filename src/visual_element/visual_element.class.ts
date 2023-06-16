import Animation from "../animation.class.js";

class VisualElement {
    [key : string] : any;
    constructor() {
        this.id = VisualElement.visual_element_id++;
        this.initialize();
        console.log(Animation.getProperties().resolution[0])
    }

    private static visual_element_id = 0;
    protected id! : number; 
    protected canvas! :  HTMLCanvasElement;
    protected ctx! : CanvasRenderingContext2D;
    protected isVisible! : boolean;

    private initialize() {
        console.log(Animation.getProperties().resolution[0])
        this.canvas = document.createElement("canvas");
        this.canvas.id = `@__VisualElement${this.id}__@`;
        this.canvas.style.cssText = `
            display : inline-block;
            position : absolute;
            width : ${Animation.getProperties().resolution[0]}px;
            height : ${Animation.getProperties().resolution[1]}px;
        `;
        this.show();
        document.getElementById("@__MathAnimation__@")!.appendChild(this.canvas);
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