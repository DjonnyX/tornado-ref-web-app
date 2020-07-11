import { ISelector } from '@models';

export const formatSelectorModel = (selector: ISelector) => {
    return {
        name: selector.name,
        description: selector.description,
    }
}