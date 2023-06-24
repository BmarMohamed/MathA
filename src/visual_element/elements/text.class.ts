// import VisualElement from "../visual_element.class.js";
// import { ITextElement } from "../properties.interface.js";
// import { DefaultTextProperties } from "../default_properties.object.js";

// class Text extends VisualElement {
//     constructor(properties : ITextElement) {
//         super();
//         this.initializeProperties<ITextElement>(properties, DefaultTextProperties);
//         this.applyStyles();
//     }

//     private properties! : ITextElement;

//     private draw() {
//         this.clear();
//         const coordinates = this.getCoordinatesOf(this.properties.origin![0], this.properties.origin![1]);
//         const max_width = this.getCoordinatesOf(this.properties.max_width! - 8, 0);
//         if(this.properties.draw_type == "stroke") this.ctx.strokeText(this.properties.text!, ...coordinates, max_width[0]);
//         else this.ctx.fillText(this.properties.text!,...coordinates, max_width[0]);
//     }
// }

// export default Text;