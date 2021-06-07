import { INode } from '@djonnyx/tornado-types';

export const updateCollection = (collection: Array<INode>, node: INode): Array<INode> => {
    const result = [...collection];
    const existsNodeIndex = result.findIndex(p => p.id === node.id);
    if (existsNodeIndex > -1) {
        result.splice(existsNodeIndex, 1);
        result.splice(existsNodeIndex, 0, node);
    }

    return result;
}

export const updateCollectionMulti = (collection: Array<INode>, nodes: Array<INode>): Array<INode> => {
    const result = [...collection];
    nodes?.forEach(node => {
        const existsNodeIndex = result.findIndex(p => p.id === node.id);
        if (existsNodeIndex > -1) {
            result.splice(existsNodeIndex, 1);
            result.splice(existsNodeIndex, 0, node);
        }
    });

    return result;
}

/**
 * Удаляет ноды заданные id из коллекции и возвращает новую коллекцию
 */
export const deleteNodesByIds = (collection: Array<INode>, ids: Array<string>): Array<INode> => {
    const result = [...collection];

    ids.forEach(id => {
        const existsNodeIndex = result.findIndex(p => p.id === id);
        if (existsNodeIndex > -1) {
            result.splice(existsNodeIndex, 1);
        }
    });

    return result;
}