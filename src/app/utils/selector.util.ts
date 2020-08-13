import { ISelector } from '@djonnyx/tornado-types';

export const formatSelectorModel = (model: ISelector) => {
    return {
        active: model.active,
        type: model.type,
        name: model.name,
        color: model.color,
        description: model.description,
        assets: model.assets,
        images: {
            main: !!model.images ? model.images.main : null,
            thumbnail: !!model.images ? model.images.thumbnail : null,
            icon: !!model.images ? model.images.icon : null,
        },
        extra: model.extra,
    }
}