import Animation from "../animation.class.js";
import { Render } from "./default_properties.object.js";
import Lib from "../lib/lib.js";
import Events from "./events/event.js";
const { getTransformFrames } = Lib.Animation;
const { Multiply2By2Matrics, findIndexOf } = Lib.Arrays;

class VisualElement {
    [key : string] : any;
    constructor() {
        this.id = VisualElement.visual_element_id++;
        this.initialize();
    }
    private static visual_element_id = 0;
    protected id! : number; 
    public canvas! :  HTMLCanvasElement;
    public ctx! : CanvasRenderingContext2D;
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
        this.properties_change_record = new Map();
        for(let property in this.properties) this.properties_change_record.set(property, [0]);
        this.properties_values_record = new Map([[0, this.properties]]);
    }
    protected initializeEvents(events_objects : Events[]) {
        for(let events of events_objects)
            for(let event in events) this[event] = events[event];
    }
    public addPropertyChangeToRecords(element : VisualElement, frame : number, property : string, value : any) {
        element.properties_change_record.get(property)!.push(frame);
        if(!element.properties_values_record.has(frame))
            element.properties_values_record.set(frame, {})
        element.properties_values_record.get(frame)![property] = value;
    }
    protected getPropertiesAt(frame : number) {
        const properties : {[key : string] : any} = {};
        for(let property in this.properties) {
            const property_change_array = this.properties_change_record.get(property)! as number[];
            let current_frame = findIndexOf(frame, property_change_array);
            properties[property] = this.properties_values_record.get(current_frame)[property];
        }
        return properties;
    }
    public getCoordinatesOf(x : number, y : number) : [number, number] {
        const result_matrix = Multiply2By2Matrics(this.properties.matrix, [[x, y], [0, 0]])
        x = result_matrix[0][0];
        y = result_matrix[0][1];
        return [
            (x - this.properties.domain[0]) * this.properties.width / (this.properties.domain[1] - this.properties.domain[0]),
            (this.properties.range[1] - y) * this.properties.height / (this.properties.range[1] - this.properties.range[0]),
        ]
    }
    protected applyStyles() {
        if(this.properties.stroke_color) this.ctx.strokeStyle = this.properties.stroke_color!;
        if(this.properties.fill_color) this.ctx.fillStyle = this.properties.fill_color!;
        if(this.properties.line_width) this.ctx.lineWidth = this.properties.line_width!;
        if(this.properties.position) this.ctx.translate(this.properties.position![0], this.properties.position![1]);
        if(this.properties.gradient_colors) {
            const gradient = this.ctx.createLinearGradient(
                ...this.getCoordinatesOf(...this.properties.gradient_start_position! as [number, number]),
                ...this.getCoordinatesOf(...this.properties.gradient_end_position! as [number, number])
            )
            for(const color in this.properties.gradient_colors!) {
                gradient.addColorStop(this.properties.gradient_colors![color], color)
            }
            if(this.properties.apply_gradient_on == "stroke" || this.properties.apply_gradient_on == "both") this.ctx.strokeStyle = gradient;
            if(this.properties.apply_gradient_on == "fill" || this.properties.apply_gradient_on == "both") this.ctx.fillStyle = gradient;
        }
        if(this.properties.opacity) this.ctx.globalAlpha = this.properties.opacity!;
        if(this.properties.text) {
            this.ctx.font = `${this.properties.font_weight!} ${this.properties.font_size!}px ${this.properties.font_family!}`;
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.direction = this.properties.text_direction!;
        }
    }
    public static linearChangeEvent(element : VisualElement, frame : number, duration : number, property : string, new_value : number | number[], change_event : string) {
        const initial_value = element.properties_values_record.get(findIndexOf(frame, element.properties_change_record.get(property)!))![property]!;
        const transform_frames = getTransformFrames(initial_value, new_value, duration);
        for(let i = 1; i <= duration; i++) Animation.at(frame + i).do(element, change_event, transform_frames[i]);
    }
    protected clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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