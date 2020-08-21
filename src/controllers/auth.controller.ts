import { Express, Request, Response, Router } from 'express';
import { JsonConvert } from 'json2typescript';
import UserImp from '../model/user.imp';
import { APP_CONSTANTS } from '../config/app.config';
import jwt from 'jsonwebtoken';
import { users, increaseUserId, increaseFolderId, folders } from '../data/data';
import FolderImp from '../model/folder.imp';

const jsonConvert: JsonConvert = new JsonConvert();

export const authController = (app: Express, protectedRoutes: Router): void => {
    app.post(APP_CONSTANTS.ENDPOINTS.SIGN_UP, (req: Request, res: Response) => {
        const user = users.find(u => u.email === req.body.email);

        if (user) {
            res.status(400).json({ error: 'user_already_registered' });
        } else {
            const newUser = jsonConvert.deserializeObject(req.body, UserImp);
            newUser.id = increaseUserId();
            const newFolder = new FolderImp(increaseFolderId(), '/');
            newUser.rootFolderId = newFolder.id;
            newFolder.creator = newUser;

            users.push(newUser);
            folders.push(newFolder);

            const payload = { check: true, email: req.body.email };
            const token = jwt.sign(
                payload,
                app.get(APP_CONSTANTS.API_KEY_FIELD),
                { expiresIn: 1440 }
            );

            res.json({ user: jsonConvert.serialize(newUser), token });
        }
    });

    app.post(APP_CONSTANTS.ENDPOINTS.LOG_IN, (req: Request, res: Response) => {
        const user = users.find(u => u.email === req.body.email);

        if (user) {
            if (user.password === req.body.password) {
                const payload = { check: true, email: req.body.email };
                const token = jwt.sign(
                    payload,
                    app.get(APP_CONSTANTS.API_KEY_FIELD),
                    { expiresIn: 1440 }
                );

                res.json({ user: jsonConvert.serialize(user), token });
            } else {
                res.status(403).json({ error: 'wrong_password' });
            }
        } else {
            res.status(404).json({ error: 'user_not_found' });
        }
    });

    app.get(APP_CONSTANTS.ENDPOINTS.USER_INFO, protectedRoutes, (req: Request, res: Response) => {
        if (req.body.userInfo) {
            res.json({ user: jsonConvert.serialize(req.body.userInfo) });
        } else {
            res.status(404).json({ error: 'user_not_found' });
        }
    });
};
