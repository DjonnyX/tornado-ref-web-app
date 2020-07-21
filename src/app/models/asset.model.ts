import { IEntity } from './entity.model';
import { IProgress } from './progress.model';

export interface IAsset extends IEntity {
    /**
     * имя
     */
    name: string;
    /**
     * lastupdate
     */
    lastupdate: number;
    /**
     * расширение
     */
    ext: string;
    /**
     * путь до ресурса
     */
    path: string;
    /**
     * mipmap
     */
    mipmap: {
        x128: string;
        x32: string;
    };
    // сервисные свойства
    progress?: IProgress;
}
