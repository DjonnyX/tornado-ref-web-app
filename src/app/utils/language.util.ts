import { ILanguage } from '@djonnyx/tornado-types';

export const formatLanguageModel = (model: ILanguage) => {
    return {
        active: model.active,
        isDefault: model.isDefault,
        code: model.code,
        name: model.name,
        assets: model.assets,
        resources: {
            main: !!model.resources ? model.resources.main : null,
        },
        translation: model.translation,
        extra: model.extra,
    }
}