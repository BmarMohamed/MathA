import VisualElement from "../visual_element.class.js";
import OpacityEvents from "./opacity.event.js";
import Events from "./event.js";
import Lib from "../../lib/lib.js";
import IColor from "../../lib/interfaces/color.interface.js";
import RGB from "../../lib/classes/colors/rgb.class.js";
import HSB from "../../lib/classes/colors/hsb.class.js";
import HSL from "../../lib/classes/colors/hsl.class.js";
import Animation from "../../animation.class.js";
import { AddEvents } from "./event.js";
import GradientEvents from "./gradient.event.js";
const { HexToColor} = Lib.Colors;
const { getTransformFrames } = Lib.Animation;

const FillEvents : Events = {
    // changeFillColor(element : VisualElement, new_color : string) {
    //     element.ctx.fillStyle = new_color;
    // },
    // changeFillColorByColorModel(element : VisualElement, color_array : number[], color_model : "RGB" | "HSB" | "HSL") {  
    //     let color : IColor;
    //     if(color_model == "RGB") color = new RGB(...color_array as [number, number ,number]);
    //     else if (color_model == "HSB") color = new HSB(...color_array as [number, number ,number]);
    //     else color = new HSL(...color_array as [number, number ,number]);
    //     FillEvents.changeFillColor(element, color.color)
    // },
    // linearChangeFillColor(element : VisualElement, start_frame : number, duration : number, new_fill_color : string, color_model : "RGB" | "HSB" | "HSL") {
    //     const transform_frames = getTransformFrames(
    //         HexToColor(element.properties.fill_color, color_model).getColorArray(),
    //         HexToColor(new_fill_color, color_model).getColorArray(), duration
    //     );
    //     let frame = Animation.at(start_frame);
    //     for(let i = 0; i <= duration; i++) {
    //         transform_frames[i] = transform_frames[i].map((color : number) => Math.round(color))
    //         frame.doAction(element, "changeFillColorByColorModel", transform_frames[i], color_model);
    //         frame = frame.getNextFrame();
    //     }
    // },
}

AddEvents(FillEvents, OpacityEvents);
AddEvents(FillEvents, GradientEvents);

export default FillEvents;
