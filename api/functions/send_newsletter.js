const mailchimpClient = require('@mailchimp/mailchimp_transactional')(process.env.MAILCHIMP)
const siteLink = 'https://adoring-pare-ef65be.netlify.app/'

exports.handler = async function (event) {
  // Decodes and retrieves variables
  let { email, newsSource } = event.queryStringParameters
  email = decodeURIComponent(email)
  newsSource = decodeURIComponent(newsSource)

  const sendNewsletter = async () => {
    const response = await mailchimpClient.messages.send({
      message: {
        to: [
          {
            email: email,
            type: 'to'
          }
        ],
        from_email: 'thesmartreport@breakingmybrain.com',
        text: 'Here is your personalized newsletter\n' + newsSource + '\n Edit your news sources here. ' + siteLink,
        subject: 'Here is your personalized newsletter',
        from_name: 'The Smart Report Team'
      }
    })
    console.log(response)
  }

  sendNewsletter()
}
