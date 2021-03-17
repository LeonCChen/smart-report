var mysql = require('mysql');

exports.handler = async function (event, context) {
  var {email, hash, salt} = event.queryStringParameters;
  email = decodeURIComponent(email);
  hash = decodeURIComponent(hash);
  salt = decodeURIComponent(salt);

  var connection = mysql.createConnection({
    host: '165.227.217.87',
    user: 'test',
    password: 'dillon',
    database: 'the_smart_report'
  });

  connection.connect();

  var sql_command = `INSERT INTO USER (email, hash, salt) VALUES ( '${email}', '${hash}', '${salt}')`
  console.log(sql_command);
  connection.query(sql_command, function (err, results) {
    if (err)
      throw err;
    console.log('insert successful');
    console.log(results);

  });

  connection.end();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

}
