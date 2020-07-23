import { ISelector } from '@djonnyx/tornado-types';

export const formatSelectorModel = (selector: ISelector) => {
    return {
        name: selector.name,
        description: selector.description,
    }
}