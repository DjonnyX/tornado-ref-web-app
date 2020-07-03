const QUERY_SEPARATOR_PATTERN = /\?/g;
const PATH_PATTERN = /^.*(?=\?)/g;
const QUERY_PATTERN = /(?=\?).*$/g;
const QUERY_PARAMS_GROUP_PATTERN = /([^?=&]+)(=([^&]*))?/g;
const QUERY_PARAM_NAME_PATTERN = /^.*(?==)/g;
const QUERY_PARAM_VALUE_PATTERN = /(?==).*$/g;

export interface IURLSegments {
    path: string;
    query: {
        [key: string]: string;
    }
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