var mysql = require('mysql');

var connection = mysql.createConnection ({
	host:'165.227.217.87',
	user: 'test',
	password: 'dillon',
	database: 'the_smart_report'
});

connection.connect();

var sql_command = "INSERT INTO USER (email, hash, salt) VALUES ('123', '456', '789')"
connection.query(sql_command, function(err, rows) {
	if (err)
		throw err;
	console.dir(rows);

});

connection.end();
