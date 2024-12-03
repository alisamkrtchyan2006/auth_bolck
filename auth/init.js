const db = require("better-sqlite3")
const sql = new db('auth.db')
// sql.exec(`drop table if exists users`)
sql.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        surname TEXT,
        login TEXT,
        password TEXT,
        attempts INTEGER DEFAULT 0,
        checkTime INTEGER DEFAULT 0
    )    
`)


sql.exec(`
    CREATE TABLE IF NOT EXISTS session(
        id TEXT PRIMARY KEY,
        user_id INTEGER,
        expires INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )    
`)