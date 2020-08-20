import User from './user';
import { JsonObject, JsonProperty } from 'json2typescript';

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

    @JsonProperty('password', String, true)
    password: string;

    @JsonProperty('rootFolderId', String, true)
    rootFolderId: string;

    constructor(id: string = '', name: string = '', email: string = '', avatar: string = '', password: string = '', rootFolderId: string = '') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.password = password;
        this.rootFolderId = rootFolderId;
    }
}
