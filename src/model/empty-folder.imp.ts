import Document from "./document";
import Folder from "./folder";
import moment, { Moment } from "moment";

export default class EmptyFolderImp implements Folder {
    id: string;
    name: string;
    parentFolderId?: string;
    documentIds: string[];
    documents: Document[];
    folders: Folder[];
    createdAt: Moment;
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
