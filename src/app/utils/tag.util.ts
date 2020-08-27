import { ITag } from '@djonnyx/tornado-types';

export const formatTagModel = (model: ITag) => {
    return {
        active: model.active,
        contents: model.contents,
        extra: model.extra,
    }
}