const mariadb = require('mariadb')

exports.handler = async function (event) {
  // Unpacking and Decoding
  let { email, newsSource, token, newsID } = event.queryStringParameters
  email = decodeURIComponent(email)
  token = decodeURIComponent(token)

  // SQL Command to Auth USER
  const sql_get_user_id1 = `SELECT user_id FROM USER WHERE email='${email}' ;`
  const sql_get_user_id2 = `SELECT user_id FROM TOKEN WHERE token='${token}' ;`

  // Command the remove the news from USER_NEWS table
  const sql_get_email_freq = ` SELECT email_freq FROM USER WHERE email='${email}' ;`

  const conn = await mariadb.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  })

  try {
    // Auth. the User to make sure theyare who they say they are
    const rows1 = await conn.query(sql_get_user_id1)
    const rows2 = await conn.query(sql_get_user_id2)
    // Returns an Error if the user can not AUTH
    if (!rows1 || !rows2 || !(rows1[0].user_id === rows2[0].user_id)) {
      return {
        statusCode: 403,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    }

    // Gets the email_freqency of the user
    const rows = await conn.query(sql_get_email_freq) 

    // Ends Connection to the Database
    conn.end()

    return {
      statusCode: 200,
      body: rows[0].email_freq.toString(),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  } catch {
    console.log(error)
    // Returns An Error if Failure
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origion': '*'
      }
    }
  }
}
