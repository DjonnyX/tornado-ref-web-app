import { IEntityContentsItem, ProductResourceTypes, IEntityContents, ILanguage } from '@djonnyx/tornado-types';
import { deepClone, deepMergeObjects } from './object.util';

export const normalizeEntityContents = (contents: IEntityContents, defaultLang: string) => {
    const result = deepClone(contents);

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
                const isEqualtFromDefault = equalFromResources(defaultContent, content, resourcesType);
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

export const equalFromResources = (defaultContent: IEntityContentsItem, content: IEntityContentsItem, resourceType: string): boolean => {
    if (!!content && !!content.resources) {
        if (content !== defaultContent) {
            return !content.resources[resourceType] || content.resources[resourceType] === defaultContent.resources[resourceType] || content.resources[resourceType] === defaultContent.resources["main"];
        } else {
            return !content.resources[resourceType] || content.resources[resourceType] === content.resources["main"];
        }
    }
    return false;
};

export const isEqualWithDefault = (defaultContent: any, content: any, resourcesType: ProductResourceTypes | string): boolean => {
    return equalFromResources(defaultContent, content, resourcesType);
}

export const getCompiledContents = (contents: any, languages: Array<ILanguage>, defaultLanguage: ILanguage) => {
    const result = {};
    for (const lang in contents) {
        // переопределение контента для разных языков
        result[lang] = lang === defaultLanguage.code ? deepClone(contents[lang]) : deepMergeObjects(contents[defaultLanguage.code], contents[lang]);
    }

    // добовление контента языков которых нет в базе
    for (const lang of languages) {
        if (result[lang.code]) {
            continue;
        }

        result[lang.code] = deepClone(result[defaultLanguage.code]);
    }

    normalizeEntityContents(result, defaultLanguage.code);

    return result;
}