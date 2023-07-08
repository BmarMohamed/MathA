import VisualElement from "../visual_element.class.js";

class ComplexVisualElements extends VisualElement {
    constructor() {
        super();
        this.elements = new Map();
        this.complex_elements = new Map();
    }
    elements! : Map<string, VisualElement>;
    complex_elements! : Map<string, ComplexVisualElements>;
    
    addElement(element : VisualElement, name : string) {
        element.ctx = this.ctx;
        element.canvas = this.canvas;
        this.elements.set(name, element);
    }

    addComplexElement(complex_element : ComplexVisualElements, name : string) {
        complex_element.ctx = this.ctx;
        complex_element.canvas = this.canvas;
        this.complex_elements.set(name, complex_element);
    }
}

export default ComplexVisualElements;