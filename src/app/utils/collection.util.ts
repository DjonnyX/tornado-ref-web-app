export interface ICollectionDictionary<T = any> {
    [id: string]: T;
}

export const getMapOfCollection = <T extends any>(collection: Array<T>, key: string): ICollectionDictionary<T> => {
    const result: ICollectionDictionary<T> = {};

    collection.forEach(item => {
        result[item[key]] = item;
    });

    return result;
}