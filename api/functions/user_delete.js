const mariadb = require('mariadb')

exports.handler = async function (event) {

  // Unpacking and Decoding 
  let { email, token } = event.queryStringParameters
  email = decodeURIComponent(email)
  token = decodeURIComponent(token)

  // SQL Command to Auth USER
  const sql_get_user_id1 = `SELECT user_id FROM USER WHERE email='${email}' ;`
  const sql_get_user_id2 = `SELECT user_id FROM TOKEN WHERE token='${token}' ;`

  // Command Will Delete the user from the Database
  const sql_remove_user = `DELETE FROM USER WHERE email='${email}' ;`

  // Creats Connection to the Database
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

    // SQL Command to remove the user from the Database
    const rows = await conn.query(sql_remove_user)

    // Ends the Connection to the database
    conn.end()

    // Returns Success If there are No error
    return {
      statuscode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  } catch (error) {
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
