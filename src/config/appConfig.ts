import express, { urlencoded, json } from 'express';
import router from '../Routes';

const app = express();
app.use(urlencoded({extended: false}));
app.use(json());
app.use(router);

export = app;