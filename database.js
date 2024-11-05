import mysql from "mysql2/promise";
import fs from "fs";
export default class Database {
  constructor() {
    /* Perform initialization tasks here...
      The pool does not create all connections upfront but creates them on demand until the connection limit is reached.
    */
    if (Database.instance) {
      return Database.instance;
    }
    try {
      this.pool = mysql.createPool({
        host: 'mysql-kitra',
        user: 'root',
        password: '123456',
        database: 'kitra',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
      });
      console.log("Database connected");
    } catch (error) {
      console.error("Database connection error:", err)
    }
    Database.instance = this;
  }

  async query(sql) {
    if (this.pool) {
      try {
        const conn = await this.pool.getConnection()
        const [rows] = await conn.query(sql);
        conn.release();
        return rows;
      } catch (error) {
        conn.release();
        console.error('Error executing query:', error);
        // Handle query execution error gracefully
      }
    } else {
      console.error('Database connection not established');
      // Handle the case where connection is not established
    }
  }

  async executeSqlFile(filePath) {
    try {
      // Read the SQL file
      const sql = await fs.promises.readFile(filePath, 'utf8');
      // Execute the SQL
      // Split the SQL by semicolons and filter out any empty queries
      const queries = sql.split(';').map(query => query.trim()).filter(query => query.length > 0);
      for (const query of queries) {
        const result = await this.query(query);
        console.log(result);
      }
      console.log("Initial migration successful;");
    } catch (error) {
      console.error('Error executing SQL file:', error);
    }
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}