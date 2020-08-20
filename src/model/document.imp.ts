import Document from './document';
import User from './user';
import moment, { Moment } from 'moment';
import { FileTypeEnum } from './file-type.enum';
import UserImp from './user.imp';
import { JsonObject, JsonProperty, Any } from 'json2typescript';
import { MomentDeserializer } from './deserializers/moment.deserializer';

@JsonObject('DocumentImp')
export default class DocumentImp implements Document {

    @JsonProperty('id', String, true)
    id: string;

    @JsonProperty('name', String, true)
    name: string;

    @JsonProperty('type', String, true)
    type: FileTypeEnum;

    @JsonProperty('file', Any, true)
    file: Buffer;

    @JsonProperty('createdAt', MomentDeserializer, true)
    createdAt: Moment;

    @JsonProperty('updatedAt', MomentDeserializer, true)
    updatedAt: Moment;

    @JsonProperty('creator', UserImp, true)
    creator: User;

    @JsonProperty('editors', [UserImp], true)
    editors: User[];

    @JsonProperty('viewers', [UserImp], true)
    viewers: User[];

    @JsonProperty('trash', Boolean, true)
    trash: boolean;

    @JsonProperty('parentFolderId', String, true)
    parentFolderId: string;

    constructor(id: string = '', name: string = '', type: FileTypeEnum = FileTypeEnum.TEXT, file: Buffer = new Buffer(''), createdAt: Moment = moment(),
                updatedAt: Moment = moment(), creator: User = new UserImp(), editors: User[] = [], viewers: User[] = [], trash: boolean = false,
                parentFolderId: string = '') {
        this.id = id;
        this.name = name;
        this.type = type;
        this.file = file;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.creator = creator;
        this.editors = editors;
        this.viewers = viewers;
        this.trash = trash;
        this.parentFolderId = parentFolderId;
    }
}
