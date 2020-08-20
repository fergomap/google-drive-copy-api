import User from "../model/user";
import Document from "../model/document";
import Folder from "../model/folder";

let USER_ID: number = 0, FOLDER_ID: number = 0, DOCUMENT_ID: number = 0;

export const users: User[] = [];
export const folders: Folder[] = [];
export const documents: Document[] = [];

export const increaseUserId = (): string => String(++USER_ID);
export const increaseFolderId = (): string => String(++FOLDER_ID);
export const increaseDocumentId = (): string => String(++DOCUMENT_ID);
