export function addParametersToUrl(url, parameters){
    Object.keys(parameters).reduce((accumulator, key) => {
        if(parameters[key] !== null 
            && parameters[key] !== undefined 
            && parameters[key] !== ""){
                accumulator.push({
                    key: key,
                    value: parameters[key]
                });
            }
        return accumulator;
    },[]).map(obj=>{
        url += `${obj.key}=${obj.value}&`;
        return obj;
    });

    url = url.slice(0, -1);
    return url;
}