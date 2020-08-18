import Document from './document';
import User from './user';
import moment, { Moment } from 'moment';
import { FileTypeEnum } from './file-type.enum';
import UserImp from './user.imp';

export default class DocumentImp implements Document {
    id: number;
    name: string;
    type: FileTypeEnum;
    content: string;
    createdAt: Moment;
    updatedAt: Moment;
    creator: User;
    editors: User[];
    viewers: User[];

    constructor(id: number = 0, name: string = '', type: FileTypeEnum = FileTypeEnum.TEXT, content: string = '', createdAt: Moment = moment(),
                updatedAt: Moment = moment(), creator: User = new UserImp(), editors: User[] = [], viewers: User[] = []) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.creator = creator;
        this.editors = editors;
        this.viewers = viewers;
    }
}
