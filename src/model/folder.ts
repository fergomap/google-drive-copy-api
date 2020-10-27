import Document from "./document";
import { Moment } from "moment";

export default interface Folder {
    id: string;
    name: string;
    parentFolderId?: string;
    documentIds: string[];
    documents: Document[];
    folders: Folder[];
    createdAt: Moment;
    updatedAt: Moment;
}
