import { IRequestFilter } from "./request-filter.interface";

export interface IRequestOptions {
    filter?: IRequestFilter;
    queryParams?: Object;
}