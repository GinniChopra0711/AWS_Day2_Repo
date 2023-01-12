const mysql = require("mysql2")
const dotenv = require("dotenv")

dotenv.config()

const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
  })
  .promise()

async function getNotes() {

  const query = `SELECT * FROM notes`;
  const [rows] = await pool.query(query);
  console.log("result", rows);
  return rows



}
exports.getNotes = getNotes

async function getNote(id) {
    const query = `
    SELECT * 
    FROM notes
    WHERE id = ?
    `
  try{
    const [rows] = await pool.query(query, [id]);
    const result = row[0];
    console.log("result", result)
  }catch(error){
    console.log("error", error);

  }
    
    return rows[0]
  }
  
exports.getNote = getNote

async function addNote(data) {


  const query = `INSERT INTO notes (title,contents) VALUES (?,?)`;
  const [rows] = await pool.query(query, [data.title, data.contents]);
  console.log("result", rows);
  return rows
  
  }


exports.addNote = addNote

async function deleteNote(id) {
console.log("id---------",id);
  const query = `DELETE FROM notes WHERE id = ?`;
  const [rows] = await pool.query(query, [id]);
  console.log("result", rows);
  return rows

}
exports.deleteNote = deleteNote
