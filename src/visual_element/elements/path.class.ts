import VisualElement from "../visual_element.class.js";
import { IPathSettings, DefaultPathSettings } from "../default_settings.interface.js";
import { IPathStyles, DefaultPathStyles } from "../default_styles.interface.js";
import Animation from "../../animation.class.js";

import Lib from "../../lib/lib.js";

class Path extends VisualElement {
    constructor(settings : IPathSettings, styles : IPathStyles) {
        super();
        this.initializeSettingsAndStyles<IPathSettings, IPathStyles>(
            settings,
            styles,
            DefaultPathSettings,
            DefaultPathStyles
        );
        this.points = this.settings.points!;
        this.setDrawStyles();
        if(this.styles.gradient) this.setGradient()
    }

    private settings! : IPathSettings;
    private styles! : IPathStyles;
    private points! : [number, number][];

    private setDrawStyles() {
        this.ctx.strokeStyle = this.styles.color!;
        this.ctx.fillStyle = this.styles.color!;
        this.ctx.translate(this.settings.position![0], this.settings.position![1]);
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
        if(this.styles.stroke! > 0) this.ctx.stroke();
        else this.ctx.fill();
    }
}

export default Path;