import { IAppTheme } from '@djonnyx/tornado-types';
import Color from "color";

export enum ThemeDescriptiorKeyTypes {
    PROP,
    COLOR,
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

const COLOR_PATTERN = /(color|Color)/;

const isAsset = (prop: string): boolean => {
    return ASSET_PATTERN.test(prop);
}

const isColor = (prop: string): boolean => {
    return COLOR_PATTERN.test(prop);
}

type TOutputData = string | IThemeDescriptorOutputData | any;

const compileThemeDescriptorProp = (data: any, lastProp?: string, result: IThemeDescriptior = {}): TOutputData | undefined => {
    if (typeof data === "string") {
        let type: ThemeDescriptiorKeyTypes;
        if (isColor(lastProp)) {
            type = ThemeDescriptiorKeyTypes.COLOR;
            if (data === "none") {
                data = "transparent";
            }

            data = Color(data).string(8);
        } else if (isAsset(lastProp)) {
            type = ThemeDescriptiorKeyTypes.ASSET;
        } else {
            type = ThemeDescriptiorKeyTypes.PROP;
        }
        return {
            prop: lastProp,
            value: {
                value: data,
                type,
            },
        };
    }

    for (const propName in data) {
        const subData = data[propName];
        const outputData = compileThemeDescriptorProp(subData, !!lastProp ? `${lastProp}.${propName}` : propName, result);

        if (outputData?.value?.type === ThemeDescriptiorKeyTypes.ASSET
            || outputData?.value?.type === ThemeDescriptiorKeyTypes.COLOR
            || outputData?.value?.type === ThemeDescriptiorKeyTypes.PROP) {
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