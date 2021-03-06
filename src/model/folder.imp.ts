import Document from "./document";
import Folder from "./folder";
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

    @JsonProperty('parentFolderId', String, true)
    parentFolderId?: string;

    documentIds: string[];

    @JsonProperty('documents', [DocumentImp], true)
    documents: Document[];

    @JsonProperty('folders', [FolderImp], true)
    folders: Folder[];

    @JsonProperty('createdAt', MomentDeserializer, true)
    createdAt: Moment;

    @JsonProperty('updatedAt', MomentDeserializer, true)
    updatedAt: Moment;

    constructor(id: string = '', name: string = '', parentFolderId?: string, documentIds: string[] = [], 
                documents: Document[] = [], folders: Folder[] = [], createdAt: Moment = moment(), updatedAt: Moment = moment()) {
        this.id = id;
        this.name = name;
        this.parentFolderId = parentFolderId;
        this.documentIds = documentIds;
        this.documents = documents;
        this.folders = folders;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
