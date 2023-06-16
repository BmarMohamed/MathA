class Frame {
    constructor() {}
    private next! : Frame | null;
    public setNextFrame = (frame : Frame) => this.next = frame;
    public getNextFrame = () => this.next || this; 
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
        Animation.initializeHtml();
        Animation.initializeFrames();
    }
//===============================================================================================  
    private static html : HTMLDivElement;
    private static initializeHtml() {
        this.html = document.createElement("div");
        this.html.id = "@__MathAnimation__@";
        this.html.style.cssText = `
            display : inline-block;
            position : absolute;
            width : ${this.getProperties().resolution[0]}px;
            height : ${this.getProperties().resolution[1]}px;
            background : ${this.getProperties().background};
        `;
        this.parent.appendChild(this.html);
    }
//===============================================================================================   
    private static frames : Frame[] = [new Frame()];
    public static getFrame(index : number) {
        return this.frames[index] || this.frames[0]!;
    }
    private static initializeFrames() {
        for(let i = 0 ; i < this.fps * this.duration; i++) this.frames.push(new Frame());
        for(let i = 0 ; i < this.fps * this.duration; i++) 
            this.getFrame(i).setNextFrame(
                this.getFrame(i + 1)
            );
    }
//===============================================================================================

}

export default Animation;