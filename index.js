'use strict';

require('dotenv').config();
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes  from './app/routes';
import config  from './config';
import './db';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(config.port, () => {
    console.log('We are live on ' + config.port);
});
