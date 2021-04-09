const mariadb = require('mariadb');

exports.handler =  async function (event) {
  
  // Unpacking and Decoding 
  var {email, newsSource, token} = event.queryStringParameters;
  email = decodeURIComponent(email);
  newsSource = decodeURIComponent(newsSource);
  token = decodeURIComponent(token);

  // SQL Command to Auth USER
  var sql_get_user_id1 = `SELECT user_id FROM USER WHERE email='${email}' ;` ;
  var sql_get_user_id2 = `SELECT user_id FROM TOKEN WHERE token='${token}' ;` ;
  
  // SQL Command to INSERT INTO NEWS TABLE
  var sql_insert_news = `INSERT INTO NEWS (rss_feed) VALUES ('${newsSource}') ;`;

  // SQL COMMAND TO INSET INTO USER_NEWS
  var sql_user_news = `INSERT into USER_NEWS (user_id, news_id) VALUES ( (SELECT user_id FROM USER WHERE email='${email}'), (SELECT news_id FROM NEWS WHERE rss_feed='${newsSource}') );`;

  // Get the NEWS.news_id
  var sql_news_id = `SELECT news_id FROM NEWS WHERE rss_feed='${newsSource}' ;`;

  // Creating the Connection with the DB  
  const conn = await mariadb.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });
   
  // Auth, and Inserting the USER and NEWS
//  try { 
    
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

    // Insert NEWS source
    const rows3 = await conn.query(sql_insert_news);
    // Linking USER with NEWS
    const rows4 = await conn.query(sql_user_news);   

    // Get news_id
    const newsID = await conn.query(sql_news_id);
    // var the_news_id = newsID[0].news_id;

    // Ends the Connection to DB
    conn.end();
/*
  } catch {
    // Returns An Error if Failure
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origion': '*'
      }
    };    
  }
*/
  return {
    statusCode: 200,
    body: the_news_id,
    headers: {
      'Access-Control-Allow-Orgin': '*'
    }
  };
};
