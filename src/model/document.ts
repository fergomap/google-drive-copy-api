import User from './user';
import { Moment } from 'moment';
import { FileTypeEnum } from './file-type.enum';

export default interface Document {
    id: number;
    name: string;
    type: FileTypeEnum;
    content: string;
    createdAt: Moment;
    updatedAt: Moment;
    creator: User;
    editors: User[];
    viewers: User[];
}
