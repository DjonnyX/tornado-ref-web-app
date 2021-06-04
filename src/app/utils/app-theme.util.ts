import { IAppTheme } from '@djonnyx/tornado-types';

export enum ThemeDescriptiorKeyTypes {
    PROP,
    ASSET,
}

export interface IThemeDescriptorValue {
    value: string;
    type: ThemeDescriptiorKeyTypes,
}

interface IThemeDescriptorOutputData {
    prop: string;
    value: IThemeDescriptorValue,
}

export interface IThemeDescriptior {
    [key: string]: IThemeDescriptorValue;
}

export interface ICompiledTheme {
    theme: IAppTheme,
    descriptor: IThemeDescriptior,
}

const ASSET_PATTERN = /(\.backgroundImage)$/;

const isAsset = (prop: string): boolean => {
    return ASSET_PATTERN.test(prop);
}

type TOutputData = string | IThemeDescriptorOutputData | any;

const compileThemeDescriptorProp = (data: any, lastProp?: string, result: IThemeDescriptior = {}): TOutputData | undefined => {
    if (typeof data === "string") {
        return {
            prop: lastProp,
            value: {
                value: data,
                type: isAsset(data) ? ThemeDescriptiorKeyTypes.ASSET : ThemeDescriptiorKeyTypes.PROP,
            },
        };
    }

    for (const propName in data) {
        const subData = data[propName];
        const outputData = compileThemeDescriptorProp(subData, !!lastProp ? `${lastProp}.${propName}` : propName, result);

        if (outputData?.value?.type === ThemeDescriptiorKeyTypes.ASSET || outputData?.value?.type === ThemeDescriptiorKeyTypes.PROP) {
            result[outputData.prop] = outputData.value;
        }
    }
}

export const getThemeDescriptor = (theme: IAppTheme) => {
    const descriptor: IThemeDescriptior = {};
    compileThemeDescriptorProp(theme.data, undefined, descriptor);
    return descriptor;
}

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