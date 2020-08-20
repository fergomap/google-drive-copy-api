import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { APP_CONSTANTS } from './config/app.config';
import { getProtectedRoutes } from './middleware/jwt.middleware';
import { authController } from './controllers/auth.controller';
import { documentsController } from './controllers/documents.controller';
import { foldersController } from './controllers/folders.controller';

const app = express();
app.set(APP_CONSTANTS.API_KEY_FIELD, APP_CONSTANTS.API_KEY);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const protectedRoutes: Router = getProtectedRoutes(app);

authController(app, protectedRoutes);
foldersController(app, protectedRoutes);
documentsController(app, protectedRoutes);

app.listen(APP_CONSTANTS.PORT);
