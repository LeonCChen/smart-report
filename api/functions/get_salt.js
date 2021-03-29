const mariadb = require('mariadb');

exports.handler = async function (event) {
	var {email} = event.queryStringParameters;
	email = decodeURIComponent(email);
	var sql_command = `SELECT salt FROM USER WHERE email='${email}';`
	
	await mariadb.createConnection({
		host: process.env.HOST,
    	user: process.env.USER,
    	password: process.env.PASSWORD,
    	database: process.env.DATABASE
	}).then(connection => {
		connection.query(sql_command).then(rows => {
			console.log(rows[0]);
			console.log("INSERT SUCCESSFUL");
			return { rows[0].salt } ;
		}).catch(error => {
			console.log(err);

		});
	});

	return {
		statusCode: 200,
		headers: {
			'Access-Control_Allow_Origin': '*'
		}
	};
};


