import { IAsset } from '@djonnyx/tornado-types';

export interface IFileUploadEntityEvent {
    file: File;
    dataField: string;
}

export interface IFileUploadEvent {
    file: File;
    langCode?: string;
    key?: string;
    dataField?: string;
}

export interface IAssetUploadEvent {
    asset: IAsset;
    langCode?: string;
}