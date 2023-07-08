import VisualElement from "./visual_element/visual_element.class.js";
import { Render } from "./visual_element/default_properties.object.js";
import Queue from "./lib/classes/data_structures/queue.class.js";

class Animation {
    static [key : string] : any;
    constructor() {}
    private static fps : number = 60;
    private static duration : number = 10;
    private static resolution : [ number, number ] = [ 1280, 720 ];
    private static background : string = "#000000";
    private static parent : HTMLElement = document.body;
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
    private static initialized : boolean = false;
    public static initialize() {
        this.initialized = true;
        this.initializeHtml();
        Render.width = this.getProperties().resolution[0];
        Render.height = this.getProperties().resolution[1];
    }
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
    public static changesMap : Map<number, Set<VisualElement>> = new Map();
    public static actions_queue : Queue<[number, string, number]> = new Queue();
    public static currentFrame = 0;
    public static at(frame : number) {
        this.currentFrame = frame
        return Animation;
    }
    public static do(element : VisualElement, action : string, ...params : any[]) {
        const frame = Animation.currentFrame;
        if(action !== 'draw') element[action](element, Animation.currentFrame, ...params);
        Animation.changesMap.has(Animation.currentFrame)?
        Animation.changesMap.get(Animation.currentFrame)!.add(element) :
        Animation.changesMap.set(Animation.currentFrame, new Set([element]));
        return this.at(frame);
    }
    public static doAction(frame : number, action : string, param : number = 0) {
        this.actions_queue.queue([frame, action, param])
        return this;
    }
    public static is_animation_running : boolean = false;
    public static running_frame : number = 0;
    public static running_speed : number = 1;
    public static last_frame_before_stop : number = 0;
    public static animation_actions_frame : number = 0;
    public static start() {
        this.is_animation_running = true;
        setInterval(() => {
            if(this.changesMap.has(Math.floor(this.running_frame)) && this.is_animation_running) {
                for(let element of this.changesMap.get(Math.floor(this.running_frame))!) {
                    element.update(Math.floor(this.running_frame))
                }
            }
            while(this.actions_queue.getLength() > 0 && this.actions_queue.currentElement()[0] === this.animation_actions_frame) {
                const element = this.actions_queue.dequeue()!;
                this[element[1]](element[2]);
            }
            this.animation_actions_frame++;
            this.running_frame += this.running_speed;
            
        }, 1000 / Animation.fps);
    }
    public static readonly actions = {
        goto : 'goto',
        stop : 'stop',
        continue : 'continue',
        pause : 'pause',
        reverse : 'reverse',
    }
    public static goto(frame : number) {
        this.running_frame = frame;
    }
    public static stop() {
        this.last_frame_before_stop = this.running_frame;
        this.is_animation_running = false;
    }
    public static continue() {
        this.running_frame = this.last_frame_before_stop;
        this.is_animation_running = true;
    }
    public static pause(duration : number) {
        this.stop();
        setTimeout(() => this.continue(), duration * 1000)
    }
    public static reverse() {
        this.running_speed *= -1;
    }
}

export default Animation;