import ComplexVisualElement from "./complex_visual_elements.class.js";
import { IGraphElement } from "../properties.interface.js";
import { DefaultGraphProperties } from "../default_properties.object.js";
import RenderEvents, { RenderEventsList } from "../events/render.event.js";
import DrawStyleEvents, { DrawStyleEventsList } from "../events/draw_style.event.js";
import Lib from "../../lib/lib.js";
import Points from "../elements/points.class.js";
const { subtractDomains } = Lib.Domains;
const { toFixedAs, isNumber } = Lib.Numbers;

class Graph extends ComplexVisualElement {
    constructor(properties : IGraphElement) {
        super();
        this.addMustProperties(properties);
        this.addElement(
            new Points(properties.points_properties!, false),
            'graph-points'
        )
        this.addElement(
            new Points(properties.holes_properties!, false),
            'graph-holes'
        )
        this.initializeProperties<IGraphElement>(properties, DefaultGraphProperties);
        this.initializeEvents([RenderEvents, DrawStyleEvents]);
        this.applyStyles();
        this.draw_domains = this.getDrawDomains();
        this.x_values = this.getXValues();
        this.x_y_map = this.getXYMap();
        this.need_to_recalculate = false;
    }
    private properties! : IGraphElement;
    private properties_change_record! : Map<string, number[]>;
    private properties_values_record! : Map<number, IGraphElement>;
    private need_to_recalculate! : boolean;
    private draw_domains! : [number, number][];
    private x_values! : number[][];
    private x_y_map! : Map<number, number>;
    private points! : unknown;
    private holes! : unknown;
    public static readonly events = {
        ...RenderEventsList,
        ...DrawStyleEventsList,
        Draw : 'draw',
    }
    private addMustProperties(properties : IGraphElement) {
        properties.points_properties = {
            ...properties.points_properties
        }
        properties.holes_properties = {
            ...properties.holes_properties
        }
        properties.points_properties!.draw_style = 'fill';
        properties.holes_properties!.draw_style = 'stroke';
    }
    private getDrawDomains() {
        let result_domains = [...this.properties.graph_domains!];
        for(let unwanted_domain of this.properties.unwanted_domains!) {
            let result = [] as [number, number][];
            for(let domain of result_domains) {
                result.concat(subtractDomains(domain, unwanted_domain) || []);
            }
            result_domains = result;
        }
        return result_domains;
    }
    private getXValues() {
        let x_values = [];
        for(let domain of this.draw_domains) {
            const values = [];
            for(
                let i = toFixedAs(domain[0] + this.properties.x_step!, this.properties.x_step!);
                i < toFixedAs(domain[1], this.properties.x_step!);
                i = toFixedAs(i + this.properties.x_step!, this.properties.x_step!)
            ) values.push(i);
            x_values.push(values);
        }
        return x_values
    }
    private getXYMap() {
        let x_y_map = new Map<number, number>();
        for(let x_values_domain of this.x_values) {
            for(let x_value of x_values_domain) {
                if(isNumber(this.properties.expression!(x_value))) {
                    x_y_map.set(x_value, toFixedAs(this.properties.expression!(x_value), Math.pow(10, -this.properties.y_points_after_decimal_point!)))
                }
            }
        }
        return x_y_map;
    }
    private update(frame : number) {
        this.properties = this.getPropertiesAt(frame);
        if(this.need_to_recalculate === true) {
            this.draw_domains = this.getDrawDomains();
            this.x_values = this.getXValues();
            this.x_y_map = this.getXYMap();
            this.need_to_recalculate = false;
        }
        for(let [K, V] of this.elements) V.update(frame);
        this.draw();
    }
    private draw() {
        this.clear();
        this.applyStyles();
        this.drawGraph();
        this.drawPoints();
        this.drawHoles();
        this.applyStyles();
    }
    private lineIsValid(x1 : number, y1 : number, x2 : number, y2 : number) {
        if(
            x1 < this.properties.domain![0] ||
            x2 < this.properties.domain![0] ||
            x1 > this.properties.domain![1] ||
            x2 > this.properties.domain![1] ||
            y1 < this.properties.range![0] ||
            y2 < this.properties.range![0] ||
            y1 > this.properties.range![1] ||
            y2 > this.properties.range![1]
        ) 
        return false
        return true
    }
    private drawGraph() {
        for(let x_values_domain of this.x_values)
        for(let i = 0; i < x_values_domain.length - 1; i++) {
            if(!this.lineIsValid(
                x_values_domain[i], this.x_y_map.get(x_values_domain[i])!,
                x_values_domain[i + 1], this.x_y_map.get(x_values_domain[i + 1])!
            )) continue;
            this.ctx.beginPath();
            this.ctx.moveTo(...this.getCoordinatesOf(x_values_domain[i], this.x_y_map.get(x_values_domain[i])!));
            this.ctx.lineTo(...this.getCoordinatesOf(x_values_domain[i + 1], this.x_y_map.get(x_values_domain[i + 1])!));
            this.ctx.stroke();
        }
    }
    private drawPoints() {
        const graph_points = this.elements.get('graph-points')!;
        graph_points.applyStyles();
        graph_points.draw();
    }
    private drawHoles() {
        const graph_holes = this.elements.get('graph-holes')!;
        graph_holes.applyStyles();
        graph_holes.draw();
    }
}

export default Graph;