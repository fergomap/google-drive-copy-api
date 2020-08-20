import express, { Express, Request, Response, Router } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { APP_CONSTANTS } from '../config/app.config';
import { users } from '../data/data';

export const getProtectedRoutes = (app: Express): Router => {
    const protectedRoutes = express.Router(); 
    
    protectedRoutes.use((req: Request, res: Response, next: Function) => {
        const token = req.headers['access-token'];

        if (token) {
            jwt.verify(String(token), app.get(APP_CONSTANTS.API_KEY_FIELD), (err: VerifyErrors | null, decoded: any) => {
                if (err) {
                    res.status(403).send({ error: 'not_authorized' });
                } else {
                    const user = users.find(u => u.email === String(decoded?.email));

                    if(!user) {
                        res.status(404).send({ error: 'user_not_found' });
                    } else {
                        req.body.userInfo = user;
                        next();
                    }
                }
            });
        } else {
            res.status(403).send({ error: 'not_authorized' });
        }
    });

    return protectedRoutes;
};
