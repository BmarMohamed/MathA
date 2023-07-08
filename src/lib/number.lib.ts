const Numbers = {
    toFixedAs(num : number, fixed_num : number) {
        return Number.parseFloat(
            num.toFixed(
                fixed_num.toString().length - fixed_num.toString().indexOf('.') - 1
            )
        );
    },
    isNumber(num : number) {
        if(
            num == undefined ||
            num == null ||
            Math.abs(num) == Infinity
        )
        return false;
        return true
    }
}

export default Numbers;