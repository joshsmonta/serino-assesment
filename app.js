import express from 'express';
import Database from './database.js';
import treasureRoutes from './routes/treasure-routes.js';
import userRoutes from './routes/user-routes.js';

const app = express();
const port = 3000;

// Initialize Database
const db = new Database(process.env.MYSQL_CONNECTION_URI);


app.use(express.json());

app.use('/api', [treasureRoutes, userRoutes]);

app.post('/migrate', (req, res) => {
    try {
        if (req.body.migrate_type == "up") {
            const result = db.executeSqlFile('migrations/migrations-up.sql');
            res.status(200).send(result)
        }
        else if (req.body.migrate_type == "down") {
            const result = db.executeSqlFile('migrations/migrations-down.sql');
            res.status(200).send(result)
        }
    } catch (error) {
        console.error("Error executing migration:", error);
        res.status(500).send("Migration failed.");
    }
});

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
