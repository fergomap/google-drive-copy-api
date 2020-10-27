import { Express, Request, Response, Router } from 'express';
import { APP_CONSTANTS } from '../config/app.config';
import { JsonConvert } from 'json2typescript';
import { increaseFolderId, documents, users } from '../data/data';
import FolderImp from '../model/folder.imp';
import DocumentImp from '../model/document.imp';
import moment from 'moment';
import UserImp from '../model/user.imp';
import { searchFolder } from '../services/utils';
import Document from '../model/document';
import Folder from '../model/folder';

const jsonConvert: JsonConvert = new JsonConvert();

export const foldersController = (app: Express, protectedRoutes: Router): void => {
    app.post(APP_CONSTANTS.ENDPOINTS.FOLDERS, protectedRoutes, (req: Request, res: Response) => {
        const { rootFolder } = users.find(u => u.id === req.body.userInfo.id) || new UserImp();
        const folder = jsonConvert.deserializeObject(req.body, FolderImp);
        const parentFolder = searchFolder(rootFolder, folder.parentFolderId);
    
        if (parentFolder) {
            folder.id = increaseFolderId();
            parentFolder.folders.push(folder);
            res.json({ folder: jsonConvert.serialize(folder) });
        } else {
            res.status(404).json({ error: 'folder_not_found' });
        }
    });

    app.put(APP_CONSTANTS.ENDPOINTS.FOLDER_INFO, protectedRoutes, (req: Request, res: Response) => {
        const { rootFolder } = users.find(u => u.id === req.body.userInfo.id) || new UserImp();
        const folder = searchFolder(rootFolder, req.params.id);

        if (folder) {
            folder.name = req.body.name;
            folder.updatedAt = moment();
            res.json({ folder: jsonConvert.serialize(folder) });
        } else {
            res.status(404).json({ error: 'folder_not_found' });
        }
    });

    app.get(APP_CONSTANTS.ENDPOINTS.FOLDER_INFO, protectedRoutes, (req: Request, res: Response) => {
        const { rootFolder } = users.find(u => u.id === req.body.userInfo.id) || new UserImp();
        const folder = searchFolder(rootFolder, req.params.id);
        const searchQuery = String(req.query.search || '');

        if (folder) {
            const folderInfo = new FolderImp(folder.id, folder.name, folder.parentFolderId);
            folderInfo.createdAt = folder.createdAt;
            folderInfo.updatedAt = folder.updatedAt;
            
            folder.documentIds
                .map((docId: string) => documents.find(doc => doc.id === docId) || new DocumentImp())
                .filter((d: Document) => !!d.id && !d.trash && d.name.includes(searchQuery))
                .forEach((d: Document) => folderInfo.documents.push(d));

            folderInfo.folders = folder.folders.filter((f: Folder) => f.name.includes(searchQuery)).map((f: Folder) => new FolderImp(f.id, f.name));
        
            res.json({ folder: jsonConvert.serialize(folderInfo) });
        } else {
            res.status(404).json({ error: 'folder_not_found' });
        }
    });

    app.post(APP_CONSTANTS.ENDPOINTS.MOVE_FOLDER, protectedRoutes, (req: Request, res: Response) => {
        const { rootFolder } = users.find(u => u.id === req.body.userInfo.id) || new UserImp();
        const { newParentId, folderId } = req.body;
        const folder = searchFolder(rootFolder, folderId);
        const oldParentFolder = searchFolder(rootFolder, folder?.parentFolderId);
        const newParentFolder = searchFolder(rootFolder, newParentId);

        if (oldParentFolder && newParentFolder && folder) {
            oldParentFolder.folders.splice(oldParentFolder.folders.indexOf(folder), 1);
            folder.parentFolderId = newParentId;
            newParentFolder.folders.push(folder);
            res.json({ folder: jsonConvert.serialize(folder) });
        } else {
            res.status(404).json({ error: 'folder_not_found' });
        }
    });
};
