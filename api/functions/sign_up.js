var mariadb = require('mariadb');
// Generates the random 6 digit code
const verifyCode = Math.floor(100000 + Math.random() * 900000);
const mailchimpClient = require("@mailchimp/mailchimp_transactional")(process.env.MAILCHIMP);

exports.handler = async function (event) {

  // Decoding the variableso it can be used
  var {email, hash, salt} = event.queryStringParameters;
  email = decodeURIComponent(email);
  hash = decodeURIComponent(hash);
  salt = decodeURIComponent(salt);
  
  // SQL Command to decode the variable
  var sql_insert_user = `INSERT INTO USER (email, hash, salt) VALUES ( '${email}', '${hash}', '${salt}')`

  // Creating the Connection with the Database
  await mariadb.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });

  // SQL Command, inserts the user into the USER table in DB
  const rows1 = await conn.query(sql_insert_user);  
 
  // Ends the Connection to the Db
  conn.end();

  // Converting the code into a string
  const code_string = verifyCode.toString();

  // Sends the email the to user that signed up
  const response = await mailchimpClient.messages.send({ message: {
    to: [
      {
        email: email,
        type: "to"
      }
    ],
      from_email: "thesmartreport@breakingmybrain.com",
      text: "Welcome to The Smart Report!\n\nHere is your Verification Code: " + verifyCode + "\n\nWelcome aboard!\n  - The Smart Report Team",
              
      subject: "Welcome to The Smart Report!",
      from_name: "The Smart Report Team"
    } 
  });
        
  return {
    statusCode: 200,
    body: code_string,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
};
