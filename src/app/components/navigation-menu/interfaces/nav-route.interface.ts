export interface INavRoute {
    name: string;
    icon: string;
    route?: string;
    roles?: Array<string>;
    index?: number;
    expanded?: boolean;
    children?: Array<INavRoute>;
}