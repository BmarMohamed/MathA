import VisualElement from "../visual_element.class.js";
import Animation from "../../animation.class.js";

import Lib from "../../lib/lib.js";
import { IPathElement } from "../properties.interface.js";
import { DefaultPathProperties } from "../default_properties.object.js";

class Path extends VisualElement {
    constructor(properties : IPathElement) {
        super();
        this.initializeProperties<IPathElement>(properties, DefaultPathProperties);
        this.points = this.properties.points!;
        this.setDrawStyles();
        if(this.properties.gradient) this.setGradient()
    }
    private properties! : IPathElement;
    private points! : [number, number][];
    private setDrawStyles() {
        this.ctx.strokeStyle = this.properties.stroke_color!;
        this.ctx.fillStyle = this.properties.fill_color!;
        this.ctx.lineWidth = this.properties.line_width!;
        this.ctx.translate(this.properties.position![0], this.properties.position![1]);
        if(this.properties.gradient_enabled) {
            const gradient = this.ctx.createLinearGradient(
                ...this.getCoordinatesOf(...this.properties.gradient_start_position!),
                ...this.getCoordinatesOf(...this.properties.gradient_end_position!)
            )
            for(const color in this.properties.gradient_colors!) {
                gradient.addColorStop(this.properties.gradient_colors![color], color)
            }
            this.ctx.strokeStyle = gradient;
            this.ctx.fillStyle = gradient;
        }
        this.ctx.globalAlpha = this.properties.opacity!;
    }
    private draw() {
        this.clear()
        this.ctx.beginPath();
        this.ctx.moveTo(
            ...this.getCoordinatesOf(...this.points[0])
        );
        for(let i = 1; i < this.points.length; i++) {
            this.ctx.lineTo(
                ...this.getCoordinatesOf(...this.points[i])
            );
        }
        this.ctx.lineTo(
            ...this.getCoordinatesOf(...this.points[0])
        );
        if(this.properties.draw_type! == "stroke") this.ctx.stroke();
        else this.ctx.fill();
    }
}

export default Path;