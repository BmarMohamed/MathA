import VisualElement from "./visual_element/visual_element.class.js";
import { Render } from "./visual_element/default_properties.object.js";

class Animation {
    constructor() {}
//===============================================================================================
    private static fps : number = 60;
    private static duration : number = 10;
    private static resolution : [ number, number ] = [ 1280, 720 ];
    private static background : string = "#000000";
    private static parent : HTMLElement = document.body;
//===============================================================================================
    public static getProperties() {
        return {
            fps : this.fps,
            duration : this.duration,
            resolution : this.resolution,
            background : this.background,
            parent : this.parent,
        }
    }
    public static setFps(fps : number) {
        if(!this.initialized) this.fps = fps;
    }
    public static setDuration(duration : number) {
        if(!this.initialized) this.duration = duration;
    }
    public static setResolution(resolution : [ number, number ]) {
        if(!this.initialized) this.resolution = resolution;
    }
    public static setBackground(background : string) {
        if(!this.initialized) this.background = background;
    }
    public static setParent(parent : HTMLElement) {
        if(!this.initialized) this.parent = parent;
    }
//===============================================================================================
    private static initialized : boolean = false;
    public static initialize() {
        this.initialized = true;
        this.initializeHtml();
        Render.width = this.getProperties().resolution[0];
        Render.height = this.getProperties().resolution[1];
    }
//===============================================================================================  
    private static html : HTMLDivElement;
    private static initializeHtml() {
        this.html = document.createElement("div");
        this.html.id = "@__MathAnimation__@";
        this.html.style.cssText = `
            display : inline-block;
            position : relative;
            width : ${this.getProperties().resolution[0]}px;
            height : ${this.getProperties().resolution[1]}px;
            background : ${this.getProperties().background};
        `;
        this.parent.appendChild(this.html);
    }
//===============================================================================================   
    public static changesMap : Map<number, Set<VisualElement>> = new Map();
    public static currentFrame = 0;
    public static at(frame : number) {
        this.currentFrame = frame
        return Animation;
    }
    public static do(element : VisualElement, action : string, ...params : any[]) {
        element[action](element, Animation.currentFrame, ...params);
        Animation.changesMap.has(Animation.currentFrame)?
        Animation.changesMap.get(Animation.currentFrame)!.add(element) :
        Animation.changesMap.set(Animation.currentFrame, new Set([element]));
        return Animation;
    }
    public static start(frame : number = 0, step : number = 1) {
        let current_frame = frame;
        let current_step = step;
        const interval = setInterval(() => {
            if(this.changesMap.has(Math.floor(current_frame))) {
                for(let element of this.changesMap.get(Math.floor(current_frame))!) {
                    element.update(Math.floor(current_frame))
                }
            }
            current_frame =  current_frame + current_step;
        }, 1000 / Animation.fps);
    }
//===============================================================================================

}

export default Animation;