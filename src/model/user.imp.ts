import User from './user';
import { JsonObject, JsonProperty } from 'json2typescript';
import Folder from './folder';
import EmptyFolderImp from './empty-folder.imp';

@JsonObject('UserImp')
export default class UserImp implements User {

    @JsonProperty('id', String, true)
    id: string;

    @JsonProperty('name', String, true)
    name: string;

    @JsonProperty('email', String, true)
    email: string;

    @JsonProperty('avatar', String, true)
    avatar: string;

    @JsonProperty('rootFolderId', String, true)
    rootFolderId: string;

    password: string;
    rootFolder: Folder;

    constructor(id: string = '', name: string = '', email: string = '', avatar: string = '', rootFolderId: string = '', password: string = '', rootFolder: Folder = new EmptyFolderImp()) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.rootFolderId = rootFolderId;
        this.password = password;
        this.rootFolder = rootFolder;
    }
}
