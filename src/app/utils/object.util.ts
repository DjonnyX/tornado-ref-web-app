export const deepMergeObjects = (object1: any, object2: any, overrideToNull = false) => {
    let result = object1 instanceof Array ? [...object1] : object1 instanceof Object ? { ...object1 } : object1;

    if (object1 instanceof Array && object2 instanceof Array) {
        if (!!object2) {
            for (let i = 0, l1 = result.length; i < l1; i++) {
                if (object2.length > i) {
                    result[i] = deepMergeObjects(result[i], object2[i], overrideToNull);
                }
            }
            if (object2.length > object1.length) {
                for (let j = object1.length > 0 ? object1.length - 1 : 0, l2 = object2.length; j < l2; j++) {
                    result.push(object2[j]);
                }
            }
        }
    } else if (object1 instanceof Object && object2 instanceof Object) {
        for (const key in object1) {
            if (object2.hasOwnProperty(key)) {
                result = { ...result, ...{ [key]: deepMergeObjects(object1[key], object2[key], overrideToNull) } };
            }
        }
        for (const key in object2) {
            if (!object1[key]) {
                result[key] = object2[key];
            }
        }
    } else if (overrideToNull || !!object2) {
        result = object2;
    }

    return result;
}

export const deepClone = (object: any) => {
    return deepMergeObjects(object, object);
}