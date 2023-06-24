const Animation = {
    getTransformFrames(from : number | number[], to : number | number[], duration : number) {
        let transformFrames : any[] = [];
        if(typeof from == 'number' && typeof to == 'number') {
            const d = (to - from) / duration;
            for(let i = 0; i <= duration; i++) transformFrames.push(from + (d * i));
        }
        else if (Array.isArray(from) && Array.isArray(to)) {
            const length = from.length > to.length? from.length : to.length; 
            for(let i = 0; i <= duration; i++) {
                transformFrames[i] = [];
                for(let j = 0; j < length; j++) {
                    transformFrames[i][j] = from[j] + (to[j] - from[j]) * i / duration;
                }
            }
        }
        console.log(transformFrames)
        return transformFrames;
    },
}

export default Animation;