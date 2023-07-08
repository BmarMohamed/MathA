import VisualElement from "../visual_element.class.js";
import OpacityEvents, { OpacityEventsList } from "./opacity.event.js";
import LineEvents, { LineEventsList } from "./line.event.js";
import Events from "./event.js";
import Lib from "../../lib/lib.js";
import IColor from "../../lib/interfaces/color.interface.js";
import RGB from "../../lib/classes/colors/rgb.class.js";
import HSB from "../../lib/classes/colors/hsb.class.js";
import HSL from "../../lib/classes/colors/hsl.class.js";
import Animation from "../../animation.class.js";
import GradientEvents, { GradientEventsList } from "./gradient.event.js";
import { AddEvents } from "./event.js";
const { HexToColor} = Lib.Colors;
const { getTransformFrames } = Lib.Animation;
const { getFloorNumber } = Lib.Arrays;

const StrokeEvents : Events = {
    changeStrokeColor(element : VisualElement, frame : number, new_color : string) {
        element.addPropertyChangeToRecords(element, frame, 'stroke_color', new_color)
        if(element.elements) 
        for(const [K, V] of element.elements) 
            if(V['changeStrokeColor'])
                StrokeEvents.changeStrokeColor(V, frame, new_color);
    },
    changeStrokeColorByColorModel(element : VisualElement, frame : number, color_array : number[], color_model : "RGB" | "HSB" | "HSL" = "RGB") {
        let color : IColor;
        if(color_model == "RGB") color = new RGB(...color_array as [number, number ,number]);
        else if (color_model == "HSB") color = new HSB(...color_array as [number, number ,number]);
        else color = new HSL(...color_array as [number, number ,number]);
        StrokeEvents.changeStrokeColor(element, frame, color.color)
    },
    linearChangeStrokeColor(element : VisualElement, frame : number, duration : number, new_stroke_color : string, color_model : "RGB" | "HSB" | "HSL" = "RGB") {
        const change_frame = getFloorNumber(frame, element. properties_change_record.get('stroke_color'))
        const transform_frames = getTransformFrames(
            HexToColor(element.properties_values_record.get(change_frame).stroke_color, color_model).getColorArray(),
            HexToColor(new_stroke_color, color_model).getColorArray(), duration
        );
        for(let i = 1; i <= duration; i++) {
            transform_frames[i] = transform_frames[i].map((color : number) => Math.round(color))
            Animation.at(frame + i);
            Animation.do(element, "changeStrokeColorByColorModel", transform_frames[i], color_model);
        }
    },
}

AddEvents(StrokeEvents, OpacityEvents);
AddEvents(StrokeEvents, LineEvents);
AddEvents(StrokeEvents, GradientEvents);

export const StrokeEventsList = {
    ...OpacityEventsList,
    ...LineEventsList,
    ...GradientEventsList,
    ChangeStrokeColor : 'changeStrokeColor',
    LinearChangeStrokeColor : 'linearChangeStrokeColor',
}

export default StrokeEvents;
