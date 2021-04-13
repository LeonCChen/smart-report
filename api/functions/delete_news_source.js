const mariadb = require('mariadb');

exports.handler = async function (event) {

  // Unpacking and Decoding 
  var {email, newsSource, token} = event.queryStringParameters;
  email = decodeURIComponent(email);
  newsSource = decodeURIComponent(newsSource);
  token = decodeURIComponent(token);
  newsID = decodeURIComponent(newsID);

  // SQL Command to Auth USER
  var sql_get_user_id1 = `SELECT user_id FROM USER WHERE email='${email}' ;` ;
  var sql_get_user_id2 = `SELECT user_id FROM TOKEN WHERE token='${token}' ;` ;

  // Command the remove the news from USER_NEWS table
  var sql_remove_news = `DELETE FROM USER_NEWS WHERE USER_NEWS.user_id=( SELECT user_id FROM USER WHERE email ='${email}' ) AND news_id=${newsID} ) ;`;

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
    // Returns an Error if the user can not AUTH
    if( ! rows1 || ! rows2 || ! ( rows1[0].user_id === rows2[0].user_id ) ){
      return {
        statusCode: 403,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      };
    }

    // Removing the news source
    const rows = await conn.query(sql_remove_news);

    // Ends the Connection to DB
    conn.end();

    // If everything works return success!!!
    return {
      statusCode:200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    console.log(error);
    // Returns An Error if Failure
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origion': '*'
      }
    };    
  }
}
