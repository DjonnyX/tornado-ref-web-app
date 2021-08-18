import { ISelector } from '@djonnyx/tornado-types';

export const formatSelectorModel = (model: ISelector) => {
    return {
        active: model.active,
        position: model.position,
        type: model.type,
        systemTag: model.systemTag,
        contents: model.contents,
        extra: model.extra,
    }
}