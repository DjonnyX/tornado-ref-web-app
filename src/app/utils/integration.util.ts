import { IIntegration } from '@djonnyx/tornado-types';
import { formatVersionModel } from './version.util';

export const formatIntegrationModel = (model: IIntegration): IIntegration => {
    return {
        host: model.host,
        name: model.name,
        version: formatVersionModel(model.version),
        rights: model.rights,
        active: model.active,
        state: model.state,
    }
}