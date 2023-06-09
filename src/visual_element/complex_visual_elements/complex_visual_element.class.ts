import VisualElement from "../visual_element.class.js";

class ComplexVisualElement extends VisualElement {
    constructor() {
        super();
        this.elements = new Map();
    }
    elements! : Map<string, VisualElement>;
    addElement(element : VisualElement, name : string) {
        this.elements.set(name, element);
    }
}

export default ComplexVisualElement;