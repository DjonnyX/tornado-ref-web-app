import { ISelector } from '@djonnyx/tornado-types';

export const formatSelectorModel = (selector: ISelector) => {
    return {
        active: selector.active,
        type: selector.type,
        name: selector.name,
        color: selector.color,
        description: selector.description,
        assets: selector.assets,
        images: {
            main: !!selector.images ? selector.images.main : null,
            thumbnail: !!selector.images ? selector.images.thumbnail : null,
            icon: !!selector.images ? selector.images.icon : null,
        },
        extra: selector.extra,
    }
}