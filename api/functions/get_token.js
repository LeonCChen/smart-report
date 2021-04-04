const mariadb = require('mariadb');
const {randomBytes} = require('crypto');

exports.handler = async function (event) {

  var {email, hash} = event.queryStringParameters;
  email = decodeURIComponent(email);
  hash = decodeURIComponent(hash);
  var sql_check_user = `SELECT USER.user_id FROM USER WHERE email='${email}' AND hash='${hash}';`

  const conn = await mariadb.Createconnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });

  try {
    const rows = await conn.query(sql_check_user);
    // Checks if the User is in the Database
    console.log('CHECKS if USER IS IN DB');
    console.log(rows[0])

    // If does not exist
    if (!(rows[0])) {
      return {
        statusCode: 403,
        header: {
          'Access-Control-Allow-Origin': '*'
        }
      };
    }
  } catch {
    // Error
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
  // Converts token in hex
  const buff = randomBytes(32);
  const token = buff.toString('hex');

  // SQL COMMAND TO INSERT
  var sql_insert_token = `INSERT into TOKEN (TOKEN.token, TOKEN.user_id) VALUES ( '${token}', ( SELECT USER.user_id from USER WHERE email='${email}' AND hash='${hash}' ) );`

  try {
    await conn.query(sql_get_token)
    // Inserts the New token in to the database
    console.log(rows[0]);
    return ("INSERT SUCCESSFUL")

  } catch {
    // Errors
    console.log("OOPS SOMETHING WENT WRONG");

    return {
      statusCode: 401,
      header: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  // Success
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
};
