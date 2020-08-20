import { IProduct } from '@djonnyx/tornado-types';

export const formatProductModel = (model: IProduct) => ({
    active: model.active,
    contents: model.contents,
    prices: model.prices.map(price => ({
        currency: price.currency,
        value: price.value,
    })),
    receipt: model.receipt,
    tags: model.tags,
    joint: model.joint,
    extra: model.extra,
});