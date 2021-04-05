const mariadb = require('mariadb');
const {randomBytes} = require('crypto');

exports.handler = async function (event) {

	// Decoding the Variables
	var {email, hash} = event.queryStringParameters;
  email = decodeURIComponent(email);
  hash = decodeURIComponent(hash);

	// Uses the given email and has to get a TOKEN.user_id
  var sql_check_user = `SELECT USER.user_id FROM USER WHERE email='${email}' AND hash='${hash}';`

	// Converts tex to a token
  const buff = randomBytes(32);
  const token = buff.toString('hex');

	// Command For Inserting the TOKEN
	var sql_insert_token = `INSERT into TOKEN (TOKEN.token, TOKEN.user_id) VALUES ( '${token}', ( SELECT USER.user_id FROM USER WHERE email='${email}' AND hash='${hash}' ) );`
	
	console.log("Hello");
	const conn = await mariadb.createConnection({
		host: '165.227.217.87',
		user: 'dillon',
		password: 'wordword22',
		database: 'the_smart_report'
	});

  try {
		
    const rows = await conn.query(sql_check_user);
    // Checks if the User is in the Database
    console.log('SQL COMMAND 1 WORKED!!!');
    // console.log(rows[0])

    // If the Query returns nothing!
    if (!(rows[0])) {
      return {
        statusCode: 403,
        header: {
          'Access-Control-Allow-Origin': '*'
        }
      };
    }

		// Query to inset the 
		const mytoken = await conn.query(sql_insert_token);
		
		console.log('SQL COMMAND 2 WORKED!!!');
		// console.log(mytoken[1]);

  } 
	catch {
    // console.log('IT DOES NOT WORK!!!');
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  conn.end(); // The Connection to DB
	
	console.log('Right before return');
	// Success
	return {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	};	
};
