const Animation = {
    getTransformFrames(from : number, to : number, duration : number) {
        const d = (to - from) / duration;
        let transformFrames = [];
        for(let i = 0; i <= duration; i++) transformFrames.push(from + (d * i));
        return transformFrames;
    },
}

export default Animation;