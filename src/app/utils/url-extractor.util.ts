const QUERY_SEPARATOR_PATTERN = /\?/;
const PATH_PATTERN = /^.*(?=\?)/;
const QUERY_PATTERN = /(?=\?).*$/;
const QUERY_PARAMS_GROUP_PATTERN = /([^?=&]+)(=([^&]*))?/g;
const QUERY_PARAM_NAME_PATTERN = /^.*(?==)/;
const QUERY_PARAM_VALUE_PATTERN = /(?==).*$/;
const PATH_SEGMENT_PATTERN = /([\w-\.])+(?:[\\/|\w])/g;

export interface IURLSegments {
    path: string;
    query: {
        [key: string]: string;
    }
}

export interface IBreadCrumbsSegment {
    path: string;
    name: string;
}

/**
 * Парсинг пути в массив сегментов
 * @param {string} path
 * @return {Array<string>}
 */
export const parsePath = (path: string): string[] => {
    if (PATH_SEGMENT_PATTERN.test(path)) {
        return path.match(PATH_SEGMENT_PATTERN).map(v => v.replace(/([\/|/])/, ""));
    }
    return [];
}

export const extractBreadCrumbsSegments = (url: string): Array<IBreadCrumbsSegment> => {
    const segments = parsePath(url);
    const result = new Array<IBreadCrumbsSegment>();
    let currentPath = "";

    segments.forEach(segment => {
        currentPath += `/${segment}`;
        result.push({
            path: currentPath,
            name: segment,
        });
    });

    return result;
}

export const extractURL = (url: string): IURLSegments => {
    const pathSegs = QUERY_SEPARATOR_PATTERN.test(url) ? url.match(PATH_PATTERN) : [url];
    const path = !!pathSegs && pathSegs.length > 0 ? pathSegs[0] : "";

    const queryStringSegs = url.match(QUERY_PATTERN);
    const queryString = !!queryStringSegs && queryStringSegs.length > 0 ? queryStringSegs[0] : "";

    const query = {};
    const queryParamGroups = queryString.match(QUERY_PARAMS_GROUP_PATTERN);
    if (queryParamGroups) {
        for (let i = 0, l = queryParamGroups.length; i < l; i++) {
            const group = queryParamGroups[i].replace(/\?/g, "");

            const paramNameSegs = group.match(QUERY_PARAM_NAME_PATTERN);
            const paramName = !!paramNameSegs && paramNameSegs.length > 0 ? paramNameSegs[0] : "";

            const paramValueSegs = group.match(QUERY_PARAM_VALUE_PATTERN);
            const paramValue = !!paramValueSegs && paramValueSegs.length > 0 ? paramValueSegs[0] : "";

            query[paramName] = paramValue.replace(/\=/g, "");;
        }
    }

    return {
        path,
        query,
    }
}