import { ISelector } from '@djonnyx/tornado-types';

export const formatSelectorModel = (selector: ISelector) => {
    return {
        active: selector.active,
        type: selector.type,
        name: selector.name,
        description: selector.description,
        assets: selector.assets,
        images: selector.images,
        extra: selector.extra,
    }
}