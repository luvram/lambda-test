const mysql = require('mysql');

'use strict';

const query = (sql, values) => {
  const connection = mysql.createConnection({
    host,
    user,
    password,
    database,
    // debug: ['ComQueryPacket', 'RowDataPacket'],
  });

  return new Promise((resolve) => {
    const query = { sql, values };

    connection.query(query, (error, results) => {
      if (error) {
        console.log('############# error #############');
        console.log(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports.hello = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  query(`insert into boram set a = '2'`)
    .then(()=>(query('select * from boram')))
    .then((result) => {
      callback(null, result);
    });
};
