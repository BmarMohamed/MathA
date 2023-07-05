// import { IGraphElement } from "../properties.interface.js";
// import { DefaultGraphProperties } from "../default_properties.object.js";
// import VisualElement from "../visual_element.class.js";
// import Animation from "../../animation.class.js";
// import Lib from "../../lib/lib.js";
// import RenderEvents, { RenderEventsList } from "../events/render.event.js";
// import DrawStyleEvents, { DrawStyleEventsList } from "../events/draw_style.event.js";
// const { toFixedAs } = Lib.Numbers;
// const { transformPointsToDomains, subtractDomains } = Lib.Domains;
// const { PopRandomElementFromArray } = Lib.Arrays;

// class Graph extends VisualElement {
//     constructor(properties : IGraphElement) {
//         super();
//         this.initializeProperties(properties, DefaultGraphProperties);
//         this.applyStyles();
//         this.initializeEvents([RenderEvents, DrawStyleEvents]);

//         this.domains = this.getDomains();
//         this.values = this.getvalues();
//         this.points_map = this.getPointsMap();
//         this.draw_lines = this.getDrawLines();
//     }

//     private properties! : IGraphElement;
//     private properties_change_record! : Map<string, number[]>;
//     private properties_values_record! : Map<number, IGraphElement>;
//     private domains! : Array<[number, number]>;
//     private values! : number[][];
//     private points_map! : Map<number, number>;
//     private draw_lines! : Array<[[number, number], [number, number]]>

//     private getDomains() : Array<[number, number]> {
//         this.properties.graph_domains = transformPointsToDomains(this.properties.graph_domains!) as Array<[number, number]>;
//         this.properties.unwanted_points_and_domains = transformPointsToDomains(this.properties.unwanted_points_and_domains!) as Array<[number, number]>
//         let unwanted_domains = this.properties.unwanted_points_and_domains as Array<[number, number]> ;
//         let domains = this.properties.graph_domains as Array<[number, number]>;
//         for(let unwanted_domain of unwanted_domains) {
//             let result : Array<[number, number]> = [];
//             for(let domain of domains) {
//                 if(subtractDomains(domain, unwanted_domain)) {
//                     result = result.concat(subtractDomains(domain, unwanted_domain)!)
//                 }    
//             }
//             domains = result;
//         }
//         return domains;
//     }
//     private transformDomainToValues(domain : [number, number]) {
//         const values = [];
//         for(
//             let i = toFixedAs(domain[0] + this.properties.x_step!, this.properties.x_step!);
//             i < toFixedAs(domain[1], this.properties.x_step!);
//             i = toFixedAs(i + this.properties.x_step!, this.properties.x_step!)
//         ) values.push(i);
//         return values;
//     }
//     private getvalues() {
//         const values = [];
//         for(let domain of this.domains) {
//             values.push(this.transformDomainToValues(domain))
//         }
//         return values;
//     }
//     private getPointsMap() {
//         const points_map = new Map();
//         for(let values_of_domain of this.values) {
//             for(let value of values_of_domain) {
//                 points_map.set(value, toFixedAs(
//                     this.properties.expression!(value), Math.pow(10, - this.properties.accuracy)
//                 ));
//             }
//         }
//         return points_map;
//     }
//     private isUnwantedLine(from : [number, number], to : [number, number]) {
//         if(
//             from[0] <= 0 ||
//             to[0] > this.properties.width! ||
//             from[1] < 0 ||
//             from[1] > this.properties.height! ||
//             to[1] < 0 ||
//             to[1] > this.properties.height!
//         ) 
//         return true
//         else false;
//     }
//     private getDrawLine(x1 : number, x2 : number) : [[number, number], [number, number]]{
//         return [
//             this.getCoordinatesOf(x1, this.points_map.get(x1)!),
//             this.getCoordinatesOf(x2, this.points_map.get(x2)!),
//         ]
//     }
//     private getDrawLinesOfDomain(domain_values : number[]) {
//         const draw_lines : Array<[[number, number], [number, number]]> = [];
//         if(domain_values.length > 2)
//         for(let i = 0; i < domain_values.length - 1; i++) {
//             const line = this.getDrawLine(domain_values[i], domain_values[i + 1])
//             if(!this.isUnwantedLine(...line)) draw_lines.push(line);
//         }
        
//         return draw_lines;
//     }
//     private getDrawLines() {
//         let draw_lines : Array<[[number, number], [number, number]]> = [];
//         for(let domain_values of this.values) {
//             draw_lines = draw_lines.concat(
//                 this.getDrawLinesOfDomain(domain_values)
//             )
//         }
//         return draw_lines;
//     }
//     private drawLine(from : [number, number], to : [number, number]) {
//         this.ctx.beginPath();
//         this.ctx.moveTo(...from);
//         this.ctx.lineTo(...to);
//         this.ctx.stroke();
//     }
//     private update(frame : number) {
//         this.properties = this.getPropertiesAt(frame);
//         this.applyStyles();
//         this.domains = this.getDomains();
//         this.values = this.getvalues();
//         this.points_map = this.getPointsMap();
//         this.draw_lines = this.getDrawLines();
//         this.draw();
//     }
//     private draw() {
//         this.clear();
//         for(const line of this.draw_lines) {
//             this.drawLine(...line)
//         };
//     }
//     private linearDraw(element : Graph, frame : number, duration : number) {
//         this.clear();
//         const draw_lines = this.getDrawLines();
//         const lines_per_frame = Math.floor(draw_lines.length / duration);
//         Animation.at(frame);
//         for(let i = 1; i <= draw_lines.length % duration;) 
//             Animation.do(element, 'drawLine', ...draw_lines.shift()!)
//         for(let i = 1; i <= duration; i++) {
//             Animation.at(frame + i)
//             for(let j = 0; j < lines_per_frame; j++)
//                 Animation.do(element, 'drawLine', ...draw_lines.shift()!);
//         }
//         console.log(Animation.frames)
//     }
//     // private randomDraw(frame : number, duration :number) {
//     //     this.clear();
//     //     const draw_lines = this.getDrawLines();
//     //     const lines_per_frame = Math.floor(draw_lines.length / duration);
//     //     let current_frame = Animation.at(frame);
//     //     for(let i = 1; i <= draw_lines.length % duration;) {
//     //         current_frame.doAction(this, 'drawLine', ...draw_lines.shift()!);
//     //     }
//     //     current_frame = current_frame.getNextFrame();
//     //     for(let i = 1; i <= (duration * lines_per_frame); i++) {
//     //         current_frame.doAction(this, 'drawLine', ...PopRandomElementFromArray(draw_lines));
//     //         if(i % lines_per_frame == 0) current_frame = current_frame.getNextFrame();
//     //     }
//     // }

// }

// export default Graph;