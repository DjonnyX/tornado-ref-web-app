import { ILanguage } from '@djonnyx/tornado-types';

export const formatLanguageModel = (model: ILanguage) => {
    return {
        active: model.active,
        code: model.code,
        name: model.name,
        assets: model.assets,
        images: {
            main: !!model.images ? model.images.main : null,
        },
        translation: model.translation,
        extra: model.extra,
    }
}