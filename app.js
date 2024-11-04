import express from 'express';
import Database from './database.js';
import treasureRoutes from './routes/treasure-routes.js';

const app = express();
const port = 3000;

// Initialize Database
const db = new Database();


app.use(express.json());

app.use('/api', treasureRoutes);

app.post('/migrate', async (req, res) => {
    try {
        if (req.body.migrate_type == "up") {
            await db.executeSqlFile('migrations/migrations-up.sql');
        }
        else if (req.body.migrate_type == "down") {
            await db.executeSqlFile('migrations/migrations-down.sql');
        }
        res.send("Migration completed successfully.");
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
