import Document from "./document";
import Folder from "./folder";
import User from "./user";
import UserImp from "./user.imp";
import { JsonObject, JsonProperty } from "json2typescript";
import DocumentImp from "./document.imp";

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

    constructor(id: string = '', name: string = '', creator: User = new UserImp(), parentFolderId?: string, documentIds: string[] = [], 
                documents: Document[] = [], folders: Folder[] = []) {
        this.id = id;
        this.name = name;
        this.creator = creator;
        this.parentFolderId = parentFolderId;
        this.documentIds = documentIds;
        this.documents = documents;
        this.folders = folders;
    }
}
