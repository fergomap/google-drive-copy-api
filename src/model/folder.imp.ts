import Document from "./document";
import Folder from "./folder";
import User from "./user";
import UserImp from "./user.imp";
import { JsonObject, JsonProperty } from "json2typescript";
import DocumentImp from "./document.imp";
import moment, { Moment } from "moment";
import { MomentDeserializer } from "./deserializers/moment.deserializer";

@JsonObject('FolderImp')
export default class FolderImp implements Folder {

    @JsonProperty('id', String, true)
    id: string;

    @JsonProperty('name', String, true)
    name: string;

    @JsonProperty('creator', UserImp, true)
    creator: User;

    @JsonProperty('parentFolderId', String, true)
    parentFolderId?: string;

    @JsonProperty('documentIds', [String], true)
    documentIds: string[];

    @JsonProperty('documents', [DocumentImp], true)
    documents: Document[];

    @JsonProperty('folders', [FolderImp], true)
    folders: Folder[];

    @JsonProperty('createdAt', MomentDeserializer, true)
    createdAt: Moment;

    @JsonProperty('updatedAt', MomentDeserializer, true)
    updatedAt: Moment;

    constructor(id: string = '', name: string = '', creator: User = new UserImp(), parentFolderId?: string, documentIds: string[] = [], 
                documents: Document[] = [], folders: Folder[] = [], createdAt: Moment = moment(), updatedAt: Moment = moment()) {
        this.id = id;
        this.name = name;
        this.creator = creator;
        this.parentFolderId = parentFolderId;
        this.documentIds = documentIds;
        this.documents = documents;
        this.folders = folders;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
