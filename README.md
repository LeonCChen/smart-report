# The Smart Report

## Introduction

Many people today obsessively check the news. They rotate between websites and doomscroll on Twitter. Some people try to escape the cycle by performing a "digital purge." But this can disconnect them from the news entirely. There needs to be something in between the endless checking of sites and tossing out one's phone.

Our solution is to provide a service that aggregates an individual's favorite news sources into a short newsletter delivered by email daily or weekly. This would give people a way to control how often they check the news, and save them time spent flipping between websites. Users would be able to opt-in to machine learning which would tailor which stories are sent to them based on what kind of stories they click on.


## Functions
List all the functions with their sub functions of your application.
1. Manage Account
	* Create User Account
	* Edit User Account
	* Login to User Account
2. Manage News Sources
	* Edit News Sources
	* Personalize newsletters based on links clicked (opt-in)
	* Set Frequency of Newsletter
3. Newsletter Management
	* Send Newsletter
	* Read News Sources


## Getting Started 
### Installation and Setup
#### DataBase
1. Install [MaraiDB on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-20-04)
2. Review [SQL Commands](https://www.digitalocean.com/community/tutorials/introduction-to-queries-mysql)
3. Run DB_Create_Script In Repo [Manage Database](https://www.digitalocean.com/community/tutorials/how-to-create-and-manage-databases-in-mysql-and-mariadb-on-a-cloud-server)

		> mysql [username] -p [password]
		> CREATE DATABASE [Database Name];
		> Use [Database Name];
		> # Copy and Paste the Database_Creation_Script.txt;

4. [Expose DataBase](https://mariadb.com/kb/en/configuring-mariadb-for-remote-client-access/)
5. Some Useful Commands for MariaDB/MySQL to Know
	
		> mysqladmin -u admin -p version - LOGS INTO THE DATBASE
		> CREATE DATABASE `birthdays`; - CREATES THE DATABASE WITH THE NAME `birthday`
		> use [database]; - USE THE DATABASE
		> show [database]; - LIST ALL THE DATABASE
		> show tables; - SHOW TABLES IN THE DATABASE
		> show columns from [tbl_name]; - SHOW THE COLUMNS TABLE NAME

#### Netlify For Hosting the Site
1. [Create Netlify Account](https://app.netlify.com/signup/email)
2. [Deploy the Website on Nelify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/)
3. [Add Env Variables](https://docs.netlify.com/configure-builds/environment-variables/)
	* DATABASE (Name of Database)
	* USERNAME (Username of User Accessing Account)
	* PASSWORD (Password of the User)
	* HOSTNAME (IP Address of the Database)

#### Mailchimp Transactional Email - Setup Email Sending
1. [Create Mailchimp Account](https://mailchimp.com/)
2. [Purchase a Mailchimp Transactional Email Plan](https://mailchimp.com/pricing/transactional-email/)
3. Setup and Verify a sending domain
	* Verify Ownership of Sending Domain via confirmation email
	* Edit DKIM Settings and SPF Settings
4. Generate a new API Key
5. Test connectivity to the Mailchimp Transactional API
	* [Transactional Email Quickstart](https://mailchimp.com/developer/transactional/guides/quick-start/)	
	* [Transactional Email References](https://mailchimp.com/developer/transactional/api/exports/)
6. Send Emails
	* [Send Message](https://mailchimp.com/developer/transactional/api/messages/send-new-message/)

## Demo video

Upload your demo video to youtube and put a link here. Basically, the video content is very much like the quick live demo of your product with the followings:
1. Introduction
2. How to run the app
3. Quick walkthrough of all the functions and their sub functions of your app one by one

Please make it short and interesting!

Sample: https://www.youtube.com/watch?v=Pr-JMqTkdEM

How to record your screen: https://www.techradar.com/how-to/record-your-screen

## Team Members - Roles
* Zack Rosa (email), Team Leader - Overload - GOD - Kami
* Dillon Morse (email), Developer
* Kyle Ferreira (email), Developer
* Leon Chen (email), Developer


## Credit

