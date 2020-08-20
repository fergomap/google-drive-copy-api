import User from './user';
import { Moment } from 'moment';
import { FileTypeEnum } from './file-type.enum';

export default interface Document {
    id: string;
    name: string;
    type: FileTypeEnum;
    file: Buffer;
    createdAt: Moment;
    updatedAt: Moment;
    creator: User;
    editors: User[];
    viewers: User[];
    trash: boolean;
    parentFolderId: string;
}
