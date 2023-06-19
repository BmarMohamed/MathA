const Domains = {
    transformPointsToDomains(arr : Array<[number, number] | number>) {
        for(let i = 0; i < arr.length; i++) {
            if(Array.isArray(arr[i])) continue;
            arr[i] = [
                arr[i], 
                arr[i]
            ] as [number, number];
        }
        return arr;
    },
    subtractDomains(domain1 : [number, number], domain2 : [number, number]) : Array<[number, number]> | undefined {
        if(!domain2) return [domain1];
        else if(domain1[0] > domain2[0] && domain1[1] < domain2[1]) [];
        else if(domain1[0] > domain2[1] || domain1[1] < domain2[0]) return [domain1];
        else if(domain1[0] < domain2[0] && domain1[1] < domain2[1]) return [[domain1[0] , domain2[0]]];
        else if(domain1[0] > domain2[0] && domain1[1] > domain2[1]) return [[domain2[1], domain1[1]]];
        else if(domain1[0] < domain2[0] && domain1[1] > domain2[1]) return [[domain1[0], domain2[0]], [domain2[1], domain1[1]]]
    },
}

export default Domains;