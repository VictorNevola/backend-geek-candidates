import express from 'express';
import router from '../Routes';

const app = express();
app.use(router);

export = app;