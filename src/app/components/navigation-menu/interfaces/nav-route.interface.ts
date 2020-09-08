export interface INavRoute {
    name: string;
    route?: string;
    index?: number;
    children?: Array<INavRoute>;
}