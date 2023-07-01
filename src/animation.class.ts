import VisualElement from "./visual_element/visual_element.class.js";
import { Render } from "./visual_element/default_properties.object.js";
import Queue from "./lib/classes/data_structures/queue.class.js";

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
    public getFrameId() {
        return this.id;
    }
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

export enum AnimationActions {
    Stop,
    Pause,
    Continue,
    Goto,
    Speed,
}

class AnimationAction {
    constructor(action_type : AnimationActions, frame : number, params : {
        duration? : number,
        goto_frame? : number,
        speed? : number
    } = {}) {
        this.frame = frame;
        this.action_type = action_type;
        this.params = params;
    }
    private frame! : number;
    public action_type! : number;
    private params! : {
        duration? : number,
        goto_frame? : number,
        speed? : number
    };
    public getFrame() {
        return this.frame;
    }
    public static stop() {
        clearInterval(Animation.animation_interval!);
    }
    public static continue() {
        Animation.start();
    }
    public static pause(duration : number) {
        this.stop()
        setTimeout(() => {
            this.continue();
        }, duration);
    }
    public static goto(goto_frame : number) {
        this.stop();
        Animation.current_frame = goto_frame
        this.continue();
    }
    public static speed(speed : number) {
        this.stop();
        Animation.frame_duration /= speed;
        this.continue();
    }
    public execute() {
        if(this.action_type === AnimationActions.Stop) AnimationAction.stop();
        else if(this.action_type === AnimationActions.Pause) AnimationAction.pause(this.params.duration || 0);
        else if(this.action_type === AnimationActions.Continue) AnimationAction.continue();
        else if(this.action_type === AnimationActions.Goto) AnimationAction.goto(this.params.goto_frame || 0);
        else if(this.action_type === AnimationActions.Speed) AnimationAction.speed(this.params.speed || 1);
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
    private static animation_actions_queue : Queue<AnimationAction>;

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
        this.animation_actions_queue = new Queue();
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
    public static addAnimationAction(action_type : AnimationActions, frame : number, params : {
        duration? : number,
        goto_frame? : number,
        speed? : number
    } = {}) {
        let action = new AnimationAction(action_type, frame, params);
        this.animation_actions_queue.queue(action);
    }
    private static initializeFrames() {
        for(let i = 0 ; i < this.fps * this.duration; i++) this.frames.push(new Frame());
        for(let i = 0 ; i < this.fps * this.duration; i++) 
            this.at(i).setNextFrame(
                this.at(i + 1)
            );
    }
    public static executeAnimationActions(frame_number : number) {
        if(this.animation_actions_queue.length === 0) return;
        if(this.animation_actions_queue.getCurrent().getFrame() === frame_number) {
            this.animation_actions_queue.dequeue()!.execute();
            this.executeAnimationActions(frame_number);
        }
    }
//===============================================================================================
    public static animation_interval : number | null;
    public static current_frame : number = 0;
    public static frame_duration : number = 1000 / Animation.fps;
    public static start() {
        let frame = this.frames[this.current_frame];
        this.animation_interval = setInterval(() => {
            frame.prepare();
            frame.execute();
            this.executeAnimationActions(frame.getFrameId());
            if(frame !== frame.getNextFrame()) {
                frame = frame.getNextFrame();
                this.current_frame = frame.getFrameId();
            }
            else AnimationAction.stop();
        }, this.frame_duration);
    }
//===============================================================================================

}

export default Animation;