var mariadb = require('mariadb');

exports.handler = async function (event) {
  var {email, hash, salt} = event.queryStringParameters;
  email = decodeURIComponent(email);
  hash = decodeURIComponent(hash);
  salt = decodeURIComponent(salt);
  var sql_command = `INSERT INTO USER (email, hash, salt) VALUES ( '${email}', '${hash}', '${salt}')`
  console.log(sql_command);

  await mariadb.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  }).then(connection => {
    connection.query(sql_command).then(rows => {
      console.log('insert successful');
      console.log(rows);
    }).catch(err => {
      console.log(err);
    });

  });
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
};

