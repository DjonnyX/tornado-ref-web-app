import { IEntity } from './entity.model';

export interface ITag extends IEntity {
    name: string;
    description: string;
    color: string;
}
