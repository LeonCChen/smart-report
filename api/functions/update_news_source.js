const mariadb = require('mariadb');

exports.handler = async function (event) {

  // Unpacking and Decoding 
  var {email, newsSource, token, newsID} = event.queryStringParameters;
  email = decodeURIComponent(email);
  newsSource = decodeURIComponent(newsSource);
  token = decodeURIComponent(token);
  newsID = decodeURIComponent(newsID);

  // SQL Command to Auth USER
  var sql_get_user_id1 = `SELECT user_id FROM USER WHERE email='${email}' ;` ;
  var sql_get_user_id2 = `SELECT user_id FROM TOKEN WHERE token='${token}' ;` ;

  // SQL Command to update the news source
  var sql_update_news = `REPLACE INTO NEWS (news_id, rss_feed) VALUES (${newsID}, '${newsSource}');` ; 

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

    // Query to update the news
    const rows3 = await conn.query(sql_update_news);

    // Closes the connection
    conn.end();

    // Returns No Error if Successful
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'            
      }
    };
  } catch {
    // Returns error if true
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*'  
      }
    };
  }
};
