import mysql from "mysql";

export default class Database {
    constructor() {
      if (Database.instance) {
        return Database.instance;
      }
  
      // Perform initialization tasks here...
      this.connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'kitra'
        }).connect();
  
      Database.instance = this;
    }
  
    query(sql) {
        if (this.connection) {
            try {
              const [rows] = this.connection.query(sql);
              return rows;
            } catch (error) {
              console.error('Error executing query:', error);
              // Handle query execution error gracefully
            }
        } else {
        console.error('Database connection not established');
        // Handle the case where connection is not established
        }     
    }
}