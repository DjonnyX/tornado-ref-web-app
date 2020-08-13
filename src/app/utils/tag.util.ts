import { ITag } from '@djonnyx/tornado-types';

export const formatTagModel = (model: ITag) => {
    return {
        active: model.active,
        name: model.name,
        description: model.description,
        color: model.color,
        extra: model.extra,
    }
}