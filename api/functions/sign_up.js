var mariadb = require('mariadb');

exports.handler = async function (event) {
  var {email, hash, salt} = event.queryStringParameters;
  email = decodeURIComponent(email);
  hash = decodeURIComponent(hash);
  salt = decodeURIComponent(salt);
  var sql_command = `INSERT INTO USER (email, hash, salt) VALUES ( '${email}', '${hash}', '${salt}')`
  console.log(sql_command);

  await mariadb.createConnection({
    host: '165.227.217.87',
    user: 'test',
    password: 'dillon',
    database: 'the_smart_report'
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

