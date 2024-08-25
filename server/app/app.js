import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import dbConnect from '../config/dbConnect.js';

dbConnect();
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>clean shot from server</h1>');
});

export default app;