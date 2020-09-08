export interface INavRoute {
    name: string;
    route?: string;
    index?: number;
    expanded?: boolean;
    children?: Array<INavRoute>;
}