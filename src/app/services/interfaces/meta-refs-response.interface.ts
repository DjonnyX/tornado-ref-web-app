export interface IRef {
    name: string;
    version: number;
    lastUpdate: number;
}

export interface IMetaRefsResponse {
    ref: IRef;
}