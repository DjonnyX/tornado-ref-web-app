import { IEntityContentsItem, ProductImageTypes, IEntityContents } from '@djonnyx/tornado-types';
import { deepMergeObjects } from './object.util';

export const normalizeEntityContents = (contents: IEntityContents, defaultLang: string) => {
    const result = deepMergeObjects(contents, contents);

    let defaultContent: IEntityContentsItem;

    // экстракт дефолтового контента
    for (const lang in result) {
        if (lang === defaultLang) {
            defaultContent = result[lang];
            break;
        }
    }

    for (const lang in result) {
        if (!!result[lang]?.images) {
            const content = result[lang] || {};
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

    return result;
};

export const equalFromImages = (content: IEntityContentsItem, image: string): boolean => {
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
        } else if (imageType === ProductImageTypes.MAIN && !isDefault && isEqualtFromDefault) {
            return true;
        } else if (!content.images[imageType]) {
            return true;
        } else if (isDefault && (!content.images[imageType] || isEqualtFromDefault) && !!defaultContent && !!defaultContent?.images?.[imageType]) {
            return !!defaultContent.images[imageType] || !!defaultContent.images.main;
        }
    }

    return false;
}