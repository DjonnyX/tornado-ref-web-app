import { IEntityContentsItem, ProductResourceTypes, IEntityContents } from '@djonnyx/tornado-types';
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
        if (!!result[lang]?.resources) {
            const content = result[lang] || {};
            for (const resourcesType in content.resources) {
                const isEqualtFromDefault = equalFromResources(defaultContent, content.resources[resourcesType]);
                if (resourcesType !== ProductResourceTypes.MAIN && !!content.resources.main && (!content.resources[resourcesType] || (isEqualtFromDefault && lang !== defaultLang))) {
                    content.resources[resourcesType] = content.resources.main;
                } else if (lang !== defaultLang && (!content.resources[resourcesType] || isEqualtFromDefault) && !!defaultContent?.resources?.[resourcesType]) {
                    content.resources[resourcesType] = defaultContent.resources[resourcesType] || defaultContent.resources.main;
                }
            }
        }
    }

    return result;
};

export const equalFromResources = (content: IEntityContentsItem, resources: string): boolean => {
    if (!!content && !!content.resources) {
        for (const resourcesType in content) {
            if (resources == content[resourcesType]) {
                return true;
            }
        }
    }
    return false;
};

export const isEqualWithDefault = (defaultContent: any, content: any, resourcesType: ProductResourceTypes | string, isDefault: boolean): boolean => {
    if (!!content && !!content.resources) {
        const isEqualtFromDefault = equalFromResources(defaultContent, content.resources[resourcesType]);
        if (resourcesType !== ProductResourceTypes.MAIN && !!content.resources.main && (!content.resources[resourcesType] || content.resources[resourcesType] === content.resources.main || (isEqualtFromDefault && !isDefault))) {
            return true;
        } else if (resourcesType === ProductResourceTypes.MAIN && !isDefault && isEqualtFromDefault) {
            return true;
        } else if (!content.resources[resourcesType]) {
            return true;
        } else if (isDefault && (!content.resources[resourcesType] || isEqualtFromDefault) && !!defaultContent && !!defaultContent?.resources?.[resourcesType]) {
            return !!defaultContent.resources[resourcesType] || !!defaultContent.resources.main;
        }
    }

    return false;
}