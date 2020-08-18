import express, { Request, Response } from "express";
import bodyParser from 'body-parser';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { APP_CONSTANTS } from './config/app.config';
import User from './model/user';
import { JsonConvert } from 'json2typescript';
import UserImp from './model/user.imp';

const jsonConvert: JsonConvert = new JsonConvert();
const users: User[] = [];

const app = express();
app.set(APP_CONSTANTS.API_KEY_FIELD, APP_CONSTANTS.API_KEY);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const protectedRoutes = express.Router(); 
protectedRoutes.use((req: Request, res: Response, next: Function) => {
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(String(token), app.get(APP_CONSTANTS.API_KEY_FIELD), (err: VerifyErrors | null, decoded: object | undefined) => {
            if (err) {
                res.status(403).send({ error: 'not_authorized' });
            } else {
                req.body.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403).send({ error: 'not_authorized' });
    }
 });

app.post('/sign-up', (req: Request, res: Response) => {
    const user = users.find(u => u.email === req.body.email);

    if (user) {
        res.status(400).json({ error: 'user_already_registered' });
    } else {
        users.push(jsonConvert.deserializeObject(req.body, UserImp));

        const payload = { check: true, email: req.body.email };
        const token = jwt.sign(
            payload,
            app.get(APP_CONSTANTS.API_KEY_FIELD),
            { expiresIn: 1440 }
        );

        res.json({ token });
    }
});

app.post('/log-in', (req: Request, res: Response) => {
    const user = users.find(u => u.email === req.body.email);

    if (user) {
        if (user.password === req.body.password) {
            const payload = { check:  true };
            const token = jwt.sign(
                payload,
                app.get(APP_CONSTANTS.API_KEY_FIELD),
                { expiresIn: 1440 }
            );
            user.token = token;

            res.json({ user });
        } else {
            res.status(403).json({ error: 'wrong_password' });
        }
    } else {
        res.status(404).json({ error: 'user_not_found' });
    }
});

app.get('/user-info', protectedRoutes, (req: Request, res: Response) => {
    const user = users.find(u => u.email === req.body.decoded.email);

    if (user) {
        res.json({ user });
    } else {
        res.status(404).json({ error: 'user_not_found' });
    }
});

app.listen(APP_CONSTANTS.PORT);
