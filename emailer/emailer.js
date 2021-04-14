const mariadb = require('mariadb');
const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;
const FeedParser = require('feedparser');
const mailchimpClient = require("@mailchimp/mailchimp_transactional")(process.env.MAILCHIMP);

async function asyncFunction() {

  const conn = await mariadb.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD, 
    database: process.env.DATABASE
  });

  // 1. Get Users from the DB
  
  // SQL Command get the list of Users to Email
  var sql_get_email = `SELECT email FROM USER;`;

  // SQL Command that gets the emails
  const rows = await conn.query(sql_get_email);
  // console.log(rows.slice(0, rows.length));
  // Takes the email out of the object
  const emails = rows.map(({ email }) => email);    
  // console.log(emails);
  // console.log('\n');

  /*
    2. For each user
      1. Get a list of that user's news sources
      2. Read the XML RSS feed of each news source (get the XML document the feed URL links to and parse it)
      3. Create and send an email which mixes a few of the news items from the user's feeds
  */

  // SQL Command to retrive the USER NEWS source.
  var sql_read_news = `SELECT rss_feed FROM NEWS WHERE news_id IN (SELECT news_id FROM USER_NEWS WHERE user_id=(SELECT user_id FROM USER WHERE email='chenl4@wit.edu') ) ;`;

  // SQL Command to get the news from the database
  const rows1 = await conn.query(sql_read_news);
  // Takes the Rss_feed from the object and put it into an array
  const news = rows1.map(({rss_feed}) => rss_feed); 

  console.log()
   
  const my_items=[];
  for(the_news_rss_feed of news){
    // Temp
    const temp=[];
    
    // Does the XML Parsing
    var response = await fetch(the_news_rss_feed);
    var feedparser = new FeedParser('uri');

    response.body.pipe(feedparser);

    feedparser.on('readable', function () {
      console.log(2);
      // Reads the download as a strem parse and adds to an arrny
      var stream = this;
      var meta = this.meta;
      var item;
      console.log(2);
      while (item = stream.read()) {
        // console.log(item);
        console.log(3);
        temp.push(item);
      }
    });
    await new Promise(resolve => feedparser.on('end', resolve));
    my_items.push(...temp.slice(0,5));
  }

  // Shuffle array 
  // Fisher-Yates array shuffling algorithm
  for(let i = my_items.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = my_items[i]
    my_items[i] = my_items[j]
    my_items[j] = temp
  }
    
  // Gets the first 5 items from the array
  const news_sources = my_items.slice(0, 5);
  // console.log(news_sources.length);

  // Craft the body for the email
  const emailBody = news_sources.reduce((acc, item) => (
  acc + '\n' + item.title + '\n' + item.link + '\n'), '');

  const email_response = await mailchimpClient.messages.send({ message: {
    to: [
      {
        email: 'leonchen77@outlook.com',
        type: "to"
      }
    ],
      from_email: "thesmartreport@breakingmybrain.com",
      text: "Here is your personalized newsletter\n" + emailBody + "\n\n\n Thanks, CUH",
      subject: "Here is your personalized newsletter",
      from_name: "The Smart Report Team"
    }});

  }


  // Ends the Connection to the Database
  conn.end()

};

asyncFunction();

