import { IIntegration } from '@djonnyx/tornado-types';
import { formatVersionModel } from './version.util';

export const formatIntegrationModel = (model: IIntegration): IIntegration => {
    return {
        name: model.name,
        description: model.description,
        rights: model.rights,
        version: formatVersionModel(model.version),
        state: model.state,
    }
}