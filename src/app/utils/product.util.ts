import { IProduct } from '@djonnyx/tornado-types';

export const formatProductModel = (model: IProduct) => {
    const content: any = {};
    if (!!model.content) {
        for (const lang in model.content) {
            content[lang] = {
                name: model.content.name,
                description: model.content.description,
                images: model.content.images || {
                    main: null,
                    thumbnail: null,
                    icon: null,
                },
            }
        }
    }
    return {
        active: model.active,
        content,
        color: model.color,
        prices: model.prices.map(price => ({
            currency: price.currency,
            value: price.value,
        })),
        receipt: model.receipt,
        tags: model.tags,
        joint: model.joint,
        assets: model.assets,
        extra: model.extra,
    };
}