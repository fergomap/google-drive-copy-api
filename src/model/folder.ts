import Document from "./document";
import User from "./user";
import { Moment } from "moment";

export default interface Folder {
    id: string;
    name: string;
    creator: User;
    parentFolderId?: string;
    documentIds: string[];
    documents: Document[];
    folders: Folder[];
    createdAt: Moment;
    updatedAt: Moment;
}
