import { IPolygonSettings, DefaultPolygonSettings, DefaultVisualElementSettings } from "../default_settings.interface.js";
import { IPolygonStyles, DefaultPolygonStyles } from "../default_styles.interface.js";
import VisualElement from "../visual_element.class.js";
import Lib from "../../lib/lib.js"

const { Constants, Funcs } = Lib;
const { pi } = Constants;
const { cos, sin } = Funcs;

class Polygon extends VisualElement {
    constructor(settings : IPolygonSettings, styles : IPolygonStyles) {
        super();
        this.initializeSettingsAndStyles<IPolygonSettings, IPolygonStyles>(
            settings,
            styles,
            DefaultPolygonSettings,
            DefaultPolygonStyles
        );
        const angles = this.getAngles(this.settings.angles!);
        const points = this.getPoints(angles)
        this.draw(points)
    }

    private settings! : IPolygonSettings;
    private styles! : IPolygonStyles;

    public getAngles(angles : number[]) {
        for(let i = 1; i < angles.length; i++) angles[i] += angles[i - 1]
        for(let i = 0; i < angles.length; i++) angles[i] = angles[i] * pi / 180;
        return angles;
    }

    public getPoints(angles : number[]) {
        const points : [number, number][] = [];
        points.push([this.settings.origin![0] + this.settings.raduis!, this.settings.origin![1]])
        for(let i = 0; i < angles.length; i++) {
            let angle = pi - angles[i];
            points.push([this.settings.origin![0] - this.settings.raduis! * cos(angle), this.settings.origin![0] + this.settings.raduis! * sin(angle)])
        }
        return points;
    }

    public draw(points : [number, number][]) {
        const coordinates : [number, number][] = [];
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 5
        for(let point of points) coordinates.push(this.getCoordinatesOf(...point) as [number, number])
        for(let i = 0; i < coordinates.length - 1; i++) {
            this.ctx.beginPath()
            this.ctx.moveTo(...coordinates[i])
            this.ctx.lineTo(...coordinates[i + 1])
            this.ctx.stroke()
        }
        this.ctx.beginPath()
        this.ctx.arc(...this.getCoordinatesOf(0,0) as [number, number], 10, 0, 6.28)
        this.ctx.stroke()

    }
}

export default Polygon;