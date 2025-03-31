const sqlite3 = require('sqlite3')
const { open } =require('sqlite')
let db;
async function initialiseDB(){
    db=await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  })
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      name TEXT,
      phoneno TEXT
    )
  `);
  const user = await db.get(
    `SELECT * FROM users WHERE name="khushbu"`,
);
console.log(user)

}
initialiseDB()