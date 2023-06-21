import VisualElement from "../visual_element.class.js";
import { ITextSettings, DefaultTextSettings } from "../default_settings.interface.js";
import { ITextStyles, DefaultTextStyles } from "../default_styles.interface.js";

class Text extends VisualElement {
    constructor(settings : ITextSettings, styles : ITextStyles) {
        super();
        this.initializeSettingsAndStyles<ITextSettings, ITextStyles>(
            settings,
            styles,
            DefaultTextSettings,
            DefaultTextStyles
        );
        this.setDrawStyles();
    }

    private settings! : ITextSettings;
    private styles! : ITextStyles;

    private setDrawStyles() {
        this.ctx.strokeStyle = this.styles.stroke_color!;
        this.ctx.fillStyle = this.styles.fill_color!;
        this.ctx.font = `${this.styles.font_weight!} ${this.styles.font_size!}px ${this.styles.font_family!}`;
        this.ctx.translate(this.settings.position![0], this.settings.position![1]);
        this.canvas.style.transform = "scale(1, 1)"
        if(this.styles.gradient_enabled) {
            const gradient = this.ctx.createLinearGradient(
                ...this.getCoordinatesOf(...this.styles.gradient_start_position!),
                ...this.getCoordinatesOf(...this.styles.gradient_end_position!)
            )
            for(const color in this.styles.gradient_colors!) {
                gradient.addColorStop(this.styles.gradient_colors![color], color)
            }
            this.ctx.strokeStyle = gradient;
            this.ctx.fillStyle = gradient;
        }
        this.ctx.globalAlpha = this.styles.opacity!;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.direction = this.styles.text_direction!;
    }
    private write() {
        const coordinates = this.getCoordinatesOf(this.settings.origin![0], -this.settings.origin![1]);
        const max_width = this.getCoordinatesOf(this.styles.max_width! - 8, 0);
        if(this.styles.draw_type == "stroke") this.ctx.strokeText(this.settings.text!, ...coordinates, max_width[0]);
        else this.ctx.fillText(this.settings.text!,...coordinates, max_width[0]);
    }
}

export default Text;