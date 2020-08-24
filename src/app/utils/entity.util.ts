import { IProductContents, IProductContentsItem, ProductImageTypes } from '@djonnyx/tornado-types';

export const normalizeProductContents = (contents: IProductContents, defaultLang: string) => {
    if (!contents) {
        return;
    }

    let defaultContent: IProductContentsItem;

    // экстракт дефолтового контента
    for (const lang in contents) {
        if (lang === defaultLang) {
            defaultContent = contents[lang];
            break;
        }
    }

    for (const lang in contents) {
        if (!!contents[lang].images) {
            const content = contents[lang];
            for (const imageType in content.images) {
                const isEqualtFromDefault = equalFromImages(defaultContent, content.images[imageType]);
                if (imageType !== ProductImageTypes.MAIN && !!content.images.main && (!content.images[imageType] || (isEqualtFromDefault && lang !== defaultLang))) {
                    content.images[imageType] = content.images.main;
                } else if (lang !== defaultLang && (!content.images[imageType] || isEqualtFromDefault) && !!defaultContent?.images?.[imageType]) {
                    content.images[imageType] = defaultContent.images[imageType] || defaultContent.images.main;
                }
            }
        }
    }
};

export const equalFromImages = (content: IProductContentsItem, image: string): boolean => {
    if (!!content && !!content.images) {
        for (const imageType in content) {
            if (image == content[imageType]) {
                return true;
            }
        }
    }
    return false;
};

export const isEqualWithDefault = (defaultContent: any, content: any, imageType: ProductImageTypes | string, isDefault: boolean): boolean => {
    if (!!content && !!content.images) {
        const isEqualtFromDefault = equalFromImages(defaultContent, content.images[imageType]);
        if (imageType !== ProductImageTypes.MAIN && !!content.images.main && (!content.images[imageType] || content.images[imageType] === content.images.main || (isEqualtFromDefault && !isDefault))) {
            return true;
        } else if (imageType === ProductImageTypes.MAIN && !isDefault && isEqualtFromDefault && !isDefault) {
            return true;
        } else if (isDefault && (!content.images[imageType] || isEqualtFromDefault) && !!defaultContent && !!defaultContent?.images?.[imageType]) {
            return !!defaultContent.images[imageType] || !!defaultContent.images.main;
        }
    }

    return false;
}