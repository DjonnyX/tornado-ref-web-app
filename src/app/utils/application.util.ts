import { IApplication } from '@djonnyx/tornado-types';

export const formatApplicationModel = (model: IApplication) => {
    return {
        name: model.name,
        description: model.description,
        version: model.version,
        state: model.state,
        lastUpdate: model.lastUpdate,
    }
}