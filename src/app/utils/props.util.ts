

const getPropList = (propName: string): Array<string> => {
    return propName.split(".");
}

export const getPropValue = (data: any, propName: string) => {
    let result = data;
    const props = getPropList(propName);

    props.forEach((prop, i) => {
        result = result?.[prop];
    });

    return result;
}