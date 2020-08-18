import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { APP_CONSTANTS } from './config/app.config';
import User from './model/user';
import { getProtectedRoutes } from './middleware/jwt.middleware';
import { authController } from './controllers/auth.controller';
import Document from './model/document';
import { documentsController } from './controllers/documents.controller';

const users: User[] = [];
const documents: Document[] = [];

const app = express();
app.set(APP_CONSTANTS.API_KEY_FIELD, APP_CONSTANTS.API_KEY);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const protectedRoutes: Router = getProtectedRoutes(app);

authController(app, protectedRoutes, users);
documentsController(app, protectedRoutes, documents);

app.listen(APP_CONSTANTS.PORT);
