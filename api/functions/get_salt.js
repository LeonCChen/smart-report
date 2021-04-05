const mariadb = require('mariadb');

exports.handler = async function (event) {

	var {email} = event.queryStringParameters;
	email = decodeURIComponent(email);
	var sql_command = `SELECT salt FROM USER WHERE email='${email}';`
	
	const conn = await mariadb.createConnection({
		host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD, database: process.env.DATABASE
	});

	try {
		const rows = await conn.query(sql_command);

		console.log('GET SALT SUCCESS');
		console.log(rows[0]);

		// Returns the salt
		return { 
			body: rows[0].salt, //{salt: 'the actual salt'}
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		};

  conn.end();

	} catch {
		// Error 
		return {
			statusCode: 401,
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		};
	}
};
