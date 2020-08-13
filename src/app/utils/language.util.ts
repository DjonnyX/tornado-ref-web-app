import { ILanguage } from '@djonnyx/tornado-types';

export const formatLanguageModel = (model: ILanguage) => {
    return {
        active: model.active,
        name: model.name,
        color: model.color,
        assets: model.assets,
        images: {
            main: !!model.images ? model.images.main : null,
        },
        translation: model.translation,
        extra: model.extra,
    }
}