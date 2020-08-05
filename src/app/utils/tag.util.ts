import { ITag } from '@djonnyx/tornado-types';

export const formatTagModel = (tag: ITag) => {
    return {
        active: tag.active,
        name: tag.name,
        description: tag.description,
        color: tag.color,
        extra: tag.extra,
    }
}