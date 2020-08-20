import Document from "./document";
import User from "./user";

export default interface Folder {
    id: string;
    name: string;
    creator: User;
    parentFolderId?: string;
    documentIds: string[];
    documents: Document[];
    folders: Folder[];
}
