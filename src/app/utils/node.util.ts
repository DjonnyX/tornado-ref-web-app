import { INode } from '@models';

export const formatNodeModel = (node: INode) => {
    return {
        type: node.type,
        parentId: node.parentId,
        contentId: node.contentId,
        children: node.children,
    }
}