const Funcs = {
    cos : (x : number) => Math.cos(x),
    sin : (x : number) => Math.sin(x),
    tan : (x : number) => Math.tan(x),
    sec : (x : number) => 1 / Math.cos(x),
    scs : (x : number) => 1 / Math.sin(x),
    cot : (x : number) => 1 / Math.tan(x),
    sinc : (x : number) => Math.sin(x) / x,
    exp : (x : number) => Math.exp(x),
    ln : (x : number) => Math.log(x),
    rt : (x : number) => Math.sqrt(x),
}

export default Funcs;