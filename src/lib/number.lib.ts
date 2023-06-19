const Numbers = {
    toFixedAs(num : number, fixed_num : number) {
        return Number.parseFloat(
            num.toFixed(
                fixed_num.toString().length - fixed_num.toString().indexOf('.') - 1
            )
        );
    },
}

export default Numbers;