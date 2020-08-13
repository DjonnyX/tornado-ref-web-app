import { IOrderType } from '@djonnyx/tornado-types';

export const formatOrderTypeModel = (model: IOrderType) => {
    return {
        active: model.active,
        name: model.name,
        description: model.description,
        color: model.color,
        assets: model.assets,
        images: {
            main: !!model.images ? model.images.main : null,
            icon: !!model.images ? model.images.icon : null,
        },
        extra: model.extra,
    }
}