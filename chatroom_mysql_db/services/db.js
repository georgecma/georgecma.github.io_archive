const mysql = require('mysql2/promise');
const config = require('../config');

const env = process.env;

var pool = mysql.createPool({
    connectionLimit: 150,
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'personal_website',
    password: env.DB_PASSWORD || 'nothing_personal',
    database: env.DB_NAME || 'chatroom_messages', 
})

async function query(sql, params) {
    const connection = await pool.getConnection();
    console.log(connection);
  const [results, ] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  pool,
  query
}