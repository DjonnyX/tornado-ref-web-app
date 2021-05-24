import { IIntegration } from '@djonnyx/tornado-types';
import { formatVersionModel } from './version.util';

export const formatIntegrationModel = (model: IIntegration): IIntegration => {
    return {
        host: model.host,
        name: model.name,
        description: model.description,
        rights: model.rights,
        version: formatVersionModel(model.version),
        state: model.state,
    }
}