import { IProduct } from '@djonnyx/tornado-types';

export const formatProductModel = (product: IProduct) => {
    return {
        active: product.active,
        name: product.name,
        description: product.description,
        prices: product.prices,
        receipt: product.receipt,
        tags: product.tags,
        joint: product.joint,
        assets: product.assets,
        images: {
            main: !!product.images ? product.images.main : null,
            thumbnail: !!product.images ? product.images.thumbnail : null,
            icon: !!product.images ? product.images.icon : null,
        },
        extra: product.extra,
    }
}