import { Express, Request, Response, Router } from 'express';
import { APP_CONSTANTS } from '../config/app.config';
import { JsonConvert } from 'json2typescript';
import DocumentImp from '../model/document.imp';
import { documents, increaseDocumentId, folders } from '../data/data';
import UserImp from '../model/user.imp';

const jsonConvert: JsonConvert = new JsonConvert();

export const documentsController = (app: Express, protectedRoutes: Router): void => {
    app.get(APP_CONSTANTS.ENDPOINTS.DOCUMENTS_TRASH, protectedRoutes, (req: Request, res: Response) => {
        const creator = jsonConvert.deserializeObject(req.body.userInfo, UserImp);
        res.json({ documents: jsonConvert.serializeArray(documents.filter(d => d.editors.concat(d.viewers).includes(creator) && d.trash)) });
    });

    app.put(APP_CONSTANTS.ENDPOINTS.DOCUMENTS_TRASH_INFO, protectedRoutes, (req: Request, res: Response) => {
        const document = documents.find(d => d.id === req.params.id);

        if (document) {
            document.trash = false;
            res.json({ document: jsonConvert.serialize(document) });
        } else {
            res.status(404).json({ error: 'document_not_found' });
        }
    });

    app.delete(APP_CONSTANTS.ENDPOINTS.DOCUMENTS_TRASH_INFO, protectedRoutes, (req: Request, res: Response) => {
        const document = documents.find(d => d.id === req.params.id);
        const parentFolder = folders.find(f => f.id === document?.parentFolderId);

        if (document && parentFolder) {
            parentFolder.documentIds.splice(parentFolder.documentIds.indexOf(document.id), 1);
            documents.splice(documents.indexOf(document), 1);
            res.json({ document: jsonConvert.serialize(document) });
        } else {
            res.status(404).json({ error: 'document_not_found' });
        }
    });

    app.post(APP_CONSTANTS.ENDPOINTS.DOCUMENTS, protectedRoutes, (req: Request, res: Response) => {
        const creator = jsonConvert.deserializeObject(req.body.userInfo, UserImp);
        const document = jsonConvert.deserializeObject(req.body, DocumentImp);
        const parentFolder = folders.find(f => f.id === document.parentFolderId);

        if (parentFolder) {
            document.id = increaseDocumentId();
            document.creator = creator;
            document.editors.push(creator);
            documents.push(document);
            parentFolder.documentIds.push(document.id);
            res.json({ document: jsonConvert.serialize(document) });
        } else {
            res.status(404).json({ error: 'folder_not_found' });
        }
    });

    app.put(APP_CONSTANTS.ENDPOINTS.DOCUMENT_INFO, protectedRoutes, (req: Request, res: Response) => {
        const document = jsonConvert.deserializeObject(req.body, DocumentImp);
        const index = documents.findIndex(d => d.id === req.params.id);

        if (document) {
            const oldParentFolderId = documents[index].parentFolderId;
            documents[index] = document;

            if (oldParentFolderId !== document.parentFolderId) {
                const oldParentFolder = folders.find(f => f.id === oldParentFolderId);
                const newParentFolder = folders.find(f => f.id === document.parentFolderId);

                if (oldParentFolder && newParentFolder) {
                    oldParentFolder.documentIds.splice(oldParentFolder.documentIds.indexOf(document.id), 1);
                    newParentFolder.documentIds.push(document.id);
                    res.json({ document: jsonConvert.serialize(document) });
                } else {
                    res.status(404).json({ error: 'folder_not_found' });
                }
            }
        } else {
            res.status(404).json({ error: 'document_not_found' });
        }
    });

    app.delete(APP_CONSTANTS.ENDPOINTS.DOCUMENT_INFO, protectedRoutes, (req: Request, res: Response) => {
        const document = documents.find(d => d.id === req.params.id);

        if (document) {
            document.trash = true;
            res.json({ document: jsonConvert.serialize(document) });
        } else {
            res.status(404).json({ error: 'document_not_found' });
        }
    });
};
