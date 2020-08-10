import { INode } from '@djonnyx/tornado-types';

export const formatNodeModel = (model: INode) => {
    return {
        active: model.active,
        type: model.type,
        parentId: model.parentId,
        contentId: model.contentId,
        children: model.children,
        scenarios: model.scenarios,
        extra: model.extra,
    }
}