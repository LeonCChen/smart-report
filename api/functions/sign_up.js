var mysql = require('mysql');

exports.handler = async function (event, context) {

	var {email, hash, salt} = event.queryStringParamters;

	var connection = mysql.createConnection ({
		host:'165.227.217.87',
		user: 'test',
		password: 'dillon',
		database: 'the_smart_report'
	});

	connection.connect();

	var sql_command = `INSERT INTO USER (email, hash, salt) VALUES ( '${email}', '${hash}', '${salt}')`
	connection.query(sql_command, function(err, rows) {
		if (err)
			throw err;
		console.dir(rows);

	});

	connection.end();

}
