//ENV variables
require("dotenv").config()

import express from 'express';
import config from "config";

const  app = express();

// JSON middleware
app.use(express.json());

// db
import db from '../config/db';

// routes
import router from './router';

// logger
import Logger from '../config/logger';


// middlewares
import morganMiddleware from './middleware/morganMiddleware';
app.use(morganMiddleware)

app.use('/api', router);

// app port
const port =config.get<number>("port");

app.listen(port, async() => {
    await db()
    // console.log(`\n-=--=--=--=--=--=--=--=--=--=--=--=--=--=-\nServer running on http://localholst:${port}\n-=--=--=--=--=--=--=--=--=--=--=--=--=--=-\n\n`);
    Logger.info(`\n\n-=--=--=--=--=--=--=--=--=--=--=--=--=--=-\nServer running on http://localholst:${port}\n-=--=--=--=--=--=--=--=--=--=--=--=--=--=-\n\n`);
})