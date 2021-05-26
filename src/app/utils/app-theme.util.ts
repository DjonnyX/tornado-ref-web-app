import { IAppTheme } from '@djonnyx/tornado-types';

export const formatAppThemeModel = (model: IAppTheme) => {
    return {
        client: model.client,
        type: model.type,
        name: model.name,
        version: model.version,
        lastUpdate: model.lastUpdate,
        data: model.data,
    }
}