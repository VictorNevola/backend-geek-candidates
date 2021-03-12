import express, { urlencoded, json } from 'express';
import cors from 'cors';
import router from '../Routes';
import mongoConnect from './dbConect';

mongoConnect();
const app = express();
app.use(cors());
app.use(urlencoded({extended: false}));
app.use(json());
app.use(router);

export = app;