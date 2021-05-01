const db = require('./db');
const helper = require('../helper');
const config = require('../config');




// get top 10 messages
async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM message_history ORDER BY id DESC LIMIT 10` 
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

// get top 1 messages

const program = async () => {
    const connection = db.pool;
  
    const instance = new MySQLEvents(connection, {
      startAtEnd: true // to record only the new binary logs, if set to false or you didn'y provide it all the events will be console.logged after you start the app
    });
  
    await instance.start();
  
    instance.addTrigger({
      name: 'monitoring all statments',
      expression: 'message_history.*', // listen to TEST database !!!
      statement: MySQLEvents.STATEMENTS.ALL, // you can choose only insert for example MySQLEvents.STATEMENTS.INSERT, but here we are choosing everything
      onEvent: e => {
          getSingle(); 
      }
    });
  
//    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
//    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
  };


async function getSingle(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM message_history ORDER BY id DESC LIMIT 1` 
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
      data,
      meta
    }
}


async function postSingle(postMessage){
    const result = await db.query(
      `INSERT INTO message_history  
      (timestamp, user, message) 
      VALUES 
      (?, ?, ?)`, 
      [
          postMessage.datetime,
          postMessage.user,
          postMessage.message
      ]
    );
  
    let message = 'Error in creating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language created successfully';
    }
  
    return {message};
  }

module.exports = {
    getMultiple,
    getSingle,
    postSingle
}