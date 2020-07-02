import { IEntity } from './entity.model';

export interface ITag extends IEntity {
    description: string;
    color: string;
}
