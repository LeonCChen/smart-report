const mariadb = require('mariadb');

exports.handler = async function (event) {

  // Unpacking and Decoding 
  var {email, token} = event.queryStringParameters;
  email = decodeURIComponent(email);
  token = decodeURIComponent(token);

  // SQL Command to Auth USER
  var sql_get_user_id1 = `SELECT user_id FROM USER WHERE email='${email}' ;` ;
  var sql_get_user_id2 = `SELECT user_id FROM TOKEN WHERE token='${token}' ;` ;

  // SQL Command to retrive the USER NEWS source.
  var sql_read_news = `SELECT * FROM NEWS WHERE news_id IN (SELECT news_id FROM USER_NEWS WHERE user_id=(SELECT user_id FROM USER WHERE email='${email}') ) ;`;

  const conn = await mariadb.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });

  try {

    // Auth. the User to make sure theyare who they say they are
    const rows1 = await conn.query(sql_get_user_id1);
    const rows2 = await conn.query(sql_get_user_id2);
    
    // Returns an Error if the user AUTH FAILS
    if( ! rows1 || ! rows2 || ! ( rows1[0].user_id === rows2[0].user_id ) ){
      return {
        statusCode: 403,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      };
    }

    // Retriving the News Sources
    const rows = await conn.query(sql_read_news);
    // console.log(rows.length);
    // console.log(rows.slice(0, rows.length));

    const my_news = rows.slice(0, rows.length);

    // Ends the Connection to the DB
    conn.end();

    return { 
      body: my_news, //{salt: 'the actual salt'}
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch {
    // Error
    return {
      statusCode: 401,
      body: 'Does Not work!',
      headers: {
        'Allow-Control-Allow-Origin': '*'
      }
    };
  }
};
