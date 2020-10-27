import { Express, Request, Response, Router } from 'express';
import { APP_CONSTANTS } from '../config/app.config';
import { JsonConvert } from 'json2typescript';
import DocumentImp from '../model/document.imp';
import { documents, increaseDocumentId, users } from '../data/data';
import UserImp from '../model/user.imp';
import { searchFolder } from '../services/utils';
import moment from 'moment';

const jsonConvert: JsonConvert = new JsonConvert();

export const documentsController = (app: Express, protectedRoutes: Router): void => {
    app.get(APP_CONSTANTS.ENDPOINTS.DOCUMENTS_TRASH, protectedRoutes, (req: Request, res: Response) => {
        res.json({ documents: jsonConvert.serializeArray(documents.filter(d => d.editors.concat(d.viewers).map(u => u.id).includes(req.body.userInfo.id) && d.trash)) });
    });

    app.put(APP_CONSTANTS.ENDPOINTS.DOCUMENTS_TRASH_INFO, protectedRoutes, (req: Request, res: Response) => {
        const document = documents.find(d => d.id === req.params.id);

        if (document) {
            document.updatedAt = moment();
            document.trash = false;
            res.json({ document: jsonConvert.serialize(document) });
        } else {
            res.status(404).json({ error: 'document_not_found' });
        }
    });

    app.delete(APP_CONSTANTS.ENDPOINTS.DOCUMENTS_TRASH_INFO, protectedRoutes, (req: Request, res: Response) => {
        const document = documents.find(d => d.id === req.params.id);

        if (document) {
            documents.splice(documents.indexOf(document), 1);
            res.json({ document: { id: document.id } });
        } else {
            res.status(404).json({ error: 'document_not_found' });
        }
    });

    app.post(APP_CONSTANTS.ENDPOINTS.DOCUMENTS, protectedRoutes, (req: Request, res: Response) => {
        const user = users.find(u => u.id === req.body.userInfo.id) || new UserImp();
        const document = jsonConvert.deserializeObject(req.body, DocumentImp);
        const parentFolder = searchFolder(user.rootFolder, req.body.parentFolderId);

        if (parentFolder && user) {
            document.id = increaseDocumentId();
            document.creator = user;
            document.editors.push(user);
            documents.push(document);
            parentFolder.documentIds.push(document.id);

            res.json({ document: jsonConvert.serialize(document) });
        } else {
            res.status(404).json({ error: 'folder_not_found' });
        }
    });

    app.delete(APP_CONSTANTS.ENDPOINTS.DOCUMENT_INFO, protectedRoutes, (req: Request, res: Response) => {
        const document = documents.find(d => d.id === req.params.id);

        if (document) {
            document.trash = true;
            document.updatedAt = moment();
            res.json({ document: { id: document.id } });
        } else {
            res.status(404).json({ error: 'document_not_found' });
        }
    });

    app.put(APP_CONSTANTS.ENDPOINTS.MOVE_DOCUMENT, protectedRoutes, (req: Request, res: Response) => {
        const { rootFolder } = users.find(u => u.id === req.body.userInfo.id) || new UserImp();
        const document = documents.find(d => d.id === req.body.id);
        const oldParentFolder = searchFolder(rootFolder, req.body.oldParentFolderId);
        const newParentFolder = searchFolder(rootFolder, req.body.newParentFolderId);

        if (document && oldParentFolder && newParentFolder) {
            document.updatedAt = moment();
            newParentFolder.documentIds.push(req.body.id);
            oldParentFolder.documentIds.splice(oldParentFolder.documentIds.indexOf(req.body.id), 1);
            res.json({ document: { id: document.id, parentFolderId: newParentFolder.id } });
        } else {
            res.status(404).json({ error: 'document_not_found' });
        }
    });

    app.put(APP_CONSTANTS.ENDPOINTS.ADD_EDITOR, protectedRoutes, (req: Request, res: Response) => {
        const document = documents.find(d => d.id === req.params.documentId);
        const user = users.find(u => u.id === req.params.userId);

        if (document && user) {
            user.rootFolder.documentIds.push(document.id);
            document.editors.push(user);
            document.updatedAt = moment();
            res.json({ document: { id: document.id } });
        } else {
            res.status(404).json({ error: 'document_not_found' });
        }
    });

    app.put(APP_CONSTANTS.ENDPOINTS.ADD_VIEWER, protectedRoutes, (req: Request, res: Response) => {
        const document = documents.find(d => d.id === req.params.documentId);
        const user = users.find(u => u.id === req.params.userId);

        if (document && user) {
            document.viewers.push(user);
            document.updatedAt = moment();
            user.rootFolder.documentIds.push(document.id);
            res.json({ document: { id: document.id } });
        } else {
            res.status(404).json({ error: 'document_not_found' });
        }
    });

    app.put(APP_CONSTANTS.ENDPOINTS.REMOVE_EDITOR, protectedRoutes, (req: Request, res: Response) => {
        const document = documents.find(d => d.id === req.params.documentId);
        const user = users.find(u => u.id === req.params.userId);

        if (document && user) {
            user.rootFolder.documentIds.splice(user.rootFolder.documentIds.indexOf(document.id), 1);
            document.editors.splice(document.editors.indexOf(user), 1);
            document.updatedAt = moment();
            res.json({ document: { id: document.id } });
        } else {
            res.status(404).json({ error: 'document_not_found' });
        }
    });

    app.put(APP_CONSTANTS.ENDPOINTS.REMOVE_VIEWER, protectedRoutes, (req: Request, res: Response) => {
        const document = documents.find(d => d.id === req.params.documentId);
        const user = users.find(u => u.id === req.params.userId);

        if (document && user) {
            user.rootFolder.documentIds.splice(user.rootFolder.documentIds.indexOf(document.id), 1);
            document.viewers.splice(document.viewers.indexOf(user), 1);
            document.updatedAt = moment();
            res.json({ document: { id: document.id } });
        } else {
            res.status(404).json({ error: 'document_not_found' });
        }
    });

    app.put(APP_CONSTANTS.ENDPOINTS.RENAME_FILE, protectedRoutes, (req: Request, res: Response) => {
        const document = documents.find(d => d.id === req.params.id);

        if (document) {
            document.name = req.body.name;
            document.updatedAt = moment();
            res.json({ document: { id: document.id } });
        } else {
            res.status(404).json({ error: 'document_not_found' });
        }
    });
};
