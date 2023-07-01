import VisualElement from "./visual_element/visual_element.class.js";
import { Render } from "./visual_element/default_properties.object.js";

class Frame {
    constructor() {
        this.id = Frame.frame_id++;
        this.actions = [];
    }

    private static frame_id : number = 0;
    private id! : number;
    private next! : Frame | null;
    private actions! : {
        element : VisualElement;
        event : string;
        params : any[];
    }[];

    public setNextFrame(frame : Frame){
        return this.next = frame;
    }
    public getNextFrame() {
        return this.next || this;
    }
    public do(element : VisualElement, event : string, ...params : any) {
        this.actions.push({
            element, 
            event, 
            params : [element, this.id, ...params]
        })
        return this;
    }
    public doAction(element : VisualElement, event : string, ...params : any) {
        this.actions.push({
            element, 
            event, 
            params : [element, ...params]
        })
        return this;
    }
    public prepare() {
        let elements : Set<VisualElement> = new Set();
        for(let action of this.actions) elements.add(action.element);
        for(let element of elements) this.doAction(element, "draw");
    }
    public execute() {
        for(const action of this.actions) {
            action.element[action.event](...action.params);
        }
    }
}

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
        this.initializeFrames();
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
    public static frames : Frame[] = [new Frame()];
    public static at(index : number) {
        return this.frames[index] || this.frames[0]!;
    }
    private static initializeFrames() {
        for(let i = 0 ; i < this.fps * this.duration; i++) this.frames.push(new Frame());
        for(let i = 0 ; i < this.fps * this.duration; i++) 
            this.at(i).setNextFrame(
                this.at(i + 1)
            );
    }
//===============================================================================================
    public static start() {
        let frame = this.at(0)
        const interval = setInterval(() => {
            frame.prepare();
            frame.execute();
            if(frame !== frame.getNextFrame()) frame = frame.getNextFrame();
            else clearInterval(interval);
        }, 1000 / Animation.fps);
    }
//===============================================================================================

}

export default Animation;