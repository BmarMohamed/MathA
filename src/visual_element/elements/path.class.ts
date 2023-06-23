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
        this.applyStyles();
        if(this.properties.gradient) this.setGradient()
    }
    private properties! : IPathElement;
    private points! : [number, number][];

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