import User from "../model/user";
import Document from "../model/document";
import UserImp from "../model/user.imp";
import FolderImp from "../model/folder.imp";
import DocumentImp from "../model/document.imp";
import { FileTypeEnum } from "../model/file-type.enum";

let USER_ID: number = 3, FOLDER_ID: number = 6, DOCUMENT_ID: number = 4;

const childFolder = new FolderImp('4', 'Child folder', '2');
const sonFolder1 = new FolderImp('2', 'First folder', '1');
const sonFolder2 = new FolderImp('3', 'Second folder', '1', [], [], [childFolder]);
const rootFolder = new FolderImp('1', '/', undefined, ['1', '2', '3', '4'], [], [sonFolder1, sonFolder2]);
const rootFolder2 = new FolderImp('5', '/');
const rootFolder3 = new FolderImp('6', '/');

const user = new UserImp('1', 'Fernando Gómez', 'fernando@gmail.com', 'https://image.shutterstock.com/image-photo/portrait-young-man-crossed-hands-260nw-582575041.jpg', rootFolder.id, '1234', rootFolder);
const user2 = new UserImp('2', 'Antonio Pérez', 'antonio@gmail.com', 'https://previews.123rf.com/images/zoranphotographer/zoranphotographer1809/zoranphotographer180900043/109200504-handsome-young-guy-with-sunglasses-posing-and-enjoying-a-nice-sunny-day-urban-city-environment-old-r.jpg', rootFolder2.id, '1234', rootFolder2);
const user3 = new UserImp('3', 'María García', 'maria@gmail.com', 'https://c.stocksy.com/a/F0A900/z9/2183407.jpg', rootFolder3.id, '1234', rootFolder3);

const document = new DocumentImp('1', 'TXT Document');
const document2 = new DocumentImp('2', 'IMG Document', FileTypeEnum.IMAGE);
const document3 = new DocumentImp('3', 'MP4 Document', FileTypeEnum.VIDEO);
const document4 = new DocumentImp('4', 'PDF Document', FileTypeEnum.PDF);
document.creator = user;
document2.creator = user;
document3.creator = user;
document4.creator = user;
document.editors = [user, user2];
document2.editors = [user];
document3.editors = [user];
document4.editors = [user];
document.viewers = [user3];

export const users: User[] = [ user, user2, user3 ];
export const documents: Document[] = [ document, document2, document3, document4 ];

export const increaseUserId = (): string => String(++USER_ID);
export const increaseFolderId = (): string => String(++FOLDER_ID);
export const increaseDocumentId = (): string => String(++DOCUMENT_ID);
