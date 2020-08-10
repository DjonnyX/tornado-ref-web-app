import { IProduct } from '@djonnyx/tornado-types';

export const formatProductModel = (model: IProduct) => {
    return {
        active: model.active,
        name: model.name,
        color: model.color,
        description: model.description,
        prices: model.prices,
        receipt: model.receipt,
        tags: model.tags,
        joint: model.joint,
        assets: model.assets,
        images: {
            main: !!model.images ? model.images.main : null,
            thumbnail: !!model.images ? model.images.thumbnail : null,
            icon: !!model.images ? model.images.icon : null,
        },
        extra: model.extra,
    }
}