import { ISelector } from '@djonnyx/tornado-types';

export const formatSelectorModel = (selector: ISelector) => {
    return {
        active: selector.active,
        name: selector.name,
        description: selector.description,
        extra: selector.extra,
    }
}