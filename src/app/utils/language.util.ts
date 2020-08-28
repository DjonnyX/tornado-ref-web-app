import { ILanguage } from '@djonnyx/tornado-types';

export const formatLanguageModel = (model: ILanguage) => {
    return {
        active: model.active,
        isDefault: model.isDefault,
        code: model.code,
        contents: model.contents,
        translation: model.translation,
        extra: model.extra,
    }
}