export interface INavRoute {
    name: string;
    icon: string;
    route?: string;
    index?: number;
    expanded?: boolean;
    children?: Array<INavRoute>;
}