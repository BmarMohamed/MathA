const Animation = {
    getChangeFrames(from : number, to : number, duration : number) {
        const d = (to - from) / duration;
        let changeFrames = [];
        for(let i = 0; i <= duration; i++) changeFrames.push(from + (d * i));
        return changeFrames;
    },

}

export default Animation;