import { INode } from '@djonnyx/tornado-types';

export const formatNodeModel = (node: INode) => {
    return {
        active: node.active,
        type: node.type,
        parentId: node.parentId,
        contentId: node.contentId,
        children: node.children,
        scenarios: node.scenarios,
        extra: node.extra,
    }
}