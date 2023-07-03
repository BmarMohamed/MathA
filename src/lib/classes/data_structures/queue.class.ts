import DataStructure from "../../interfaces/data_structure.interface";

class Queue<T> implements DataStructure {
    constructor() {
        this.arr = [];
    }
    public arr : T[];
    public currentElement() {
        return this.arr[0];
    }
    public getLength() {
        return this.arr.length;
    }
    public queue(element : T) {
        this.arr.push(element);
    }
    public dequeue() {
        return this.arr.shift();
    }
}

export default Queue;