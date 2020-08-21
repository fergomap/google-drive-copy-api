import { Express, Request, Response, Router } from 'express';
import { APP_CONSTANTS } from '../config/app.config';
import { JsonConvert } from 'json2typescript';
import { folders, increaseFolderId, documents } from '../data/data';
import FolderImp from '../model/folder.imp';
import DocumentImp from '../model/document.imp';
import moment from 'moment';

const jsonConvert: JsonConvert = new JsonConvert();

export const foldersController = (app: Express, protectedRoutes: Router): void => {
    app.post(APP_CONSTANTS.ENDPOINTS.FOLDERS, protectedRoutes, (req: Request, res: Response) => {
        const folder = jsonConvert.deserializeObject(req.body, FolderImp);
        const parentFolder = folders.find(f => f.id === folder.parentFolderId);
        folder.id = increaseFolderId();
        folder.creator = req.body.userInfo;
        parentFolder?.folders.push(folder);
        folders.push(folder);
        res.json({ folder: jsonConvert.serialize(folder) });
    });

    app.put(APP_CONSTANTS.ENDPOINTS.FOLDER_INFO, protectedRoutes, (req: Request, res: Response) => {
        const updatedFolder = jsonConvert.deserializeObject(req.body, FolderImp);
        const folder = folders.find(f => f.id === req.params.id);

        if (folder) {
            folder.updatedAt = moment();
            folder.name = updatedFolder.name;
            folder.documents = folder.documentIds.map(docId => documents.find(doc => doc.id === docId) || new DocumentImp()).filter(d => !!d.id && !d.trash);
            res.json({ folder: jsonConvert.serialize(folder) });
        } else {
            res.status(404).json({ error: 'folder_not_found' });
        }
    });

    app.get(APP_CONSTANTS.ENDPOINTS.FOLDER_INFO, protectedRoutes, (req: Request, res: Response) => {
        const folder = folders.find(f => f.id === req.params.id);
        const searchQuery = String(req.query.search || '');

        if (folder) {
            const folderInfo = {...folder};
            folderInfo.documents = folderInfo.documentIds.map(docId => documents.find(doc => doc.id === docId) || new DocumentImp()).filter(d => !!d.id && !d.trash && d.name.includes(searchQuery));
            folderInfo.folders.forEach(f => {
                f.folders = [];
            });
            folderInfo.folders = folderInfo.folders.filter(f => f.name.includes(searchQuery));

            res.json({ folder: folderInfo });
        } else {
            res.status(404).json({ error: 'folder_not_found' });
        }
    });

    app.post(APP_CONSTANTS.ENDPOINTS.MOVE_FOLDER, protectedRoutes, (req: Request, res: Response) => {
        const { oldParentId, newParentId, folderId } = req.body;
        const oldParentFolder = folders.find(f => f.id === oldParentId);
        const newParentFolder = folders.find(f => f.id === newParentId);
        const folder = folders.find(f => f.id === folderId);

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
