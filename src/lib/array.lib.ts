const Arrays = {
    bubbleSort(arr : number[]) {
        let sorted = false;
        while(!sorted) {
            sorted = true
            for(let i = 0; i < arr.length - 1; i++) {
                if(arr[i] > arr[i + 1]) {
                    let holder = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = holder;
                    sorted = false
                }
            }
        }
        return arr;
    },

    PopRandomElementFromArray<T>(arr : T[]) : T {
        const random_index = Math.floor(Math.random() * arr.length);
        const random_element = arr[random_index];
        arr[random_index] = arr[0];
        arr.shift();
        return random_element;
    },
}

export default Arrays;