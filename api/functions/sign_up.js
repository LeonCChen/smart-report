var mariadb = require('mariadb');
const verifyCode = Math.floor(100000 + Math.random() * 900000);
const mailchimpClient = require("@mailchimp/mailchimp_transactional")(process.env.MAILCHIMP);

exports.handler = async function (event) {
  var {email, hash, salt} = event.queryStringParameters;
  email = decodeURIComponent(email);
  hash = decodeURIComponent(hash);
  salt = decodeURIComponent(salt);
  var sql_command = `INSERT INTO USER (email, hash, salt) VALUES ( '${email}', '${hash}', '${salt}')`

  await mariadb.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  }).then(connection => {
    connection.query(sql_command).then(() => {
      console.log('insert successful');
    }).catch(err => {
      console.log(err);
    });

  });
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
};

const welcomeEmail = async () => {
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
  } });
  console.log(response);
};  
    
welcomeEmail();







