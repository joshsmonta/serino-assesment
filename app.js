import express from 'express';
import Database from './database.js';

const app = express();
const port = 3000;

const db = new Database();

db.query('./migrations.sql');

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
