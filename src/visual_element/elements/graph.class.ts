import { IGraphSettings, DefaultGraphSettings } from "../default_settings.interface.js";
import { IGraphStyles, DefaultGraphStyles } from "../default_styles.interface.js";
import VisualElement from "../visual_element.class.js";
import Animation from "../../animation.class.js";
import Lib from "../../lib/lib.js";

const { toFixedAs } = Lib.Numbers;
const { transformPointsToDomains, subtractDomains } = Lib.Domains;
const { getTransformFrames } = Lib.Animation;
const { PopRandomElementFromArray } = Lib.Arrays;
const {isRGBColor, StringToRGBTuple, RGBToHSL, HSLTransfromFrames, RGBTupleToString, HSLToRGB, RGBTransfromFrames} = Lib.Colors;

class Graph extends VisualElement {
    constructor(settings : IGraphSettings, styles : IGraphStyles) {
        super();
        this.initializeSettingsAndStyles<IGraphSettings, IGraphStyles>(
            settings,
            styles,
            DefaultGraphSettings,
            DefaultGraphStyles
        );
        this.setDrawStyles()
        this.settings.graph_domains = transformPointsToDomains(this.settings.graph_domains!) as Array<[number, number]>;
        this.settings.unwanted_points_and_domains = transformPointsToDomains(this.settings.unwanted_points_and_domains!) as Array<[number, number]>
        this.domains = this.getDomains();
        this.values = this.getvalues();
        this.points_map = this.getPointsMap();
        this.draw_lines = this.getDrawLines();
    }

    private settings! : IGraphSettings;
    private styles! : IGraphStyles;
    private domains! : Array<[number, number]>;
    private values! : number[][];
    private points_map! : Map<number, number>;
    private draw_lines! : Array<[[number, number], [number, number]]>

    private setDrawStyles() {
        this.ctx.strokeStyle = this.styles.color!;
        this.ctx.lineWidth = this.styles.line_width!;
        this.ctx.translate(this.settings.position![0], this.settings.position![1]);
        
    }
    private getDomains() : Array<[number, number]> {
        let unwanted_domains = this.settings.unwanted_points_and_domains as Array<[number, number]> ;
        let domains = this.settings.graph_domains as Array<[number, number]>;
        for(let unwanted_domain of unwanted_domains) {
            let result : Array<[number, number]> = [];
            for(let domain of domains) {
                if(subtractDomains(domain, unwanted_domain)) {
                    result = result.concat(subtractDomains(domain, unwanted_domain)!)
                }    
            }
            domains = result;
        }
        return domains;
    }
    private transformDomainToValues(domain : [number, number]) {
        const values = [];
        for(
            let i = toFixedAs(domain[0] + this.settings.x_step!, this.settings.x_step!);
            i < toFixedAs(domain[1], this.settings.x_step!);
            i = toFixedAs(i + this.settings.x_step!, this.settings.x_step!)
        ) values.push(i);
        return values;
    }
    private getvalues() {
        const values = [];
        for(let domain of this.domains) {
            values.push(this.transformDomainToValues(domain))
        }
        return values;
    }
    private getPointsMap() {
        const points_map = new Map();
        for(let values_of_domain of this.values) {
            for(let value of values_of_domain) {
                points_map.set(value, toFixedAs(
                    this.settings.expression!(value), Math.pow(10, - this.settings.accuracy)
                ));
            }
        }
        return points_map;
    }
    private isUnwantedLine(from : [number, number], to : [number, number]) {
        if(
            from[0] <= 0 ||
            to[0] > this.settings.width! ||
            from[1] < 0 ||
            from[1] > this.settings.height! ||
            to[1] < 0 ||
            to[1] > this.settings.height!
        ) 
        return true
        else false;
    }
    private getDrawLine(x1 : number, x2 : number) : [[number, number], [number, number]]{
        return [
            this.getCoordinatesOf(x1, this.points_map.get(x1)!),
            this.getCoordinatesOf(x2, this.points_map.get(x2)!),
        ]
    }
    private getDrawLinesOfDomain(domain_values : number[]) {
        const draw_lines : Array<[[number, number], [number, number]]> = [];
        if(domain_values.length > 2)
        for(let i = 0; i < domain_values.length - 1; i++) {
            const line = this.getDrawLine(domain_values[i], domain_values[i + 1])
            // console.log(domain_values[i], domain_values[i + 1])
            if(!this.isUnwantedLine(...line)) draw_lines.push(line);
        }
        
        return draw_lines;
    }
    private getDrawLines() {
        let draw_lines : Array<[[number, number], [number, number]]> = [];
        for(let domain_values of this.values) {
            draw_lines = draw_lines.concat(
                this.getDrawLinesOfDomain(domain_values)
            )
        }
        return draw_lines;
    }
    private drawLine(from : [number, number], to : [number, number]) {
        this.ctx.beginPath();
        this.ctx.moveTo(...from);
        this.ctx.lineTo(...to);
        this.ctx.stroke();
    }
    private draw() {
        this.clear();
        for(const line of this.draw_lines) {
            this.drawLine(...line)
        };
    }
    private changeColor(color : string) {
        if(isRGBColor(color)) {
            this.styles.color = color;
            this.ctx.strokeStyle = color;
            this.clear();
            this.draw();
        }
    }
    private linearChangeColorTo(start_frame : number,  duration : number, new_color : string, type : string = "RGB") {
        let current_frame = Animation.at(start_frame).getNextFrame();
        let color_frames : [number, number, number][] = [];
        if(type == "RGB") {
            let start_color = StringToRGBTuple(this.styles.color!);
            let end_color = StringToRGBTuple(new_color);
            color_frames = RGBTransfromFrames(start_color, end_color, duration);
        }
        else if(type == "HSL") {
            let start_color = RGBToHSL(this.styles.color!);
            let end_color = RGBToHSL(new_color);
            color_frames = HSLTransfromFrames(start_color, end_color, duration);
            color_frames = color_frames.map(color_frame => HSLToRGB(...color_frame));
        }
        for(let color_frame of color_frames) {
            current_frame.doAction(this, 'changeColor', RGBTupleToString(color_frame));
            current_frame = current_frame.getNextFrame();
        }
    }
    private linearDraw(start_frame : number, duration : number) {
        this.clear();
        const draw_lines = this.getDrawLines();
        const lines_per_frame = Math.floor(draw_lines.length / duration);

        let current_frame = Animation.at(start_frame);
        for(let i = 1; i <= draw_lines.length % duration;) {
            current_frame.doAction(this, 'drawLine', ...draw_lines.shift()!);
        }
        current_frame = current_frame.getNextFrame();
        for(let i = 1; i <= duration * lines_per_frame; i++) {
            current_frame.doAction(this, 'drawLine', ...draw_lines.shift()!);
            if(i % lines_per_frame == 0) current_frame = current_frame.getNextFrame();
        }
        console.log(Animation.frames)
    }
    private randomDraw(frame : number, duration :number) {
        this.clear();
        const draw_lines = this.getDrawLines();
        const lines_per_frame = Math.floor(draw_lines.length / duration);
        let current_frame = Animation.at(frame);
        for(let i = 1; i <= draw_lines.length % duration;) {
            current_frame.doAction(this, 'drawLine', ...draw_lines.shift()!);
        }
        current_frame = current_frame.getNextFrame();
        for(let i = 1; i <= (duration * lines_per_frame); i++) {
            current_frame.doAction(this, 'drawLine', ...PopRandomElementFromArray(draw_lines));
            if(i % lines_per_frame == 0) current_frame = current_frame.getNextFrame();
        }
    }

}

export default Graph;