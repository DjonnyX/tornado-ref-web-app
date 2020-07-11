import { ITag } from '@models';

export const formatTagModel = (tag: ITag) => {
    return {
        name: tag.name,
        description: tag.description,
        color: tag.color,
    }
}