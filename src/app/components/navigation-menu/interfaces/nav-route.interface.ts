import { UserRights } from "@djonnyx/tornado-types";

export interface INavRoute {
    name: string;
    icon: string;
    route?: string;
    roles?: Array<string>;
    right?: UserRights;
    anyRights?: Array<UserRights>;
    index?: number;
    expanded?: boolean;
    children?: Array<INavRoute>;
    parent?: INavRoute;
}