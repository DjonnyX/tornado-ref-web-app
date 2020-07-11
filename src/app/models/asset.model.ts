import { IEntity } from './entity.model';
import { IProgress } from './progress.model';

export interface IAsset extends IEntity {
    /**
     * имя
     */
    name: string;
    /**
     * расширение
     */
    ext: string;
    /**
     * путь до ресурса
     */
    path: string;
    thumbnail: string;
    // сервисные свойства
    progress?: IProgress;
}
