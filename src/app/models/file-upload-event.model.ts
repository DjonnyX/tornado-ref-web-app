export interface IFileUploadEntityEvent {
    file: File;
    dataField: string;
}

export interface IFileUploadEvent {
    file: File;
    langCode: string;
    dataField?: string;
}