import { Express, Request, Response, Router } from 'express';
import { APP_CONSTANTS } from '../config/app.config';
import Document from '../model/document';

export const documentsController = (app: Express, protectedRoutes: Router, documents: Document[]): void => {
    app.get(APP_CONSTANTS.ENDPOINTS.DOCUMENTS, protectedRoutes, (req: Request, res: Response) => {
        
    });
};
