import User from './user';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('UserImp')
export default class UserImp implements User {

    @JsonProperty('name', String, true)
    name: string;

    @JsonProperty('email', String, true)
    email: string;

    @JsonProperty('avatar', String, true)
    avatar: string;

    @JsonProperty('token', String, true)
    token: string;

    @JsonProperty('password', String, true)
    password: string;

    constructor(name: string = '', email: string = '', avatar: string = '', token: string = '', password: string = '') {
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.token = token;
        this.password = password;
    }
}
