import mongoose, { ConnectOptions } from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from "./routes/index";
import { URL_DB, SETUP_DB } from './utils/constants';

dotenv.config();

mongoose.connect(URL_DB, SETUP_DB as ConnectOptions, (err: Error) => {
  if (err) throw err;
  console.log('Connected to Mongo')
});

const { PORT = 4000 } = process.env;
const app = express();

app.use('/', express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(router);

app.listen(PORT);