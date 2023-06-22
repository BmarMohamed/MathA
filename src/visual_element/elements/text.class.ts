import VisualElement from "../visual_element.class.js";
import { ITextElement } from "../properties.interface.js";
import { DefaultTextProperties } from "../default_properties.object.js";

class Text extends VisualElement {
    constructor(properties : ITextElement) {
        super();
        this.initializeProperties<ITextElement>(properties, DefaultTextProperties);
        this.setDrawStyles();
    }

    private properties! : ITextElement;

    private setDrawStyles() {
        this.ctx.strokeStyle = this.properties.stroke_color!;
        this.ctx.fillStyle = this.properties.fill_color!;
        this.ctx.font = `${this.properties.font_weight!} ${this.properties.font_size!}px ${this.properties.font_family!}`;
        this.ctx.translate(this.properties.position![0], this.properties.position![1]);
        this.canvas.style.transform = "scale(1, 1)"
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
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.direction = this.properties.text_direction!;
    }
    private write() {
        const coordinates = this.getCoordinatesOf(this.properties.origin![0], -this.properties.origin![1]);
        const max_width = this.getCoordinatesOf(this.properties.max_width! - 8, 0);
        if(this.properties.draw_type == "stroke") this.ctx.strokeText(this.properties.text!, ...coordinates, max_width[0]);
        else this.ctx.fillText(this.properties.text!,...coordinates, max_width[0]);
    }
}

export default Text;