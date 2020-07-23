import { IProduct } from '@djonnyx/tornado-types';

export const formatProductModel = (product: IProduct) => {
    return {
        name: product.name,
        description: product.description,
        receipt: product.receipt,
        tags: product.tags,
        joint: product.joint,
        assets: product.assets,
        mainAsset: product.mainAsset,
    }
}