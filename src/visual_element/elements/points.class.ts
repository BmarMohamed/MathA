import VisualElement from "../visual_element.class.js";
import { IPointsSettings, DefaultPointsSettings } from "../default_settings.interface.js";
import { IPointsStyles, DefaultPointsStyles } from "../default_styles.interface.js";
import Animation from "../../animation.class.js";

import Lib from "../../lib/lib.js";
const { pi } = Lib.Constants;
const { getTransformFrames } = Lib.Animation;

class Points extends VisualElement {
    constructor(settings : IPointsSettings, styles : IPointsStyles) {
        super();
        this.initializeSettingsAndStyles<IPointsSettings, IPointsStyles>(
            settings,
            styles,
            DefaultPointsSettings,
            DefaultPointsStyles
        );
        this.points = this.settings.points!;
        this.setDrawStyles();
    }

    private settings! : IPointsSettings;
    private styles! : IPointsStyles;
    private points! : [number, number][];

    private setDrawStyles() {
        this.ctx.strokeStyle = this.styles.color!;
        this.ctx.fillStyle = this.styles.color!;
        this.ctx.translate(this.settings.position![0], this.settings.position![1]);
    }
    private drawPoint(x : number, y : number, radius : number,) {
        this.styles.radius = radius;
        const position = this.getCoordinatesOf(x, y);
        this.ctx.beginPath();
        this.ctx.arc(...position, this.styles.radius!, 0, pi * 2);
        if(this.styles.circle! > 0) {
            this.ctx.lineWidth = this.styles.circle!;
            this.ctx.stroke();
        }
        else this.ctx.fill();
    }
    private linearDrawPointByRadius(start_frame : number, duration : number, initial_raduis : number) {
        let raduis_tranfom_frames = getTransformFrames(initial_raduis, this.styles.radius!, duration);
        let frame = Animation.at(start_frame);
        for(let i = 0; i <= duration; i++) {
            frame.doAction(this, "draw", raduis_tranfom_frames[i]);
            frame = frame.getNextFrame();
        }
    }
    private draw(radius : number) {
        this.clear()
        for(let point of this.points) this.drawPoint(...point, radius);
    }
}

export default Points;