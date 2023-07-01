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
    findIndexOf(num : number, arr : number[]) {
        arr = Arrays.bubbleSort(arr).reverse();
        for(let i = 0; i < arr.length; i++) {
            if(num >= arr[i]) return arr[i];
        }
        return 0;
    },
    Multiply2By2Matrics(matrix1 : [[number, number], [number, number]], matrix2 : [[number, number], [number, number]]) {
        return [
            [
                matrix1[0][0] * matrix2[0][0] + matrix1[1][0] * matrix2[0][1],
                matrix1[0][1] * matrix2[0][0] + matrix1[1][1] * matrix2[0][1]
            ],
            [
                matrix1[0][0] * matrix2[1][0] + matrix1[1][0] * matrix2[1][1],
                matrix1[0][1] * matrix2[1][0] + matrix1[1][1] * matrix2[1][1]
            ]
        ]
    }
}

export default Arrays;