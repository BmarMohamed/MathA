import DataStructure from "../../interfaces/data_structure.interface.js";

class Queue<T> implements DataStructure {
    constructor() {
        this.elements_array = [];
        this.length = 0;
    }
    private elements_array! : T[];
    public length! : number;
    public getCurrent() {
        return this.elements_array[0];
    }
    public queue(element : T) {
        this.elements_array.push(element);
        this.length++;
    }
    public dequeue() {
        this.length--;
        return this.elements_array.shift();
    }
}

export default Queue;