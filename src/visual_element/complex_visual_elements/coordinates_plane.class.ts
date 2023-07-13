import ComplexVisualElement from "./complex_visual_element.class.js";
import { ICoordinatesPlaneElement, ILineElement } from "../properties.interface.js";
import { DefaultCoordinatesPlaneProperties } from "../default_properties.object.js";
import RenderEvents, { RenderEventsList } from "../events/render.event.js";
import StrokeEvents, { StrokeEventsList } from "../events/stroke.event.js";
import Line from "../elements/line.class.js";

class CooridnatesPlane extends ComplexVisualElement {
    constructor(properties : ICoordinatesPlaneElement) {
        super();
        this.addElement(new Line({}), 'line')
        this.initializeProperties<ICoordinatesPlaneElement>(properties, DefaultCoordinatesPlaneProperties);
        this.initializeEvents([RenderEvents, StrokeEvents]);
        this.elements.get('line')!.properties = this.properties as ILineElement;
        this.elements.get('line')!.applyStyles();
    }
    public static readonly events = {
        ...RenderEventsList,
        ...StrokeEventsList,
        Draw : 'draw',
    };
    private properties! : ICoordinatesPlaneElement;
    private properties_change_record! : Map<string, number[]>;
    private properties_values_record! : Map<number, ICoordinatesPlaneElement>;
    public update(frame : number) {
        this.properties = this.getPropertiesAt(frame);
        this.elements.get('line')!.properties = this.properties as ILineElement;
        
        this.draw()
    }
    private draw() {
        this.elements.get('line')!.applyStyles();
        for(let v_line of this.properties.v_lines!) {
            this.elements.get('line')!.properties.from = [v_line, this.properties.start_point![1]];
            this.elements.get('line')!.properties.to = [v_line, this.properties.end_point![1]];
            this.elements.get('line')!.points = this.elements.get('line')!.getPoints();
            this.elements.get('line')!.draw();
        }
        for(let h_line of this.properties.h_lines!) {
            this.elements.get('line')!.properties.from = [this.properties.start_point![0], h_line];
            this.elements.get('line')!.properties.to = [this.properties.end_point![0], h_line];
            this.elements.get('line')!.points = this.elements.get('line')!.getPoints();
            this.elements.get('line')!.draw();
        }
    }

}

export default CooridnatesPlane;