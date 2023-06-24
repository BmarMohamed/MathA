// /*rebuild*/

// import VisualElement from "../visual_element.class.js";
// import { IPointsElement } from "../properties.interface.js";
// import Animation from "../../animation.class.js";
// import Lib from "../../lib/lib.js";
// import { DefaultPointsProperties } from "../default_properties.object.js";
// const { pi } = Lib.Constants;
// const { getTransformFrames } = Lib.Animation;

// class Points extends VisualElement {
//     constructor(properties : IPointsElement) {
//         super();
//         this.initializeProperties<IPointsElement>(properties, DefaultPointsProperties);
//         this.points = this.properties.points!;
//         this.applyStyles();
//     }
//     private properties! : IPointsElement;
//     private points! : [number, number][];

//     private drawPoint(x : number, y : number) {
//         const position = this.getCoordinatesOf(x, y);
//         this.ctx.beginPath();
//         this.ctx.arc(...position, this.properties.radius!, 0, pi * 2);
//         if(this.properties.draw_type == "stroke") {
//             this.ctx.stroke();
//         }
//         else this.ctx.fill();
//     }
//     private linearChangeRadius(start_frame : number, duration : number, new_raduis : number) {
//         let raduis_tranfom_frames = getTransformFrames(this.properties.radius!, new_raduis, duration);
//         let frame = Animation.at(start_frame);
//         for(let i = 0; i <= duration; i++) {
//             frame.doAction(this, "changeRadius", raduis_tranfom_frames[i]);
//             frame = frame.getNextFrame();
//         }
//     }
//     private changeRadius(radius : number) {
//         this.clear();
//         this.properties.radius = radius;
//         this.draw();
//     }
//     private draw() {
//         this.clear()
//         for(let point of this.points) this.drawPoint(...point);
//     }
// }

// export default Points;