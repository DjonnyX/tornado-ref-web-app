import { ITag } from '@djonnyx/tornado-types';

export const formatTagModel = (tag: ITag) => {
    return {
        name: tag.name,
        description: tag.description,
        color: tag.color,
    }
}